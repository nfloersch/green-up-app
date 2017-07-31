import * as types from '../../constants/actionTypes';
import Expo from 'expo';
import {User} from '../../models/user';

var dummyUser = {
    _id: '123456',
    firstName: 'Andy',
    lastName: 'Pants',
    email: 'andy.pants@example.com'
};

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
    return  (dispatch) => {
        console.log('logout successful');
        dispatch({
            type: types.LOGOUT_SUCCESSFUL,
            session: {
                google: {},
                facebook: {},
                user: {}
            }
        });
    };
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
                    facebook : null,
                    user :  null
                }
            });
        }
    };
}
