import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export function reducers(state = initialState, action) {
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
        default:
            return state;
    }
}
