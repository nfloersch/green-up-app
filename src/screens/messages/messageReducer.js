import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';
export function messageReducer(state = initialState, action) {
    switch (action.type) {
        case types.NEW_MESSAGE:
            const session = state.session;
            const user = state.session.user;
            const newState = {
                ...state,
                user: {
                    ...user,
                    messages: [].concat(state.session.user.messages).concat(action.message)
                }
            };
            return newState;
        default:
            return state;
    }
}
