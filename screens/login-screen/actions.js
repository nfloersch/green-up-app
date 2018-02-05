// @flow

import * as types from '../../constants/actionTypes';
import Expo from 'expo';
// import {User} from '../../models/user';
// import {AsyncStorage} from 'react-native';
import {firebaseDataLayer} from '../../data-sources/firebase-data-layer';

export function getCurrentUser() {
    return (dispatch) => {
        firebaseDataLayer.initialize(dispatch);
    };
}

export function logout() {
    return async (dispatch: Object => *) => {
        try {
            const results = await firebaseDataLayer.logout();
            // await Auth.GoogleSignInApi.signOut(apiClient);
            dispatch({
                type: types.LOGOUT_SUCCESSFUL,
                results
            });
        } catch (error) {
            dispatch({
                type: types.LOGOUT_FAIL,
                error
            });
        }
    };
}

export function createUser(email: string, password: string) {
    return (dispatch: Object => *) => {
        firebaseDataLayer.createUser(email, password).then(() => {
            dispatch({type: types.CREATING_USER});
        }).catch(error => {
            dispatch({type: types.CREATE_USER_FAIL, error});
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
                iosClientId: '439621369113-9iqssauvd4jnr3kqrl6it7sjdock5n53.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
                useBrowser: true
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
        console.log(type);
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`);
            const userInfo = await response.json();
            console.log(`facebook login successful for ${ userInfo.name}`);

            firebaseDataLayer.facebookAuth(token).catch((error) => {
                dispatch({
                    type: types.LOGIN_FAIL,
                    error
                });
            });
        } else {
            console.log('facebook login failed');
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
