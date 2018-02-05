import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export function reducers(state = initialState, action) {
    switch (action.type) {
        case types.LOGOUT_SUCCESSFUL:
            return {
                ...state,
                currentUser: null
            };
        default:
            return state;
    }
}
