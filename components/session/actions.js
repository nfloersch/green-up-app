// @flow
import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";

export const initialize = (): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        firebaseDataLayer.initialize(dispatch);
    }

    thunk.interceptOnOffline = true;
    return thunk;
};