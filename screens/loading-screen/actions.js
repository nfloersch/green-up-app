import {firebaseDataLayer} from '../../data-sources/firebase-data-layer';
import * as types from '../../constants/actionTypes';


export function getCurrentUser() {
    return (dispatch) => {
        firebaseDataLayer.getCurrentUser(dispatch);
    };
}

export function loadingFailed(error) {
    return {type: types.LOADING_FAILED, isLoadingComplete: true, error: error};
}

export function loadingCompleted() {
    return {type: types.LOADING_COMPLETED, isLoadingComplete: true};
}

export function initialize() {
    return (dispatch: Object => any) => firebaseDataLayer.initialize(dispatch);
}