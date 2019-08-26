// import * as types from '../../constants/actionTypes';
import initialState from "../../reducers/initial-state";
import * as types from "../../constants/action-types";

export function reducers(state = initialState.about, action) {
    switch (action.type) {
        case types.FETCH_EVENT_INFO_SUCCESS:
            return { ...state, ...action.data };
        case types.RESET:
            return initialState.about;
        default:
            return state;
    }
}
