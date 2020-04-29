/**
 *  A SendGrid API key, email and template id must be set using the firestore cli in the terminal by running:
 *
 *        firebase functions:config:set sendgrid.apikey="my-api-key" sendgrid.fromemail="greenup-sender-email" sendgrid.teaminvitetemplateid="invitation-template-id" sendgrid.joinrequesttemplateid="join-request-template-id"
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

function sendEmailWithSendGrid (templateId, to, dynamicTemplateData) {
    const apiKey = functions.config().sendgrid.apikey;
    sgMail.setApiKey(apiKey);
    sgMail.setSubstitutionWrappers("{{", "}}"); // Configure the substitution tag wrappers globally
    const from = {
        name: "Green Up Vermont",
        email: functions.config().sendgrid.fromemail
    };
    const message = {
        to,
        from,
        templateId: templateId,
        dynamic_template_data: dynamicTemplateData
        };
    return sgMail.send(message);
}

/**
 * User setup after an invitation create
 * Sends a invitation email to an invited user.
 */

exports.onInvitationCreate = functions.firestore.document("invitations/{email}/teams/{teamId}").onCreate(
    (snap, context) => {
        //Collect needed information from db
        const invitation = snap.data();
        const email = context.params.email;
        const team = invitation.team || {};
        const to = email;
        const subject = "You have been invited to Green Up Day";
        const sender = invitation.sender.displayName;
        const reciever = invitation.teamMember.displayName        
        
        // Build information to be sent in the email notification
        const greeting = `Hey ${reciever  || ""}! ${ sender || "A friend"} has invited you to participate in Green Up Day.`;
        const where = team.location ? ` Where : ${ team.location }` : "";
        const date = team.date ? ` When : ${ team.date }` : "";
        const start = team.start ? ` Start Time : ${ team.start }` : "";
        const end = team.end ? ` End Time : ${ team.end }` : "";
        const teamName = `Team Name: ${ team.name }`;
        const owner = team.owner.displayName ? ` Team Captain : ${ team.owner.displayName }` : "";
        const town = team.townId ? ` Town : ${ team.townId }` : "";
        const notes = team.notes ? ` Description : ${ team.notes }` : "";
        
        const templateId = functions.config().sendgrid.teaminvitetemplateid;
        dynamicTemplateData = {
            greeting: greeting,
            teamName: teamName,
            owner: owner,
            date: date,
            start: start,
            end: end,
            town: town,
            where: where,
            notes: notes,
            subject: subject
        }
        return sendEmailWithSendGrid (templateId, to, dynamicTemplateData);
    });
/**
 * After user requests to join a team
 * Sends a an email to the team owner.
 */

exports.onJoinRequestCreate = functions.firestore.document("teams/{teamId}/requests/{userId}").onCreate(
    (snap, context) => {
        const teamId = context.params.teamId;
        let requesterName = snap.data().displayName;
        if (!requesterName) {
            requesterName = "Someone";
        }
        const templateId = functions.config().sendgrid.joinrequesttemplateid;
        const subject = requesterName + " would like to join your team";
        const db = admin.firestore();
        db.collection('teams').doc(teamId).get()
        .then((doc) => {
                const teamOwnerEmail = doc.data().owner.email;
                const greeting = `Hey ${doc.data().owner.displayName || ""}!`;
                dynamicTemplateData = {
                    requesterName: requesterName,
                    greeting: greeting,
                    subject: subject
                }
                return sendEmailWithSendGrid (templateId, teamOwnerEmail, dynamicTemplateData)
            })               
        .catch((err) => {
            console.error(err);            
            });
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