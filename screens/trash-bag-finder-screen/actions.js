// @flow

import {firebaseDataLayer} from '../../data-sources/firebase-data-layer';

export function fetchTownData() {
    // this is not used anywhere
    return (dispatch) => firebaseDataLayer.fetchTownData(dispatch);
}