import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export function reducers(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESSFUL:
            return {
                ...state,
                userIsLoggedIn: true,
                user: action.user
            };
        case types.LOGIN_FAIL:
            return {
                ...state,
                user: null,
                userIsLoggedIn: false,
                loginError: action.error
            };
        case types.LOGOUT_SUCCESSFUL:
            return {
                ...state,
                userIsLoggedIn: false
            };
        case types.LOGOUT_FAIL:
            return {
                ...state,
                user: null,
                userIsLoggedIn: false
            };
        default:
            return state;
    }
}
