import * as types from '../../constants/actionTypes';
import Expo from 'expo';
import {User} from '../../models/user';
import {AsyncStorage} from 'react-native';

var dummyUser = {
    _id: '123456',
    firstName: 'Andy',
    lastName: 'Pants',
    email: 'andy.pants@example.com'
};

export function isLoggedIn() {
    return async function logIn(dispatch) {
        let token = null;
        try {
            const _creds = await AsyncStorage.getItem('@GreenUpVermont:loginCredentials');
            const creds = JSON.parse(_creds);
            switch (true) {
                case creds && !!creds.facebook :
                    facebook = creds.facebook;
                    const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${facebook.token}`);
                    const userInfo = await response.json();
                    const user = User.create(userInfo);
                    dispatch({
                        type: types.LOGIN_SUCCESSFUL,
                        session: {
                            facebook,
                            user
                        }
                    });
                    break;
                case creds && !!creds.google :
                    token = creds.google.token;
                    break;
                case creds && !!creds.firebase:
                    token = creds.firebase.token;
                    break;
                default:
                    return false;
                    break;
            }

        } catch (error) {
            return false;
        }
    }
}

export function login(username, password) {
    console.log('user logged in with ' + username + ' - ' + password);
    return {
        type: types.LOGIN_SUCCESSFUL,
        session: {
            user: dummyUser
        }
    };
}


export function logout() {
    return async (dispatch) => {
        try {
            const results = await
            AsyncStorage.removeItem('@GreenUpVermont:loginCredentials');
            console.log('logout successful');
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
                type: types.LOGIN_SUCCESSFUL,
                session: {
                    facebook,
                    user
                }
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
