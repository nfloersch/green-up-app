import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';
export function loginReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESSFUL:
            return {
                ...state,
                session: {user: action.user}
            };
        default:
            return state;
    }
}
