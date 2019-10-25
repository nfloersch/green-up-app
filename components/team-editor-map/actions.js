// @flow
import * as types from "../../constants/action-types";
import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";

export const saveLocations = (locations: Array<LocationType>, team: TeamType): ThunkType => {
    async function thunk(dispatch: Dispatch<ActionType>) {
        if (team.id) {
            await firebaseDataLayer.saveLocations(locations, team.id);
        }
        dispatch({ type: types.LOCATIONS_UPDATED, locations });
    }

    thunk.interceptOnOffline = true;
    return thunk;
};
