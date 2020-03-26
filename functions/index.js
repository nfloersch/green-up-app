/**
 *  A SendGrid API key must be set using the firestore cli in the terminal by running:
 *
 *        firebase functions:config:set sendgrid.apikey="my-api-key"
 *
 *  Afterwards deploy your functions for the change to take effect by running
 *
 *       firebase deploy --only functions
 */

const api = require("./api");

const reports = require("./reports");

const functions = require("firebase-functions");

const admin = require("firebase-admin");

const sgMail = require("@sendgrid/mail");

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = "Green Up Vermont";

const removeFromProfile = (uid, teamId) => functions.firestore.document(`profiles/${ uid }/teams/${ teamId }`).delete();

const removeInvitation = (membershipKey, teamId) => functions.firestore.document(`invitations/${ membershipKey }/${ teamId }`).delete();

function sendInvitationEmailSendGrid(apiKey, invitation, email, teamId) {
    sgMail.setApiKey(apiKey);
    sgMail.setSubstitutionWrappers("{{", "}}"); // Configure the substitution tag wrappers globally

    const teamMember = invitation.teamMember;
    const team = invitation.team || {};
    const to = email;
    const toName = teamMember.displayName;
    const subject = "You have been invited to Green Up Day";
    const sender = invitation.sender.displayName;
    const from = {
        name: "Green Up Vermont",
        email: "app@greenupvermont.org"
    };
    // Build Text Body
    const noNameText = "A friend has invited you to participate in Green Up Day";
    const withNameText = `Hey ${ invitation.displayName || "" }! ${ sender } has invited you to participate in Green Up Day.`;
    const text = `${ !sender || !invitation.displayName ? noNameText : withNameText }`;
    const html = `<div><p>${ !sender || !invitation.displayName ? noNameText : withNameText }</p></div>`;

    // Build Team Info
    const where = team.location ? `<p>Where : <strong>${ team.location }</strong></p>` : "";
    const date = team.date ? `<p>When : <strong>${ team.date }</strong></p>` : "";
    const start = team.start ? `<p>Start Time : <strong>${ team.start }</strong></p>` : "";
    const end = team.end ? `<p>End Time : <strong>${ team.end }</strong></p>` : "";
    const teamName = `<p>Team Name: <strong>${ team.name }</strong></p>`;
    const owner = team.owner.displayName ? `<p>Team Captain : <strong>${ team.owner.displayName }</strong>` : "";
    const town = team.townId ? `<p>Town : <strong>${ team.townId }</strong></p>` : "";
    const notes = team.notes ? `<p>Description : <strong>${ team.notes }</strong></p>` : "";
    const teamInfo = `${ teamName }${ owner }${ date }${ start }${ end }${ town }${ where }${ notes }`;
    const message = {
        to,
        from,
        subject,
        text,
        html,
        templateId: "93b4cee5-a954-4704-ae0b-965196dc05b1",
        substitutions: { teaminfo: teamInfo }
    };

    return sgMail.send(message);
}

/**
 * User setup after an invitation create
 * Sends a invitation email to an invited user.
 */

exports.onInvitationCreate = functions.firestore.document("invitations/{email}/teams/{teamId}").onCreate(
    (snap, context) => {
        const invitation = snap.data();
        const email = context.params.email;
        const teamId = context.params.teamId;
        const apiKey = functions.config().sendgrid.apikey;
        return sendInvitationEmailSendGrid(apiKey, invitation, email, teamId);
    });

exports.onTeamDelete = functions.firestore.document("teams/{teamId}").onDelete((snap, context) => {
    const db = admin.firestore();
    const members = db.collection(`teams/${ context.params.teamId }/members`);
    const requests = db.collection(`teams/${ context.params.teamId }/requests`);
    const invitations = db.collection(`teams/${ context.params.teamId }/invitations`);
    const messages = db.collection(`teams/${ context.params.teamId }/messages`);

    const xMembers = members.get().then(querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => data.push(doc.delete()));
        return data;
    });

    const xRequests = requests.get().then(querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => data.push(doc.delete()));
        return data;
    });

    const xInvitations = invitations.get().then(querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => data.push(doc.delete()));
        return data;
    });

    const xMessages = messages.get().then(querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => data.push(doc.delete()));
        return data;
    });


    const allXs = [].concat(xMembers, xInvitations, xRequests, xMessages);
    return Promise.all(allXs);
});

exports.onTeamMemberRemove = functions.firestore.document("teams/{teamId}/members/{uid}").onDelete((snap, context) => removeFromProfile(context.params.uid, context.params.teamId));

exports.onTeamRequestRemove = functions.firestore.document("teams/{teamId}/requests/{uid}").onDelete((snap, context) => removeFromProfile(context.params.uid, context.params.teamId));

exports.onTeamInvitationRemove = functions.firestore.document("teams/{teamId}/invitations/{email}").onDelete((snap, context) => removeInvitation(context.params.email, context.params.teamId));

exports.onTeamsWrite = functions.firestore.document("teams/{id}").onWrite((snap, context) => admin.firestore().doc("updates/teams").set({ updated: new Date() }));

exports.onCelebrationsWrite = functions.firestore.document("celebrations/{id}").onWrite((snap, context) => admin.firestore().doc("updates/celebrations").set({ updated: new Date() }));

exports.onTrashDropsWrite = functions.firestore.document("trashDrops/{id}").onWrite((snap, context) => admin.firestore().doc("updates/trashDrops").set({ updated: new Date() }));

exports.onSupplyDistributionSitesWrite = functions.firestore.document("supplyDistributionSites/{id}").onWrite((snap, context) => admin.firestore().doc("updates/supplyDistributionSites").set({ updated: new Date() }));

exports.onTrashCollectionSitesWrite = functions.firestore.document("trashCollectionSites/{id}").onWrite((snap, context) => admin.firestore().doc("updates/trashCollectionSites").set({ updated: new Date() }));

exports.onEventInfoWrite = functions.firestore.document("eventInfo/{id}").onWrite((snap, context) => admin.firestore().doc("updates/eventInfo").set({ updated: new Date() }));

exports.onTownsWrite = functions.firestore.document("towns/{id}").onWrite((snap, context) => admin.firestore().doc("updates/towns").set({ updated: new Date() }));

exports.api = api.app;

exports.reports = reports;

admin.initializeApp(functions.config().firebase);