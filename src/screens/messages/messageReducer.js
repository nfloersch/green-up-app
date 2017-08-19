import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export function messageReducer(state = initialState, action) {
    var newState = {};
    switch (action.type) {
        case types.NEW_MESSAGE:
            newState = {
                ...state,
                messages: Object.assign({}, state.messages, {[action.message.uid]: action.message})
            };
            return newState;
        case types.FETCH_MESSAGES_SUCCESS :
            newState = {
                ...state,
                messages: action.messages
            };
            return newState;
        default:
            return state;
    }
}
