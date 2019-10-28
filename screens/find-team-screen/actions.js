// @flow
import * as types from "../../constants/action-types";

export function selectTeam(team: Object): Object {
    return { type: types.SELECT_TEAM, data: team };
}
