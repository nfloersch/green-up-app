import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export function reducers(state = initialState.login, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESSFUL:
            return {
                ...state,
                userIsLoggedIn: true,
                user: action.user,
                initialAuthChecked: true,
                loginError: null,
                creatingUser: false
            };
        case types.LOGIN_FAIL:
            return {
                ...state,
                user: null,
                userIsLoggedIn: false,
                initialAuthChecked: true,
                loginError: action.error,
                creatingUser: false
            };
        case types.LOGOUT_SUCCESSFUL:
            return initialState.login;
        case types.CREATING_USER:
            return {
                ...state,
                creatingUser: true
            };
        case types.LOGOUT_FAIL:
            return initialState.login;
        case types.IS_LOGGING_IN_VIA_SSO:
            return {
                ...state, initialAuthChecked: true,
                isLoggingInViaSSO: action.isLoggingInViaSSO
            };
        case types.CREATE_USER_FAIL :
            return {
                ...state, createUserError: action.error
            };
        default:
            return state;
    }
}
