// @flow
import * as types from "../../constants/action-types";
import TeamMember from "../../models/team-member";
import * as memberStatus from "../../constants/team-member-statuses";
import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";
import * as messageTypes from "../../constants/message-types";
import Message from "../../models/message";

export function askToJoinTeam(team: Object, user: Object) {
    const message = Message.create({
        text: `${user.displayName || user.email} is requesting to join ${team.name} `,
        sender: user,
        teamId: team.id,
        type: messageTypes.REQUEST_TO_JOIN
    });
    const teamId = typeof team === "string" ? team : team.id;

    return async function () {
        await firebaseDataLayer.addTeamRequest(teamId, user, memberStatus.REQUEST_TO_JOIN);
        await firebaseDataLayer.sendUserMessage(team.owner.uid, message);
    };
}

export function acceptInvitation(teamId: string, user: Object) {
    return function (dispatch) {
        const newTeamMember = TeamMember.create(Object.assign({}, user, { memberStatus: memberStatus.ACCEPTED }));
        firebaseDataLayer.addTeamMember(teamId, newTeamMember, "ACCEPTED", dispatch);
    };
}

export function selectTeam(team: Object) {
    return { type: types.SELECT_TEAM, team };
}


export function revokeInvitation(teamId: string, membershipId: string) {
    return (dispatch) => firebaseDataLayer.revokeInvitation(teamId, membershipId)
        .then(dispatch({ type: types.REVOKE_INVITATION_SUCCESS, data: { teamId, membershipId } }))
        .catch(error => ({ type: types.REVOKE_INVITATION_FAIL, data: { teamId, membershipId }, error }));
}

export function leaveTeam(teamId: string, user: Object) {
    return async function () {
        firebaseDataLayer.leaveTeam(teamId, user);
    };
}

export function removeTeamRequest(teamId: string, user: Object) {
    return async function () {
        firebaseDataLayer.removeTeamRequest(teamId, user);
    };
}

export function deleteMessage(userId: string, messageId: string) {
    return async function () {
        firebaseDataLayer.deleteMessage(userId, messageId);
    };
}
