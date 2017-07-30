import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';
export function loginReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESSFUL:
            return {
                ...state,
                session: action.session
            };
        case types.LOGIN_FAIL:
            return {
                ...state,
                session: action.session
            };
        case types.LOGOUT_SUCCESSFUL:
            return {
                ...state,
                session: action.session
            };
        default:
            return state;
    }
}
