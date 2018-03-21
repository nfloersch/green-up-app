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


function sendInvitationEmailSendGrid(invitation) {
    sgMail.setApiKey(SENDGRID_API_KEY);
    sgMail.setSubstitutionWrappers('{{', '}}'); // Configure the substitution tag wrappers globally
    // const msg = {
    //     to,
    //     from: fromEmail,
    //     subject,
    //     text,
    //     template_id: '29fc40d0-780c-40d7-9db2-777fffe1fe18'
    // };
    const teamMember = invitation.teamMember;
    const to = teamMember.email.trim().toLowerCase();
    const toName = teamMember.displayName;
    const subject = 'You have been invited to Green Up Day';
    const sender = invitation.sender.displayName;
    const noNameText = 'A friend has invited you to participate in Green Up Day';
    const withNameText = `Hey ${invitation.displayName || ''}! ${sender} has invited you to participate in Green Up Day.`;
    const linkText = 'Download the official Green Up Day Vermont app from your app store';
    const text = `${!sender || !invitation.displayName ? noNameText : withNameText}\n${linkText}`;
    const html = `<div><p>${!sender || !invitation.displayName ? noNameText : withNameText}</p><p>${linkText}</p></div>`;
    const from = 'app@greenupvermont.org';
    const message = {
        to,
        from,
        subject,
        text: noNameText,
        html,
        templateId: '93b4cee5-a954-4704-ae0b-965196dc05b1',
        substitutions: { name: sender, city: 'Burlington' }
    };
    console.log(JSON.stringify(message));
    return sgMail.send(message);

}


// Sends a welcome email to the given user.
function sendInvitationEmailGmail(to, fromEmail, fromName, subject, text) {
    const mailOptions = {
        from: `${fromName} <${fromEmail}>`,
        to,
        subject,
        text
    };
    return mailTransport.sendMail(mailOptions);
}

/**
 * User setup after an invitation create
 * Sends a invitation email to an invited user.
 */
exports.onInvitationCreate = functions.database.ref('invitations/{pushId}/{invitationId}').onCreate((event) => {
    const invitation = event.data.val();
    return sendInvitationEmailSendGrid(invitation).then(x => console.log(`Email sent to: ${invitation.teamMember.displayName}`));
});

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
    return Promise.reject(new Error('no team memberships to remove'))
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
        console.log(`removing user ${event.params.membershipId} from team ${event.params.teamId}`);
        if (Boolean(uid)) {
            removeFromProfile(uid, event.params.teamId);
            removeTeamMessages(uid, event.params.teamId);
        }
        return removeInvitation(event.params.membershipId, event.params.teamId); // TODO : return all promises
    }
    return Promise.reject(new Error('no team member to remove'))
});


exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});