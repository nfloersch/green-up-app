import {firebaseDataLayer} from '../../data-sources/firebase-data-layer';
import * as types from '../../constants/actionTypes';

export function getCurrentUser() {
    return (dispatch) => {
        firebaseDataLayer.initialize(dispatch);
    };
}

export function loadingFailed(error) {
    return {type: types.LOADING_FAILED, isLoadingComplete: true, error: error};
}

export function loadingCompleted() {
    return {type: types.LOADING_COMPLETED, isLoadingComplete: true};
}

export function initializeFirebase() {
    return (dispatch) => {
        firebaseDataLayer.initialize(dispatch).then(() => {
            dispatch({type: types.INITIALIZE_SUCCESS});
        }).catch(error => {
            dispatch({type: types.INITIALIZE_FAIL, error});
        });
    };
}