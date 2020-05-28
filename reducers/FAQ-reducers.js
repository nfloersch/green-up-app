// @flow
import * as types from "../constants/action-types";
import initialState from "./initial-state";

export const FAQReducers = (state: Object = initialState.faqs, action: ActionType): Object => {
    switch (action.type) {
        case types.FETCH_FAQS_SUCCESS:
            return {
                ...state,
                faqs: action.data
            };
        case types.TOGGLE_FAQ_DATA:
            return {
                ...state,
                [(action.data || {}).toggle]: (action.data || {}).value
            };
        case types.RESET:
            return initialState.faqs;
        default:
            return state;
    }
};
