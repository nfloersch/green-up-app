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
    return (dispatch) => _recipients.map(recipient => firebaseDataLayer.sendUserMessage(recipient.uid, _message, dispatch));
}

export const sendTeamMessage = (teamId: String, message: Object) => {
    function thunk(dispatch) {
        const _message = Message.create(message);
        firebaseDataLayer.sendTeamMessage(teamId, _message, dispatch);
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export function readMessageSuccess(data) {
    return { type: types.READ_MESSAGE, data };
}

export const readMessage = (message, userID) => {

    function thunk(dispatch) {
        const _message = Object.assign({}, message, { read: true });
        firebaseDataLayer.updateMessage(_message, userID).then(res => {
            dispatch(readMessage(res));
        }).catch(error => {
            // eslint-disable-next-line no-console
            console.error(error);
        });
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export function selectTeamById(teamId: string) {
    return { type: types.SELECT_TEAM_BY_ID, teamId };
}

