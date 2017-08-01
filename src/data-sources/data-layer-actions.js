import * as types from '../constants/actionTypes';
import {AsyncStorage} from 'react-native';


export function userAuthenticated(user) {
    return {
        type: types.LOGIN_SUCCESSFUL,
        session: {session:{user}}
    };
}

export function userFailedAuthentication(session) {
    return {
        type: types.LOGIN_FAIL
    };
}