const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const sgMail = require('@sendgrid/mail');

const SENDGRID_API_KEY = functions.config().sendgrid.apikey;
// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
// const APP_NAME = 'Green Up Vermont';


const isValidDate = (dayt) => ((dayt || 'invalid').toString() !== 'Invalid Date' && (dayt instanceof Date));

class Profile {
    constructor(args = {}) {
        this.uid = typeof args.uid === 'string' || typeof args.id === 'string'
            ? args.uid || args.id
            : null;
        this.displayName = typeof args.displayName === 'string'
            ? args.displayName.trim()
            : null;
        this.email = typeof args.email === 'string'
            ? args.email.trim().toLowerCase()
            : null;
        this.bio = typeof args.bio === 'string'
            ? args.bio.slice(0, 144).trim() // max-length is 144 characters
            : null;
        this.created = isValidDate(args.created || new Date())
            ? new Date(args.created)
            : null;
        this.updated = isValidDate(new Date(args.updated))
            ? new Date(args.updated)
            : null;
        this.photoURL = typeof args.photoURL === 'string'
            ? args.photoURL
            : getGravatar(args.email);
    }

    static create(args = {}, uid) {
        return new Profile(Object.assign({}, args, {uid: uid || args.uid || args.id}));
    }
}

admin.initializeApp(functions.config().firebase);

const fs = admin.firestore();

exports.createNewProfile = functions.auth.user().onCreate((user) => {
    const profile = Profile.create(user);
    fs.collection('profiles').doc(user.uid).set(profile);
});

function sendInvitationEmailSendGrid(invitation) {
    sgMail.setApiKey(SENDGRID_API_KEY);
    sgMail.setSubstitutionWrappers('{{', '}}'); // Configure the substitution tag wrappers globally

    const teamMember = invitation.teamMember;
    const team = invitation.team || {};
    const to = teamMember.email.trim().toLowerCase();
    //  const toName = teamMember.displayName;
    const subject = 'You have been invited to Green Up Day';
    const sender = invitation.sender.displayName;
    const from = 'app@greenupvermont.org';

    // Build Text Body
    const noNameText = 'A friend has invited you to participate in Green Up Day';
    const withNameText = `Hey ${invitation.displayName || ''}! ${sender} has invited you to participate in Green Up Day.`;
    const text = `${!sender || !invitation.displayName ? noNameText : withNameText}`;
    const html = `<div><p>${!sender || !invitation.displayName ? noNameText : withNameText}</p></div>`;

    // Build Team Info
    const where = team.location ? `<p>Where : <strong>${team.location}</strong></p>` : '';
    const date = team.date ? `<p>When : <strong>${team.date}</strong></p>` : '';
    const start = team.start ? `<p>Start Time : <strong>${team.start}</strong></p>` : '';
    const end = team.end ? `<p>End Time : <strong>${team.end}</strong></p>` : '';
    const teamName = `<p>Team Name: <strong>${team.name}</strong></p>`;
    const owner = team.owner.displayName ? `<p>Team Captain : <strong>${team.owner.displayName}</strong>` : '';
    const town = team.town ? `<p>Town : <strong>${team.town}</strong></p>` : '';
    const notes = team.notes ? `<p>Description : <strong>${team.notes}</strong></p>` : '';
    const teaminfo = `${teamName}${owner}${date}${start}${end}${town}${where}${notes}`;
    const message = {
        to,
        from,
        subject,
        text,
        html,
        templateId: '93b4cee5-a954-4704-ae0b-965196dc05b1',
        substitutions: {teaminfo}
    };

    return sgMail.send(message);

}


/**
 * User setup after an invitation create
 * Sends a invitation email to an invited user.
 * @deprecated
 */
exports.onInvitationCreate = functions.database.ref('invitations/{pushId}/{invitationId}').onCreate((event) => {
    const invitation = event.data.val();
    return sendInvitationEmailSendGrid(invitation);
});

/**
 * @deprecated
 */
exports.onTeamDelete = functions.database.ref('teamMembers/{pushId}').onDelete((event) => {
    const db = admin.database();
    const removeFromProfile = (uid, teamId) => db.ref(`profiles/${uid}/teams/${teamId}`).remove();
    const removeInvitation = (membershipKey, teamId) => db.ref(`invitations/${membershipKey}/${teamId}`).remove();

    const memberships = event.data.previous;
    if (memberships.exists()) {
        Object.keys(memberships.val()).forEach(key => {
            const uid = memberships[key].uid;

            if (Boolean(uid)) {
                removeFromProfile(uid, event.params.pushId);
            }
            return removeInvitation(key, event.params.pushId);
        });
    }
    return Promise.reject(new Error('no team memberships to remove'));
});

/**
 * @deprecated
 */
exports.onTeamMemberRemove = functions.database.ref('teamMembers/{teamId}/{membershipId}').onDelete((event) => {
    const db = admin.database();
    const removeFromProfile = (uid, teamId) => db.ref(`profiles/${uid}/teams/${teamId}`).remove();
    const removeInvitation = (membershipKey, teamId) => db.ref(`invitations/${membershipKey}/${teamId}`).remove();
    const removeTeamMessages = (uid, teamId) => db.ref(`messages/${uid}`).once('value').then(snapshot => {
        const data = snapshot.val();
        const keys = Object.keys(data).filter(key => !!data[key].teamId && data[key].teamId === teamId);
        return keys.map(key => db.ref(`messages/${uid}/${key}`).remove());
    });
    const member = event.data.previous;
    if (member.exists()) {
        const uid = (member.val() || {}).uid;
        if (Boolean(uid)) {
            removeFromProfile(uid, event.params.teamId);
            removeTeamMessages(uid, event.params.teamId);
        }
        return removeInvitation(event.params.membershipId, event.params.teamId); // TODO : return all promises
    }
    return Promise.reject(new Error('no team member to remove'));
});


exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});