const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});


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

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'Green Up Vermont';

// Sends a welcome email to the given user.
function sendInvitationEmail(email, displayName) {
    const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: email
    };

    // The user subscribed to the newsletter.
    mailOptions.subject = `Welcome to ${APP_NAME}!`;
    mailOptions.text = `Hey ${displayName || ''}! You've been invited to participate in Green Up Day.`;
    return mailTransport.sendMail(mailOptions).then(() => console.log('New welcome email sent to:', email));
}


// [START ]
/**
 * Sends a invitation email to an invited user.
 */
// [START onCreateTrigger]
exports.sendInvitationEmail = functions.database.ref('invitations/{pushId}').onCreate((event) => {
    const invitation = event.data.val();
    const teamMember = invitation.teamMember;
    const email = teamMember.email.toLowerCase();
    const newMember = Object.assign({}, teamMember, {
        email,
        memberStatus: 'INVITED',
        invitationId: event.params.pushId
    });
    // admin.database().ref(`teams/${invitation.team.id}/members`).push(newMember);
    const members = admin.database().ref(`teams/${invitation.team.id}/members`);
    members.on('value', (snapshot) => {
        const _members = snapshot.val();
        members.set(_members.concat(newMember));
    });
    return sendInvitationEmail(email, invitation.displayName);
});
// [END ]


exports.createProfile = functions.auth.user().onCreate((event) => {
    const {uid, displayName, email, photoURL} = event.data;
    const created = (new Date()).toString();
    admin.database().ref(`profiles/${uid}`).set({uid, displayName, email, photoURL, created});
});

exports.removeInvitation = functions.database.ref('teams/{pushId}/teamMembers/{index}').onDelete((event) => {
    // Only edit data when it is first created.
    if (event.data.previous.exists()) {
        admin.database().ref('test').push(event.data.previous);
    }
});