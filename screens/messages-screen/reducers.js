import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

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
                messages: action.messages
            };
        default:
            return state;
    }
}
