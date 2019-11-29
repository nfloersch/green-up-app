// @flow
import initialState from "./initial-state";
import * as types from "../constants/action-types";

export const celebrationsReducers = (state: Object = initialState.supplyDistributionSites, action: ActionType): Object => {
    switch (action.type) {
        case types.FETCH_CELEBRATIONS_SUCCESS :
            return { celebrations: action.data, error: null };
        case types.FETCH_CELEBRATIONS_FAIL :
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};