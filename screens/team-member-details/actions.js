// @flow
import * as types from "../../constants/action-types";
import TeamMember from "../../models/team-member";
import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";

export const removeTeamMember = (teamId: string, teamMember: Object): ThunkType => {
    function thunk() {
        firebaseDataLayer.removeTeamMember(teamId, teamMember);
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const revokeInvitation = (teamId: string, membershipId: string): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        firebaseDataLayer.revokeInvitation(teamId, membershipId)
            .then(() => {
                dispatch({ type: types.REVOKE_INVITATION_SUCCESS, data: { teamId, membershipId } });
            })
            .catch((error: Error) => {
                dispatch({ type: types.REVOKE_INVITATION_FAIL, data: { teamId, membershipId }, error });
            });
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const updateTeamMember = (teamId: string, member: TeamMember, status: string): ThunkType => {
    function thunk() {
        const _newMember = TeamMember.create(Object.assign({}, member, { memberStatus: status || member.memberStatus }));
        firebaseDataLayer.updateTeamMember(teamId, _newMember);
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const deleteMessage = (userId: string, messageId: string): ThunkType => {
    function thunk() {
        firebaseDataLayer.deleteMessage(userId, messageId);
    }

    thunk.interceptOnOffline = true;
    return thunk;
};
