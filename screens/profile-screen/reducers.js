import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';
import {User} from '../../models/user';

export function reducers(state = initialState, action) {
    switch (action.type) {

        case types.FETCH_PROFILE_SUCCESS :
            return {
                ...state,
                ...action.profile
            };
        case types.FETCH_PROFILE_FAIL :
            return {
                ...state
            };
        default:
            return state;
    }
}
