import * as types from "../../constants/action-types";
import initialState from "../../reducers/initialState";

const deconstruct = (obj) => JSON.parse(JSON.stringify(obj));

export function reducers(state = initialState.messages, action) {
    var newState;
    switch (action.type) {
        case types.NEW_MESSAGE:
            return {
                ...state,
                messages: Object.assign({}, state.messages, { [action.message.id]: action.message })
            };
        case types.FETCH_MESSAGES_SUCCESS :
            newState = {
                ...state,
                messages: { ...state.messages, ...deconstruct(action.messages) },
                loaded: true
            };
            return newState;
        case types.FETCH_TEAMS_SUCCESS :
            return {
                ...state,
                teamsLoaded: true
            };
        case types.RESET:
            return { ...state, messages: initialState.messages };
        default:
            return state;
    }
}
