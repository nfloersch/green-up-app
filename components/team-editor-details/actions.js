// @flow

import * as types from '../../constants/actionTypes';
import * as firebaseDataLayer from '../../data-sources/firebase-data-layer';

export function saveTeam(team: Object) {
    return async function (dispatch) {
        const savedTeam = await firebaseDataLayer.saveTeam(team);
        dispatch({type: types.SAVE_TEAM_SUCCESS, savedTeam});
    };
}

export function deleteTeam(teamId: string) {
    return () => firebaseDataLayer.deleteTeam(teamId);
}

export function setSelectedTeamValue(key: string, value: any) {
    return {type: types.SET_SELECTED_TEAM_VALUE, data: {key, value}};
}
