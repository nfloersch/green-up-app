// @flow

import {firebaseDataLayer} from '../../data-sources/firebase-data-layer';

export function fetchSupplyLocations() {
    return (dispatch) => firebaseDataLayer.fetchSupplyLocations(dispatch);
}