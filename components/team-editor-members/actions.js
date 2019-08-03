// @flow

import * as types from '../../constants/actionTypes';
import TeamMember from '../../models/team-member';
import * as firebaseDataLayer from '../../data-sources/firebase-data-layer';
import * as statuses from '../../constants/team-member-statuses';

export function removeTeamMember(teamId: string, teamMember: Object) {
    return () => firebaseDataLayer.removeTeamMember(teamId, teamMember);
}

export function revokeInvitation(teamId: string, membershipId: string) {
    return (dispatch) => firebaseDataLayer.revokeInvitation(teamId, membershipId)
        .then(dispatch({type: types.REVOKE_INVITATION_SUCCESS, data: {teamId, membershipId}}))
        .catch(error => ({type: types.REVOKE_INVITATION_FAIL, data: {teamId, membershipId}, error}));
}

export function addTeamMember(teamId: string, member: TeamMember) {
    const _newMember = TeamMember.create(Object.assign({}, member, {memberStatus: statuses.ACCEPTED}));
    return async function () {
        firebaseDataLayer.addTeamMember(teamId, _newMember);
    };
}

export function updateTeamMember(teamId: string, member: TeamMember) {
    const _newMember = TeamMember.create(Object.assign({}, member, {memberStatus: statuses.ACCEPTED}));
    return async function () {
        firebaseDataLayer.updateTeamMember(teamId, _newMember);
    };
}
