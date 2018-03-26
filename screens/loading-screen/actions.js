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

export function isLoggingInViaSSO(_isLoggingInViaSSO: Boolean) {
    return {type: types.IS_LOGGING_IN_VIA_SSO, isLoggingInViaSSO: _isLoggingInViaSSO};
}

export function updateEmail(email) {
    return {type: types.EMAIL_UPDATE, email};
}