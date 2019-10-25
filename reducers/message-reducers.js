// @flow
import * as types from "../constants/action-types";
import initialState from "./initial-state";

const deconstruct = (obj: Object): Object => JSON.parse(JSON.stringify(obj));

export const messageReducers = (state: Object = initialState.messages, action: ActionType): Object => {
    switch (action.type) {
        case types.NEW_MESSAGE:
            return {
                ...state,
                messages: Object.assign({}, state.messages, { [action.message.id]: action.message })
            };
        case types.FETCH_MESSAGES_SUCCESS :
            return {
                ...state,
                messages: { ...state.messages, ...deconstruct(action.messages) },
                loaded: true
            };
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
};
