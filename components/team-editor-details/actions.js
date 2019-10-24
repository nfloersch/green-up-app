// @flow
import * as types from "../../constants/action-types";
import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";

export const saveTeam = (team: Object): ThunkType => {
    async function thunk(dispatch: Dispatch<Object>) {
        const savedTeam = await firebaseDataLayer.saveTeam(team);
        dispatch({ type: types.SAVE_TEAM_SUCCESS, savedTeam });
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const deleteTeam = (teamId: string): ThunkType => {
    function thunk() {
        firebaseDataLayer.deleteTeam(teamId);
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const setSelectedTeamValue = (key: string, value: any): ActionType => ({
    type: types.SET_SELECTED_TEAM_VALUE,
    data: { key, value }
});
