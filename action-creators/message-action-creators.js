// @flow
import * as types from "../constants/action-types";
import * as firebaseDataLayer from "../data-sources/firebase-data-layer";
import Message from "../models/message";
import * as statuses from "../constants/team-member-statuses";

export const addMessageSuccess = (data: any): ActionType => ({ type: types.NEW_MESSAGE, data });

export const sendUserMessage = (message: Object, recipients: Array<TeamMemberType>): ThunkType => {
    function thunk() { // No dispatch needed, this is fire and forget.
        const _message = Message.create(message);
        const _recipients = recipients.filter((recipient: TeamMemberType): boolean => recipient.memberStatus === statuses.ACCEPTED || recipient.memberStatus === statuses.OWNER);
        _recipients.forEach((recipient: TeamMemberType) => {
            firebaseDataLayer.sendUserMessage((recipient.uid || ""), _message);
        });
    }

    thunk.interceptOnOffline = true;
    return thunk;

};

export const sendTeamMessage = (teamId: string, message: Object): ThunkType => {
    function thunk() { // No dispatch needed, this is fire and forget.
        firebaseDataLayer.sendTeamMessage(teamId, Message.create(message));
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const readMessage = (message: MessageType, userId: string): ThunkType => {

    function thunk(dispatch: Dispatch<ActionType>) {
        const _message = Object.assign({}, message, { read: true });
        dispatch({ type: types.READ_MESSAGE_SUCCESS, data: message.id });

        firebaseDataLayer
            .updateMessage(_message, userId)
            .catch((error: Error) => {
                // eslint-disable-next-line no-console
                console.error(error);
                dispatch({ type: types.READ_MESSAGE_FAIL, data: message.id });
            });
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const selectTeamById = (teamId: string): ActionType => ({ type: types.SELECT_TEAM_BY_ID, data: teamId });

export const readMessageSuccess = (data: Object): Object => ({ type: types.READ_MESSAGE_SUCCESS, data });
