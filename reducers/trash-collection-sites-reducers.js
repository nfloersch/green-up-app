// @flow
import initialState from "./initial-state";
import * as types from "../constants/action-types";

export const trashCollectionSitesReducers = (state: Object = initialState.trashCollectionSites, action: ActionType): Object => {
    switch (action.type) {
        case types.FETCH_TRASH_COLLECTION_SITES_SUCCESS :
            return { sites: action.data, error: null };
        case types.FETCH_TRASH_COLLECTION_SITES_FAIL :
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};
