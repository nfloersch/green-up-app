// @flow
import * as types from "../constants/action-types";
import initialState from "./initial-state";

export const userLocationReducers = (state: Object = initialState.userLocation, action: ActionType): Object => {
    switch (action.type) {
        case types.USER_LOCATION_UPDATE_SUCCESS:
            return {
                ...state,
                ...action.data,
                error: null
            };
        case types.USER_LOCATION_UPDATE_FAIL:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};
