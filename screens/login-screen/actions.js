// @flow

import * as types from '../../constants/actionTypes';
import Expo from 'expo';
// import {User} from '../../models/user';
// import {AsyncStorage} from 'react-native';
import {firebaseDataLayer} from '../../data-sources/firebase-data-layer';

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
                androidClientId: '439621369113-oe6f0lm8a5qds59019dfpjf5dnl364g0.apps.googleusercontent.com',
                androidStandaloneAppClientId: '439621369113-qhjq9o6e5ile1e1grlcpm6i1ett9f834.apps.googleusercontent.com',
                iosClientId: '439621369113-9iqssauvd4jnr3kqrl6it7sjdock5n53.apps.googleusercontent.com',
                iosStandaloneAppClientId:'439621369113-o7buqq3g66656fhvj4d4t6be0cubgkjg.apps.googleusercontent.com',
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
        const facebook = await Expo.Facebook.logInWithReadPermissionsAsync('1345826968841458', {
            behavior: 'web', permissions: ['public_profile', 'email']
        });
        const {type, token} = facebook;
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            // const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`);
            // const userInfo = await response.json();

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
            .then(() => dispatch({type: types.RESET_PASSSWORD_SUCCESS}))
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

