// @flow
import * as types from "../../constants/action-types";
import TeamMember from "../../models/team-member";
import * as memberStatus from "../../constants/team-member-statuses";
import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";
import * as messageTypes from "../../constants/message-types";
import Message from "../../models/message";

export const askToJoinTeam = (team: Object, user: Object): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        const message = Message.create({
            text: `${ user.displayName || user.email } is requesting to join ${ team.name } `,
            sender: user,
            teamId: team.id,
            type: messageTypes.REQUEST_TO_JOIN
        });
        const teamId = typeof team === "string" ? team : team.id;
        firebaseDataLayer.addTeamRequest(teamId, { ...user, memberStatus: memberStatus.REQUEST_TO_JOIN });
        firebaseDataLayer.sendUserMessage(team.owner.uid, message);
        dispatch({ type: types.REQUEST_MEMBERSHIP, data: team });
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const acceptInvitation = (teamId: string, user: Object): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        const newTeamMember = TeamMember.create(Object.assign({}, user, { memberStatus: memberStatus.ACCEPTED }));
        firebaseDataLayer.addTeamMember(teamId, newTeamMember, "ACCEPTED", dispatch);
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const selectTeam = (team: Object): ActionType => ({ type: types.SELECT_TEAM, team });


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

export const leaveTeam = (teamId: string, user: Object): ThunkType => {
    function thunk() {
        firebaseDataLayer.leaveTeam(teamId, user);
    }

    thunk.interceptOnOffline = true;
    return thunk;
};


export const removeTeamRequest = (teamId: string, user: UserType): ThunkType => {
    function thunk() {
        firebaseDataLayer.removeTeamRequest(teamId, user);
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
