const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});
const SENDGRID_API_KEY = functions.config().sendgrid.apikey;
// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'Green Up Vermont';


function sendInvitationEmailSendGrid(to, from, subject, text, html) {
    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
        to,
        from,
        subject,
        text,
        html
    };
    sgMail.send(msg);
    console.log('New invitation sent to:', to);
}


// Sends a welcome email to the given user.
function sendInvitationEmailGmail(to, from, subject, text) {
    const mailOptions = {
        from: `${APP_NAME} <${from}>`,
        to,
        subject,
        text
    };
    return mailTransport.sendMail(mailOptions).then(() => console.log('New invitation sent to:', to));
}

/**
 * User setup after an invitation create
 * Sends a invitation email to an invited user.
 */
exports.onInvitationCreate = functions.database.ref('invitations/{pushId}/{invitationId}').onCreate((event) => {

    const invitation = event.data.val();
    const teamMember = invitation.teamMember;
    const to = teamMember.email.toLowerCase();
    const subject = `Welcome to ${APP_NAME}!`;
    // Build Text
    const sender = invitation.sender.displayName;
    const noNameText = 'A friend has invited you to participate in Green Up Day';
    const withNameText = `Hey ${invitation.displayName || ''}! ${sender} has invited you to participate in Green Up Day.`;
    const linkText = 'Download the official Green Up Day Vermont app from your app store';
    const text = `${!sender || !invitation.displayName ? noNameText : withNameText}\n${linkText}`;
    // Build HTML
    const html = `<div><p>${!sender || !invitation.displayName ? noNameText : withNameText}</p><p>${linkText}</p></div>`;
    sendInvitationEmailSendGrid(to, 'app@GreenUpVermont.org', subject, text, html);
});

exports.onTeamDelete = functions.database.ref('teamMembers/{pushId}').onDelete((event) => {
    const db = admin.database();
    const removeFromProfile = (uid, teamId) => db.ref(`profiles/${uid}/teams/${teamId}`).remove();
    const removeInvitation = (membershipKey, teamId) => db.ref(`invitations/${membershipKey}/${teamId}`).remove();

    const memberships = event.data.previous;
    if (memberships.exists()) {
        Object.keys(memberships.val()).forEach(key => {
            const uid = memberships[key].uid;
            removeInvitation(key, event.params.pushId);
            if (Boolean(uid)) {
                removeFromProfile(uid, event.params.pushId);
            }
        });
    }
});


exports.onTeamMemberRemove = functions.database.ref('teamMembers/{teamId}/{membershipId}').onDelete((event) => {
    const db = admin.database();
    const removeFromProfile = (uid, teamId) => db.ref(`profiles/${uid}/teams/${teamId}`).remove();
    const removeInvitation = (membershipKey, teamId) => db.ref(`invitations/${membershipKey}/${teamId}`).remove();
    const removeTeamMessages = (uid, teamId) => db.ref(`messages/${uid}`).once('value').then(snapshot => {
        const data = snapshot.val();
        const keys = Object.keys(data).filter(key => !!data[key].teamId && data[key].teamId === teamId);
        return keys.map(key => {
            console.log(`deleting message ${data[key].text}`);
            return db.ref(`messages/${uid}/${key}`).remove();
        });
    });
    const member = event.data.previous;
    if (member.exists()) {
        const uid = (member.val() || {}).uid;
        removeInvitation(event.params.membershipId, event.params.teamId);
        console.log(`deleting user ${uid } from team ${event.params.teamId}`);
        if (Boolean(uid)) {
            removeFromProfile(uid, event.params.teamId);
            removeTeamMessages(uid, event.params.teamId);
        }
    }
});


exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});

