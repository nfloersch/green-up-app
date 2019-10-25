// @flow
import initialState from "./initial-state";
import * as types from "../constants/action-types";

export const aboutReducers = (state: Object = initialState.about, action: ActionType): Object => {
    switch (action.type) {
        case types.FETCH_EVENT_INFO_SUCCESS:
            return { ...state, ...action.data };
        case types.RESET:
            return initialState.about;
        default:
            return state;
    }
};
