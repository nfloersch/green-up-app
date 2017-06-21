import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';
export function messageReducer(state = initialState, action) {
    switch (action.type) {
        case types.NEW_MESSAGE:
            return {
                ...state,
                messages: []
                    .concat(state.messages)
                    .concat(action.data.message)
            };
        default:
            return state;
    }
}
