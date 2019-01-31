import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

const isInitialized = (state) => (
    state.userIsLoggedIn &&
    state.setupMessagesListener &&
    state.setupTeamsListener &&
    state.setupMyTeamsListeners &&
    state.setupProfileListener &&
    state.setupInvitationsListener
);


export function reducers(state = initialState.loading, action) {
    let newState = {};
    switch (action.type) {
        case types.LOGIN_SUCCESSFUL :
            newState = {...state, userIsLoggedIn: true};
            return {...newState, isInitialized: isInitialized(newState)};
        case types.FETCH_MESSAGES_SUCCESS:
            newState = {...state, setupMessaigesListener: true};
            return {...newState, isInitialized: isInitialized(newState)};
        case types.FETCH_TEAMS_SUCCESS :
            newState = {...state, setupTeamsListener: true};
            return {...newState, isInitialized: isInitialized(newState)};
        case types.FETCH_PROFILE_SUCCESS :
            newState = {...state, setupProfileListener: true};
            return {...newState, isInitialized: isInitialized(newState)};
        case types.FETCH_INVITEES_SUCCESS :
            newState = {...state, setupInvitationsListener: true};
            return {...newState, isInitialized: isInitialized(newState)};
        case types.TEAM_MEMBER_FETCH_SUCCESS :
            newState = {...state, setupMyTeamsListener: true};
            return {...newState, teamMembersLoaded: true, isInitialized: isInitialized(newState)};
        case types.RESET:
            return {
                ...state,
                initialAuthChecked: false,
                userIsLoggedIn: false,
                isInitialized: false
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
        case types.INITIALIZE_FAIL:
            return {
                ...state,
                isInitialized: false,
                initializeError: 'Failed to initialize user'
            };
        default:
            return state;
    }
}
