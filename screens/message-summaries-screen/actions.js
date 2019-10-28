// @flow
import * as types from "../../constants/action-types";
import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";

export const readMessageSuccess = (data: Object): Object => ({ type: types.READ_MESSAGE_SUCCESS, data });

export const readMessage = (message: MessageType, userId: string): ThunkType => {
    function thunk() {
        const _message = Object.assign({}, message, { read: true });
        firebaseDataLayer.updateMessage(_message, userId)
            .catch((error: Error) => {
                // eslint-disable-next-line no-console
                console.error(error);
            });
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const selectTeamById = (teamId: string): ActionType => ({ type: types.SELECT_TEAM_BY_ID, data: teamId });

