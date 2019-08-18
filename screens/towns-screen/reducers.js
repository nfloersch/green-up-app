import * as types from "../../constants/action-types";
import initialState from "../../reducers/initialState";

export function reducers(state = initialState.towns, action) {
    switch (action.type) {

        case types.FETCH_TOWN_DATA_SUCCESS :
            return {
                ...state,
                townData: Object.assign({}, action.towns)
            };
        case types.FETCH_SUPPLY_LOCATIONS_FAIL :
            return {
                ...state,
                townData: {}
            };
        default:
            return state;
    }
}
