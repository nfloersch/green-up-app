
const firebaseHelper = require('firebase-functions-helper');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();


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
    return functions.firestore.document(`profiles/${uid}/teams/${teamId}`).delete();
};

const removeInvitation = (membershipKey, teamId) => {
    return functions.firestore.document(`invitations/${membershipKey}/${teamId}`).delete();
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
    const from = {
        name: 'Green Up Vermont',
        email: 'app@greenupvermont.org',
    };
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
    const teamInfo = `${teamName}${owner}${date}${start}${end}${town}${where}${notes}`;
    const message = {
        to,
        from,
        subject,
        text,
        html,
        templateId: '93b4cee5-a954-4704-ae0b-965196dc05b1',
        substitutions: {teaminfo: teamInfo}
    };

    return sgMail.send(message);
}

/**
 * Test endpoint
 */
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});


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


/**
 * Clean up after team deletions
 */
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

/**
 * Clean up after team member removal
 */
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


/**
 * ReST API
 */



// Automatically allow cross-origin requests
app.use(cors({origin: true}));

app.get('/tenant/:id/workflow', (req, res) => {
    res.end('Received GET request!');
});

// Retrieve Event
app.get('/api/events/:id', (req, res) => {
    try {
        const eventId = req.params.id;
        //const workflow = JSON.parse(req.body.workflow);
        firebaseHelper.firestore.updateDocument(db, 'tenants', tenantId, {workflow: workflow});
        res.send('huzzah');
    } catch (error) {
        res.end('error' + error);
    }
});

// Add Event
app.post('/api/events', (req, res) => {
    try {
        const event = JSON.parse(req.body.workflow);
       // firebaseHelper.firestore.updateDocument(db, 'tenants', tenantId, {workflow: workflow});
        res.send('huzzah');
    } catch (error) {
        res.send(error);
    }
});


// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);

exports.onTeamDelete = functions.firestore.document('teams/{teamId}').onDelete((snap, context) => {
    const db = admin.firestore();
    const members = db.collection(`teams/${context.params.teamId}/members`);
    const requests = db.collection(`teams/${context.params.teamId}/requests`);
    const invitations = db.collection(`teams/${context.params.teamId}/invitations`);
    const messages = db.collection(`teams/${context.params.teamId}/messages`);

    const xMembers = members.get().then(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => data.push(doc.delete()));
        return data;
    });

    const xRequests = requests.get().then(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => data.push(doc.delete()));
        return data;
    });

    const xInvitations = invitations.get().then(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => data.push(doc.delete()));
        return data;
    });

    const xMessages = messages.get().then(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => data.push(doc.delete()));
        return data;
    });


    const allXs = [].concat(xMembers, xInvitations, xRequests, xMessages);
    return Promise.all(allXs);
});

exports.onTeamMemberRemove = functions.firestore.document('teams/{teamId}/members/{uid}').onDelete((snap, context) => {
    return removeFromProfile(context.params.uid, context.params.teamId);
});

exports.onTeamRequestRemove = functions.firestore.document('teams/{teamId}/requests/{uid}').onDelete((snap, context) => {
    return removeFromProfile(context.params.uid, context.params.teamId);
});

exports.onTeamInvitationRemove = functions.firestore.document('teams/{teamId}/invitations/{email}').onDelete((snap, context) => {
    return removeInvitation(context.params.email, context.params.teamId);
});

admin.initializeApp(functions.config().firebase);
