/**
 *  A SendGrid API key must be set using the firestore cli in the terminal by running:
 *
 *        firebase functions:config:set sendgrid.apikey="my-api-key"
 *
 *  Afterwards deploy your functions for the change to take effect by running
 *
 *       firebase deploy --only functions
 */


const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});

const sgMail = require('@sendgrid/mail');

const SENDGRID_API_KEY = functions.config().sendgrid.apikey;
// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'Green Up Vermont';


function sendInvitationEmailSendGrid(invitation) {
    sgMail.setApiKey(SENDGRID_API_KEY);
    sgMail.setSubstitutionWrappers('{{', '}}'); // Configure the substitution tag wrappers globally

    const teamMember = invitation.teamMember;
    const team = invitation.team || {};
    const to = teamMember.email.trim().toLowerCase();
    const toName = teamMember.displayName;
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
 */
exports.onInvitationCreate = functions.firestore.document('invitations/{pushId}/{invitationId}').onCreate(
    (snap, context) => {
        const invitation = snap.data();
        return sendInvitationEmailSendGrid(invitation);
    });

exports.onTeamDelete = functions.firestore.document('teamMembers/{teamId}').onDelete((event) => {
    const db = admin.database();
    const removeFromProfile = (uid, teamId) => db.ref(`profiles/${uid}/teams/${teamId}`).remove();
    const removeInvitation = (membershipKey, teamId) => db.ref(`invitations/${membershipKey}/${teamId}`).remove();

    const memberships = event.data.previous;
    if (memberships.exists()) {
        Object.keys(memberships.val()).forEach(key => {
            const uid = memberships[key].uid;

            if (uid) {
                removeFromProfile(uid, event.params.pushId);
            }
            return removeInvitation(key, event.params.pushId);
        });
    }
    return Promise.reject(new Error('no team memberships to remove'));
});

exports.onTeamMemberRemove = functions.firestore.document('teams/{teamId}/members/{uid}').onDelete((event) => {
    const db = admin.database();
    const removeFromProfile = (uid, teamId) => db.ref(`profiles/${uid}/teams/${teamId}`).remove();
    const member = event.data.previous;
    if (member.exists()) {
        const uid = (member.val() || {}).uid;
        if (uid) {
            removeFromProfile(uid, event.params.teamId);
            removeTeamMessages(uid, event.params.teamId);
        }
    }
    return Promise.reject(new Error('no team member to remove'));
});