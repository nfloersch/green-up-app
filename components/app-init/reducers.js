// @flow
import * as types from "../../constants/action-types";
import initialState from "../../reducers/initialState";

export function reducers(state = initialState.loading, action) {
    switch (action.type) {
        case types.RESET:
            return {
                ...state, initialAuthChecked: false,
                userIsLoggedIn: false
            };
        case types.LOADING_COMPLETED:
            return {
                ...state,
                isLoadingComplete: action.isLoadingComplete,
                teamMembersLoaded: false,
                loadingError: null
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
        case types.INITIALIZE_SUCCESS:
            return {
                ...state,
                isInitialized: true
            };
        case types.INITIALIZE_FAIL:
            return {
                ...state,
                isInitialized: false,
                initializeError: "Failed to initialize user"
            };
        default:
            return state;
    }
}
