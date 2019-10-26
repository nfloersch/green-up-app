// @flow
import * as types from "../constants/action-types";
import initialState from "./initial-state";

export const trashTrackerReducers = (state: Object = initialState.trashTracker, action: ActionType): Object => {
    switch (action.type) {
        case types.FETCH_TRASH_DROPS_SUCCESS:
            return {
                ...state,
                trashDrops: action.trashDrops
            };
        case types.USER_LOCATION_UPDATED:
            return {
                ...state,
                location: action.location
            };
        case types.TOGGLE_TRASH_DATA:
            return {
                ...state,
                [action.toggle]: action.value
            };
        case types.RESET:
            return { ...state, trashTracker: initialState.trashTracker };
        default:
            return state;
    }
};
