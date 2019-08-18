// @flow
import * as types from "../../constants/action-types";
import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";
import Message from "../../models/message";
import * as statuses from "../../constants/team-member-statuses";

export function addMessageSuccess(data) {
    return { type: types.NEW_MESSAGE, data };
}

export function sendUserMessage(message: Object, recipients: [Object]) {
    const _message = Message.create(message);
    const _recipients = recipients.filter(recipient => recipient.memberStatus === statuses.ACCEPTED || recipient.memberStatus === statuses.OWNER);
    return () => _recipients.map(recipient => firebaseDataLayer.sendUserMessage(recipient.uid, _message));
}


export function sendTeamMessage(teamId: String, message: Object) {
    const _message = Message.create(message);
    return () => firebaseDataLayer.sendTeamMessage(teamId, _message);
}

export function readMessageSuccess(data) {
    return { type: types.READ_MESSAGE, data };
}

export function readMessage(message, userID) {
    const _message = Object.assign({}, message, { read: true });
    return () => firebaseDataLayer.updateMessage(_message, userID)
        .catch(error => {
            console.log(error);
        });
}

export function selectTeamById(teamId: string) {
    return { type: types.SELECT_TEAM_BY_ID, teamId };
}

