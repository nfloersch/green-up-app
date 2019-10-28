// @flow
import * as types from "../constants/action-types";
import initialState from "./initial-state";
import User from "../models/user";

export function profileReducers(state: Object = initialState.profile, action: ActionType): Object {
    switch (action.type) {

        case types.FETCH_PROFILE_SUCCESS :
            return {
                ...state,
                ...User.create({ ...action.data, teams: state.teams || {} })
            };
        case types.FETCH_PROFILE_FAIL :
            return {
                ...state,
                ...User.create()
            };
        case types.FETCH_MY_TEAMS_SUCCESS :
            return {
                ...state,
                teams: action.data
            };
        case types.RESET:
            return { ...state, profile: initialState.profile };
        default:
            return state;
    }
}
