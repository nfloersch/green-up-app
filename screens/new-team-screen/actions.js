// @flow

import TeamMember from "../../models/team-member";

import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";

import Team from "../../models/team";

export const createTeam = (team: Object): ThunkType => {
    const thunk = function (dispatch: Dispatch<any>) {
        firebaseDataLayer.createTeam(Team.create(team), TeamMember.create(team.owner), dispatch);
    };
    return thunk;
};

