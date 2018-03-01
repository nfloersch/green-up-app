const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


const defaultAvatar = 'https://firebasestorage.googleapis.com/v0/b/greenupvermont-de02b.appspot.com/o/anonymous.png?alt=media&token=5b617caf-fd05-4508-a820-f9f373b432fa';

class TeamMember {
    constructor(args) {
        this.uid = typeof args.uid === 'string' || typeof args.id === 'string' || typeof args._id === 'string'
            ? args.uid || args.id || args._id
            : null;
        this.displayName = typeof args.displayName === 'string'
            ? args.displayName
            : null;
        this.bio = typeof args.bio === 'string'
            ? args.bio
            : null;
        this.email = typeof args.email === 'string'
            ? args.email.toLowerCase()
            : null;
        this.photoURL = typeof args.photoURL === 'string'
            ? args.photoURL
            : defaultAvatar;
        this.memberStatus = typeof args.memberStatus === 'string'
            ? args.memberStatus
            : 'NOT_INVITED';
        this.invitationId = typeof args.invitationId === 'string'
            ? args.invitationId
            : null;
    }

    static create(args) {
        return new TeamMember(args || {});
    }
}


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
    const database = admin.database();
    const invitationId = event.params.pushId;
    const invitation = event.data.val();
    const teamMember = invitation.teamMember;
    const email = teamMember.email.toLowerCase();
    const teamId = invitation.team.id;
    const members = database.ref(`teamMembers/${teamId}`);

    // Add message if user exists
    // const test = database.ref('test');

    const profiles = database.ref('profiles');
    profiles.once('value', (snapshot) => {
        const myProfiles = snapshot.val();
        const userId = Object.keys(myProfiles).find(key => myProfiles[key].email.toLowerCase() === email);

        if (!!userId) {
            // Add Invite Message
            const message = {
                active: true,
                created: (new Date()).toString(),
                read: false,
                sender: invitation.sender,
                teamId: invitation.team.id,
                type: 'INVITATION',
                text: `You have been invited to join team: ${invitation.team.name}`
            };

            database.ref(`messages/${userId}`).push(message);

            // Add invitee to team
            const newMember = TeamMember.create(
                Object.assign({}, myProfiles[userId], {memberStatus: 'INVITED'})
            );

            members.push(newMember);

            // Remove invitation - we don't need it anymore:
            database.ref(`invitations/${invitationId}`).remove();

        } else {
            // Add invitee to team
            const newMember = TeamMember.create(
                Object.assign({}, teamMember, {
                    email,
                    memberStatus: 'INVITED',
                    invitationId: event.params.pushId
                })
            );
            members.push(newMember);
        }
    });

    // Send Email
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

exports.createTeamMembers = functions.database.ref('teams/{pushId}').onCreate((event) => {
    const database = admin.database();
    const teamId = event.params.pushId;
    const created = (new Date()).toString();
    const owner = Object.assign({}, event.data.val().owner, {memberStatus: 'OWNER', created});
    database.ref(`teamMembers/${teamId}`).push(owner);
    database.ref(`profiles/${owner.uid}/teams/${teamId}`).set('OWNER');
});


// exports.checkInvitations = functions.auth().onAuthStateChanged((user) => {
//     if (!!user && user.email) {
//
//         const invitations = admin.database().ref('invitations');
//         invitations.on('value', (snapshot) => {
//             const invites = snapshot.val();
//             const keys = Object.keys(invites).filter(key => invites[key].teamMember.email.toLowerCase() === user.email.toLowerCase());
//             keys.forEach(key => {
//                 functions.
//             });
//          });
//     }
// });