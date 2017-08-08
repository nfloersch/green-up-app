import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';
export function messageReducer(state = initialState, action) {
    switch (action.type) {
        case types.NEW_MESSAGE:
            let session = state.session;
            let user = state.session.user;
            let newState = {
                ...state,
                session: {
                    ...session,
                    user: {
                        ...user,
                        messages: [].concat(state.session.user.messages).concat(action.message)
                    }
                }
            };
            return newState;
        default:
            return state;
    }
}
