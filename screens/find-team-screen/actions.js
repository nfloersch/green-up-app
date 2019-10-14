// @flow
import * as types from "../../constants/action-types";

export function selectTeam(team: Object) {
    return { type: types.SELECT_TEAM, team };
}
