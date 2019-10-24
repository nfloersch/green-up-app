// @flow
import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";

export const fetchTownData = (): ThunkType => {
    // this is not used anywhere
    function thunk(dispatch: Dispatch) {
        firebaseDataLayer.fetchTownData(dispatch);
    }

    return thunk;
};