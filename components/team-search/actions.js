// @flow

import * as types from '../../constants/actionTypes';

export function selectTeam(team: Object) {
    return {type: types.SELECT_TEAM, team};
}
