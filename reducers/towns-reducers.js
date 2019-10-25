// @flow
import initialState from "./initial-state";
import * as types from "../constants/action-types";

export const townsReducers = (state: Object = initialState.towns, action: ActionType): Object => {
    switch (action.type) {
        case types.FETCH_TOWN_DATA_SUCCESS :
            return {
                ...state,
                townData: Object.assign({}, action.data)
            };
        case types.FETCH_SUPPLY_LOCATIONS_FAIL :
            return {
                ...state,
                townData: {}
            };
        default:
            return state;
    }
};
