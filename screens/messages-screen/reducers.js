import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export function reducers(state = initialState.messages, action) {
    switch (action.type) {
        case types.NEW_MESSAGE:
            return {
                ...state,
                messages: Object.assign({}, state.messages, {[action.message.id]: action.message})
            };
        case types.FETCH_MESSAGES_SUCCESS :
            return {
                ...state,
                messages: action.messages,
                loaded: true
            };
        case types.FETCH_TEAMS_SUCCESS :
            return {
                ...state,
                teamsLoaded: true
            };
        case types.FETCH_INVITATIONS_SUCCESS:
            return {
                ...state,
                invitationsLoaded: true
            };
        default:
            return state;
    }
}
