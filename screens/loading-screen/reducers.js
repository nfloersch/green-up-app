import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export function reducers(state = initialState.loading, action) {
    switch (action.type) {
        case types.LOADING_COMPLETED:
            return {
                ...state,
                isLoadingComplete: action.isLoadingComplete
            };
        case types.INITIAL_AUTH_CHECKED:
            return {
                ...state,
                initialAuthChecked: action.initialAuthChecked,
                userIsLoggedIn: action.isLoggedIn
            };
        case types.LOADING_FAILED:
            return {
                ...state,
                skipLoadingScreen: true,
                loadingError: action.error
            };
        case types.NO_TEAMS_TO_LOAD:
            return {
                ...state,
                teamMembersLoaded: true
            };
        case types.TEAM_MEMBER_FETCH_SUCCESS:
            return {
                ...state,
                teamMembersLoaded: true
            };
        default:
            return state;
    }
}
