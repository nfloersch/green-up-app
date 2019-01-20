import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';
import User from '../../models/user';

export function reducers(state = initialState.profile, action) {
    switch (action.type) {

        case types.FETCH_PROFILE_SUCCESS :
            return {
                ...state,
                ...User.create(action.profile)
            };
        case types.FETCH_PROFILE_FAIL :
            return {
                ...state,
                ...User.create()
            };
        case types.FETCH_MY_TEAMS_SUCCESS :
            return {
                ...state,
                teams: action.myTeams
            };
        case types.RESET:
            return {...state, profile: initialState.profile};
        default:
            return state;
    }
}
