// @flow
import * as types from "../../constants/action-types";
import TeamMember from "../../models/team-member";
import * as memberStatus from "../../constants/team-member-statuses";
import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";
import * as messageTypes from "../../constants/message-types";
import Message from "../../models/message";

export const askToJoinTeam = (team: Object, user: Object) => {
    async function thunk() {
        const message = Message.create({
            text: `${ user.displayName || user.email } is requesting to join ${ team.name } `,
            sender: user,
            teamId: team.id,
            type: messageTypes.REQUEST_TO_JOIN
        });
        const teamId = typeof team === "string" ? team : team.id;
        await firebaseDataLayer.addTeamRequest(teamId, user, memberStatus.REQUEST_TO_JOIN);
        await firebaseDataLayer.sendUserMessage(team.owner.uid, message);
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const acceptInvitation = (teamId: string, user: Object) => {
    function thunk(dispatch) {
        const newTeamMember = TeamMember.create(Object.assign({}, user, { memberStatus: memberStatus.ACCEPTED }));
        firebaseDataLayer.addTeamMember(teamId, newTeamMember, "ACCEPTED", dispatch);
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export function selectTeam(team: Object) {
    return { type: types.SELECT_TEAM, team };
}


export const revokeInvitation = (teamId: string, membershipId: string) => {
    function thunk(dispatch) {
        firebaseDataLayer.revokeInvitation(teamId, membershipId)
            .then(dispatch({ type: types.REVOKE_INVITATION_SUCCESS, data: { teamId, membershipId } }))
            .catch(error => ({ type: types.REVOKE_INVITATION_FAIL, data: { teamId, membershipId }, error }));
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const leaveTeam = (teamId: string, user: Object) => {
    function thunk() {
        firebaseDataLayer.leaveTeam(teamId, user);
    }

    thunk.interceptOnOffline = true;
    return thunk;
};


export const removeTeamRequest = (teamId: string, user: Object) => {
    function thunk() {
        firebaseDataLayer.removeTeamRequest(teamId, user);
    }

    thunk.interceptOnOffline = true;
    return thunk;
};


export const deleteMessage = (userId: string, messageId: string) => {
    function thunk() {
        firebaseDataLayer.deleteMessage(userId, messageId);
    }

    thunk.interceptOnOffline = true;
    return thunk;
};
