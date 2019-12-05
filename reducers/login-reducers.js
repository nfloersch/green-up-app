// @flow
import * as types from "../constants/action-types";
import initialState from "./initial-state";

export const loginReducers = (state: Object = initialState.login, action: ActionType): Object => {
    switch (action.type) {
        case types.LOGIN_SUCCESSFUL:
            return {
                ...state,
                createUserError: null,
                userIsLoggedIn: true,
                user: action.data,
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
            return {
                ...state,
                user: null,
                createUserError: null,
                userIsLoggedIn: false,
                initialAuthChecked: true,
                isLoggingInViaSSO: false,
                loginError: null,
                creatingUser: false
            };
        // case actionTypes.IS_LOGGING_IN_VIA_SSO:
        //     return {
        //         ...state,
        //         initialAuthChecked: true,
        //         createUserError: null,
        //         isLoggingInViaSSO: action.data
        //     };
        default:
            return state;
    }
};


