// @flow
import * as types from "../constants/action-types";
import initialState from "./initial-state";
import User from "../models/user";
import * as R from "ramda";

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
        case types.LEAVE_TEAM_SUCCESS:
            const teams = R.pickBy(key => key !== action.data)(state.teams);
            return {
                ...state,
                teams
            };
        case types.LEAVE_TEAM_FAIL:
            return {
                ...state,
                error: action.error
            };
        case types.RESET:
            return initialState.profile;
        default:
            return state;
    }
}
