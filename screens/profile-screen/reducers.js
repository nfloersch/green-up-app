import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export function reducers(state = initialState, action) {
    switch (action.type) {

        case types.FETCH_PROFILE_SUCCESS :
            return {
                ...state,
                profile: Object.assign({}, action.profile)
            };
        case types.FETCH_PROFILE_FAIL :
            return {
                ...state,
                profile: null
            };
        default:
            return state;
    }
}
