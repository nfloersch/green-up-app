import * as types from "../../constants/action-types";
import initialState from "../../reducers/initial-state";

export function reducers(state = initialState.login, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESSFUL:
            return {
                ...state,
                createUserError: null,
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
                createUserError: null,
                userIsLoggedIn: false,
                isLoggingInViaSSO: false,
                initialAuthChecked: true,
                loginError: action.error,
                creatingUser: false
            };
        case types.LOGOUT_SUCCESSFUL:
            return {
                ...state,
                user: null,
                createUserError: null,
                userIsLoggedIn: false,
                initialAuthChecked: true,
                loginError: null,
                creatingUser: false
            };
        case types.CREATING_USER:
            return {
                ...state,
                creatingUser: true,
                createUserError: null
            };
        case types.CREATE_USER_FAIL:
            return {
                ...state,
                createUserError: action.error
            };
        case types.RESET:
            return { ...state,
                user: null,
                createUserError: null,
                userIsLoggedIn: false,
                initialAuthChecked: true,
                isLoggingInViaSSO: false,
                loginError: null,
                creatingUser: false };
        case types.IS_LOGGING_IN_VIA_SSO:
            return {
                ...state,
                initialAuthChecked: true,
                createUserError: null,
                isLoggingInViaSSO: action.isLoggingInViaSSO
            };
        default:
            return state;
    }
}
