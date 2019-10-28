// @flow
import * as types from "../../constants/action-types";
import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";

export const saveTeam = (team: Object): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        firebaseDataLayer.saveTeam(team).then((savedTeam: Object) => {
            dispatch({ type: types.SAVE_TEAM_SUCCESS, savedTeam });
        }).catch((error: Error) => {
            dispatch({ type: types.SAVE_TEAM_FAIL, data: team, error });
        });
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const deleteTeam = (teamId: string): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        firebaseDataLayer.deleteTeam(teamId).then((data: Object) => {
            dispatch({ type: types.DELETE_TEAM_SUCCESS, data });
        }).catch((error: Error) => {
            dispatch({ type: types.DELETE_TEAM_FAIL, data: teamId, error });
        });
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const setSelectedTeamValue = (key: string, value: any): ActionType => ({
    type: types.SET_SELECTED_TEAM_VALUE,
    data: { key, value }
});
