// @flow
import * as types from "../constants/action-types";
import initialState from "./initial-state";

export const trashTrackerReducers = (state: Object = initialState.trashTracker, action: ActionType): Object => {
    switch (action.type) {
        case types.FETCH_TRASH_DROPS_SUCCESS:
            return {
                ...state,
                trashDrops: action.data
            };
        case types.USER_LOCATION_UPDATED:
            return {
                ...state,
                location: action.data
            };
        case types.TOGGLE_TRASH_DATA:
            return {
                ...state,
                [(action.data || {}).toggle]: (action.data || {}).value
            };
        case types.RESET:
            return { ...state, trashTracker: initialState.trashTracker };
        default:
            return state;
    }
};
