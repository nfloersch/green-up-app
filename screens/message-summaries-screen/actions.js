// @flow
import * as types from "../../constants/action-types";
import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";

export function readMessageSuccess(data) {
    return { type: types.READ_MESSAGE, data };
}

export const readMessage = (message, userID) => {
    function thunk() {
        const _message = Object.assign({}, message, { read: true });
        firebaseDataLayer.updateMessage(_message, userID)
            .catch(error => {
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

