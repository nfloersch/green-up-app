// @flow
import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";

export function initialize() {
    return (dispatch: Object => any) => firebaseDataLayer.initialize(dispatch);
}