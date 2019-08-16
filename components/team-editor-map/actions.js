// @flow
import * as types from "../../constants/action-types";
import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";

export function saveLocations(locations, team) {
    return async function (dispatch) {
        if (team.id) {
            await firebaseDataLayer.saveLocations(locations, team.id);
        }
        dispatch({ type: types.LOCATIONS_UPDATED, locations });
    };
}
