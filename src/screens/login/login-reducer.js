import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';
export function loginReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESSFUL:
            return {
                ...state,
                user: action.user,
                initialAuthChecked: true,
                creatingUser: false

            };
        case types.LOGIN_FAIL:
            return {
                ...state,
                user: null,
                initialAuthChecked: true,
                creatingUser: false


            };
        case types.LOGOUT_SUCCESSFUL:
            return {
                ...state,
                user: null,
                initialAuthChecked: true,
                creatingUser: false
            };
        case types.LOGOUT_FAIL:
            return {
                ...state,
                initialAuthChecked: true
            };

        case types.CREATING_USER:
            return{
                ...state,
                initialAuthChecked: true,
                creatingUser: true
            };

        default:
            return state;
    }
}
