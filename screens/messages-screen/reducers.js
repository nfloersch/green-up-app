import * as types from '../../constants/actionTypes';

const initialState = {
    messages: {},
    messagesLoaded: false,
    teamsLoaded: false
};

export function reducers(state = initialState, action) {
    switch (action.type) {
        case types.NEW_MESSAGE:
            return {
                ...state,
                messages: Object.assign({}, state.messages, {[action.message.uid]: action.message})
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
        default:
            return state;
    }
}
