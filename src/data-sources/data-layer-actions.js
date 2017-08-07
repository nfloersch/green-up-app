
import * as types from '../constants/actionTypes';

export function userAuthenticated(user) {
    return {type: types.LOGIN_SUCCESSFUL, user};
}

export function noCurrentUser() {
    return {type: types.NO_CURRENT_USER};
}

export function userLoggedOut() {
    return {type: types.LOGOUT_SUCCESSFUL};
}

export function userFailedLogOut(error) {
    return {type: types.LOGOUT_FAIL, error};
}

export function userFailedAuthentication(error) {
    return {type: types.LOGIN_FAIL, error};
}

