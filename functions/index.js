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

const sgMail = require('@sendgrid/mail');

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'Green Up Vermont';

const removeFromProfile = (uid, teamId) => {
    const db = admin.database();
    return db.ref(`profiles/${uid}/teams/${teamId}`).delete();
};

const removeInvitation = (membershipKey, teamId) => {
    const db = admin.database();
    return db.ref(`invitations/${membershipKey}/${teamId}`).delete();
};


function sendInvitationEmailSendGrid(apiKey, invitation, email, teamId) {
    sgMail.setApiKey(apiKey);
    sgMail.setSubstitutionWrappers('{{', '}}'); // Configure the substitution tag wrappers globally

    const teamMember = invitation.teamMember;
    const team = invitation.team || {};
    const to = email;
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

exports.onInvitationCreate = functions.firestore.document('invitations/{email}/teams/{teamId}').onCreate(
    (snap, context) => {
        const invitation = snap.data();
        const email = context.params.email;
        const teamId = context.params.teamId;
        const apiKey = functions.config().sendgrid.apikey;
        return sendInvitationEmailSendGrid(apiKey, invitation, email, teamId);
    });

exports.onTeamDelete = functions.firestore.document('teams/{teamId}').onDelete((snap, context) => {
    const db = admin.database();
    const members = db.ref(`teams/${teamId}/members`);
    const requests = db.ref(`teams/${teamId}/requests`);
    const invitations =  db.ref(`teams/${teamId}/invitations`);

    documentRef.getCollections().then(collections => {
        for (let collection of collections) {
            console.log(`Found subcollection with id: ${collection.id}`);
        }


    const xMembers =  .delete();
    const xInvites = db.ref(`teams/${teamId}/invitations`).delete();
    const xRequests = db.ref(`teams/${teamId}/requests`).delete();


    const allXs = [].concat(xMembers, xInvite, xRequests);
    return Promise.all(allXs);
});

exports.onTeamMemberRemove = functions.firestore.document('teams/{teamId}/members/{uid}').onDelete((snap, context) => {
    return removeFromProfile(uid, teamId);
});

exports.onTeamRequestRemove = functions.firestore.document('teams/{teamId}/requests/{uid}').onDelete((snap, context) => {
    return removeFromProfile(uid, teamId);
});


exports.onTeamInvitationRemove = functions.firestore.document('teams/{teamId}/invitations/{email}').onDelete((snap, context) => {
    return removeInvitation(email, teamId);
});

admin.initializeApp(functions.config().firebase);
