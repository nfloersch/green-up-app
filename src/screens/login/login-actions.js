import * as types from '../../constants/actionTypes';
import Expo from 'expo';
import {User} from '../../models/user';
import {AsyncStorage} from 'react-native';
import {firebaseDataLayer} from '../../data-sources/firebase-data-layer';

export function getCurrentUser() {
     return (dispatch) => {
        firebaseDataLayer.initialize(dispatch);
    };
}

export function logout() {
    return async (dispatch) => {
        try {
            const results = await
                AsyncStorage.removeItem('@GreenUpVermont:loginCredentials');
                firebaseAuth.signOut();
    // Auth.GoogleSignInApi.signOut(apiClient);
            dispatch({
                type: types.LOGOUT_SUCCESSFUL,
                session: {
                    google: {},
                    facebook: {},
                    user: {}
                }
            });
        } catch (err) {
            dispatch({
                type: types.LOGOUT_SUCCESSFUL,
                session: {
                    google: {},
                    facebook: {},
                    user: {}
                }
            });
        }
    };
}


export function createUser(email, password){
    return (dispactch) => {
        firebaseDataLayer.createUser(email, password);
    }
}

export function facebookLogin() {
    return async function logIn(dispatch) {
        const facebook = await Expo.Facebook.logInWithReadPermissionsAsync('1345826968841458', {
            behavior: 'web', permissions: ['public_profile', 'email']
        });
        const {type, token} = facebook;
        console.log(type);
        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`);
            const userInfo = await response.json();
            const user = User.create(userInfo);
            console.log('facebook login successful for ' + user.name);
            try {
                await AsyncStorage.setItem('@GreenUpVermont:loginCredentials', JSON.stringify({facebook}));
            } catch (error) {
                // Error saving data -- looks like we'll have to log in next time too, bummer.
                console.log('error saving facebook creds' + error.toString());
            }
            dispatch({
                type: types.SESSION_STARTED,
                session: {
                    facebook
                }
            });
            firebaseDataLayer.facebookAuth(token).catch(() => {
                dispatch({
                    type: types.LOGIN_FAIL,
                    session: {
                        facebook: null,
                        user: null
                    }
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