// @flow

import * as types from '../../constants/actionTypes';
import Expo from 'expo';
import * as firebaseDataLayer from '../../data-sources/firebase-data-layer';
import {thirdPartyConfig} from '../../config/third-party-config';


export function getCurrentUser() {
    return (dispatch: Object => *) => {
        firebaseDataLayer.getCurrentUser(dispatch);
    };
}


export function logout() {
    return (dispatch: Object => *) => {
        firebaseDataLayer.logout()
            .then((results) => {
                dispatch({
                    type: types.LOGOUT_SUCCESSFUL,
                    results
                });
            })
            .catch(err => {
                dispatch({type: types.LOGOUT_FAIL, err});
            });
    };

}

export function createUser(email: string, password: string, displayName: string) {
    return (dispatch: Object => *) => {
        dispatch({type: types.CREATING_USER});
        const _promise = firebaseDataLayer.createUser(email, password, displayName);
        return _promise.catch(error => {
            dispatch({type: types.CREATE_USER_FAIL, error: error.message || 'Could not create acount.'});
        });
    };
}

export function loginWithEmailPassword(email: string, password: string) {
    return (dispatch: Object => *) => {
        firebaseDataLayer.loginWithEmailPassword(email, password).catch(error => {
            dispatch({type: types.LOGIN_FAIL, error});
        });
    };
}

export function googleLogin() {
    return async function logIn(dispatch: Object => *) {

        try {
            const result = await Expo.Google.logInAsync({
                androidClientId: thirdPartyConfig.androidClientId,
                androidStandaloneAppClientId: thirdPartyConfig.androidStandaloneAppClientId,
                iosClientId: thirdPartyConfig.iosClientId,
                iosStandaloneAppClientId: thirdPartyConfig.iosStandaloneAppClientId,
                scopes: ['profile', 'email'],
                useBrowser: true,
                behavior:'web'
            });

            if (result.type === 'success') {
                firebaseDataLayer.googleAuth(result.idToken).catch(error => {
                    dispatch({
                        type: types.LOGIN_FAIL,
                        error
                    });
                });
            } else {
                dispatch({
                    type: types.LOGIN_FAIL,
                    error: 'Google authentication failed'
                });
            }
        } catch (error) {
            dispatch({type: types.LOGIN_FAIL, error});
        }
    };
}

export function facebookLogin() {
    return async function logIn(dispatch: Object => *) {
        const facebook = await Expo.Facebook.logInWithReadPermissionsAsync(thirdPartyConfig.facebookAppId, {
            behavior: 'web', permissions: ['public_profile', 'email']
        });
        const {type, token} = facebook;
        if (type === 'success') {
            firebaseDataLayer.facebookAuth(token).catch((error) => {
                dispatch({
                    type: types.LOGIN_FAIL,
                    error
                });
            });
        } else {
            dispatch({
                type: types.LOGIN_FAIL,
                session: {
                    facebook: null,
                    user: null
                }
            });
        }
    };
}

export function resetPassword(emailAddress: string) {
    return (dispatch) => {
        firebaseDataLayer.resetPassword(emailAddress)
            .then(() => dispatch({type: types.RESET_PASSWORD_SUCCESS}))
            .catch(error => {
                dispatch(
                    {
                        type: types.RESET_PASSWORD_FAIL,
                        error
                    }
                );
            });
    };
}

export function isLoggingInViaSSO(_isLoggingInViaSSO: Boolean) {
    return {type: types.IS_LOGGING_IN_VIA_SSO, isLoggingInViaSSO: _isLoggingInViaSSO};
}

