// @flow

import * as types from '../../constants/actionTypes';
import Contact from '../../models/contact';
import Expo from 'expo';
import {TeamMember} from '../../models/team-member';
import {Invitation} from '../../models/invitation';
import * as memberStatus from '../../constants/team-member-statuses';
import {firebaseDataLayer} from '../../data-sources/firebase-data-layer';
import {Alert} from 'react-native';
import * as messageTypes from '../../constants/message-types';
import {Message} from '../../models/message';

export function retrieveContacts(_pageSize = 40) {
    return async function (dispatch) {
        // Ask for permission to query contacts.
        const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
        if (permission.status !== 'granted') {
            // Permission was denied...
            dispatch({type: types.RETRIEVE_CONTACTS_FAIL});
        }

        async function getContactsAsync(pageSize, pageOffset = 0) {
            const data = await Expo.Contacts.getContactsAsync({
                fields: [
                    Expo.Contacts.PHONE_NUMBERS, Expo.Contacts.EMAILS, Expo.Contacts.PHONETIC_FIRST_NAME, Expo.Contacts.PHONETIC_LAST_NAME
                ],
                pageSize,
                pageOffset
            });
            const contacts = data.data.map((contact) => (Contact.create(contact)));
            dispatch({type: types.RETRIEVE_CONTACTS_SUCCESS, contacts});
            return (data.hasNextPage !== 0)
                ? contacts.concat(getContactsAsync(pageSize, pageOffset + pageSize))
                : contacts;
        }

        getContactsAsync(_pageSize);
    };
}

export function inviteContacts(team: Object, currentUser: Object, teamMembers: [TeamMember]) {
    return async function () {
        teamMembers.forEach(teamMember => {
            const invitation = Invitation.create({team, sender: currentUser, teamMember});
            firebaseDataLayer.inviteTeamMember(invitation).catch(err => {
                Alert.alert(err);
                throw err;
            });
        });
    };
}

export function askToJoinTeam(team: Object, user: Object) {
    const message = Message.create({
        text: `${user.displayName || user.email} is requesting to join ${team.name} `,
        sender: user,
        teamId: team.id,
        type: messageTypes.REQUEST_TO_JOIN
    });
    const teamId = typeof team === 'string' ? team : team.id;

    return async function () {
        const potentialTeamMember = TeamMember.create(Object.assign({}, user, {memberStatus: memberStatus.REQUEST_TO_JOIN}));
        await firebaseDataLayer.addTeamMember(teamId, potentialTeamMember);
        await firebaseDataLayer.sendUserMessage(team.owner.uid, message);
    };
}

export function acceptInvitation(teamId: string, user: Object) {
    return function () {
        const newTeamMember = TeamMember.create(Object.assign({}, user, {memberStatus: memberStatus.ACCEPTED}));
        firebaseDataLayer.addTeamMember(teamId, newTeamMember);
    };
}

export function sendTeamMessage(teamMembers, message) {
    return async function () {
        const _teamMembers = Object.values(teamMembers).map(member => member.uid);
        firebaseDataLayer.sendGroupMessage(_teamMembers, message);
    };
}

export function selectTeam(team: Object) {
    return {type: types.SELECT_TEAM, team};
}

export function saveTeam(team: Object) {
    return async function (dispatch) {
        const savedTeam = await firebaseDataLayer.saveTeam(team);
        dispatch({type: types.SAVE_TEAM_SUCCESS, savedTeam});
    };
}

export function createTeam(team: Object) {
    return () => firebaseDataLayer.createTeam(team);
}

export function deleteTeam(teamId: string){
    return () => firebaseDataLayer.deleteTeam(teamId);
}

export function setSelectedTeamValue(key: string, value: any) {
    return {type: types.SET_SELECTED_TEAM_VALUE, data: {key, value}};
}

export function removeTeamMember(teamId: string, teamMember: Object) {
    return () => firebaseDataLayer.removeTeamMember(teamId, teamMember);
}

export function revokeInvitation(teamId: string, membershipId: string) {
    return () => firebaseDataLayer.revokeInvitation(teamId, membershipId);
}

export function addTeamMember(teamId: string, member: TeamMember, status: string) {
    const _newMember = TeamMember.create(Object.assign({}, member, {memberStatus: status || member.memberStatus}));
    return async function () {
        firebaseDataLayer.addTeamMember(teamId, _newMember);
    };
}

export function updateTeamMember(teamId: string, member: TeamMember, status: string) {
    const _newMember = TeamMember.create(Object.assign({}, member, {memberStatus: status || member.memberStatus}));
    return async function () {
        firebaseDataLayer.updateTeamMember(teamId, _newMember);
    };
}

export function saveLocations(locations, team) {
    return async function (dispatch) {
        if (team.id) {
            await firebaseDataLayer.saveLocations(locations, team.id);
        }

        dispatch({type: types.LOCATIONS_UPDATED, locations});
    };
}

export function selectTeamById(teamId: string) {
    return {type: types.SELECT_TEAM_BY_ID, teamId};
}

export function leaveTeam(teamId: string, user: Object) {
    return async function () {
        firebaseDataLayer.leaveTeam(teamId, user);
    };
}

export function deleteMessage(userId: string, messageId: string){
    return async function () {
        firebaseDataLayer.deleteMessage(userId, messageId);
    };
}
