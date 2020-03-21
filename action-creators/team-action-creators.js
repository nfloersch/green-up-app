// @flow
import * as types from "../constants/action-types";
import TeamMember from "../models/team-member";
import Invitation from "../models/invitation";
import * as memberStatus from "../constants/team-member-statuses";
import * as firebaseDataLayer from "../data-sources/firebase-data-layer";
import * as messageTypes from "../constants/message-types";
import Message from "../models/message";
import Team from "../models/team";
import * as Contacts from "expo-contacts";
import Contact from "../models/contact";
import * as Permissions from "expo-permissions";

export const retrieveContacts = (_pageSize: number = 40): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        // recursively get all contacts
        async function getContactsAsync(pageSize: number, pageOffset: number = 0): Promise<any> {
            const data = await Contacts.getContactsAsync({
                fields: [
                    Contacts.PHONE_NUMBERS, Contacts.EMAILS, Contacts.PHONETIC_FIRST_NAME, Contacts.PHONETIC_LAST_NAME
                ],
                pageSize,
                pageOffset
            });
            const contacts = data.data.map((contact: ContactType): ContactType => Contact.create(contact));
            dispatch({ type: types.RETRIEVE_CONTACTS_SUCCESS, data: contacts });
            return (data.hasNextPage)
                ? contacts.concat(getContactsAsync(pageSize, pageOffset + pageSize))
                : contacts;
        }

        // Ask for permission to query contacts.
        Permissions.askAsync(Permissions.CONTACTS)
            .then((permission) => {
                if (permission.status !== "granted") {
                    // Permission was denied...
                    dispatch({
                        type: types.RETRIEVE_CONTACTS_FAIL,
                        error: "User has not granted permission to access contacts"
                    });
                } else {
                    // we have permission lets start getting contacts
                    getContactsAsync(_pageSize);
                }
            })
            .catch((error) => {
                dispatch({ type: types.RETRIEVE_CONTACTS_FAIL, error });
            });
    }

    thunk.interceptOnOffline = false;
    return thunk;
};

export const inviteContacts = (team: Object, currentUser: Object, teamMembers: [TeamMember]): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        const invites = teamMembers.map((teamMember: TeamMemberType): Promise<any> => {
            const invitation = Invitation.create({ team, sender: currentUser, teamMember });
            return firebaseDataLayer.inviteTeamMember(invitation);
        });
        Promise.all(invites)
            .then((data: Array<any>) => {
                dispatch({ type: types.SEND_INVITATIONS_SUCCESS, data });
            })
            .catch(error => {
                dispatch({ type: types.SEND_INVITATIONS_FAIL, error });
            });
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const askToJoinTeam = (team: Object, user: Object): ThunkType => {
    function thunk() {
        const message = Message.create({
            text: `${ user.displayName || user.email } is requesting to join ${ team.name } `,
            sender: user,
            teamId: team.id,
            type: messageTypes.REQUEST_TO_JOIN
        });
        const teamId = typeof team === "string" ? team : team.id;
        firebaseDataLayer.addTeamRequest(teamId, user);
        firebaseDataLayer.sendUserMessage(team.owner.uid, message);
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const removeTeamRequest = (teamId: string, user: Object): ThunkType => {
    function thunk() {
        // TODO: determine if we need something more than deleting request silently
        firebaseDataLayer.removeTeamRequest(teamId, user);
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


export const sendGroupMessage = (messageRecipients: Array<{ uid: string }>, message: MessageType): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        firebaseDataLayer.sendGroupMessage(messageRecipients, message)
            .then((responses: Array<mixed>) => {
                dispatch({ type: types.SEND_GROUP_MESSAGE_SUCCESS, data: responses });
            })
            .catch((error: Error) => {
                dispatch({ type: types.SEND_GROUP_MESSAGE_FAIL, error });
            });
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const selectTeam = (team: Object): ActionType => ({ type: types.SELECT_TEAM, data: team });

export const saveTeam = (team: Object): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        firebaseDataLayer.saveTeam(team)
            .then((savedTeam: TeamType) => {
                dispatch({ type: types.SAVE_TEAM_SUCCESS, savedTeam });
            })
            .catch((error: Error) => {
                dispatch({ type: types.SAVE_TEAM_FAIL, error });
            });
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const createTeam = (team: Object, user: UserType): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        firebaseDataLayer.createTeam(Team.create(team), TeamMember.create(user), dispatch);
    }

    thunk.interceptOnOffline = true;
    return thunk;

};

export const deleteTeam = (teamId: string): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        firebaseDataLayer.deleteTeam(teamId)
            .then((data: any) => {
                dispatch({ type: types.DELETE_TEAM_SUCCESS, data });
            })
            .catch((error: Error) => {
                dispatch({ type: types.DELETE_TEAM_FAIL, error });
            });
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const setSelectedTeamValue = (key: string, value: any): ActionType => (
    {
        type: types.SET_SELECTED_TEAM_VALUE,
        data: { key, value }
    }
);


export const removeTeamMember = (teamId: string, teamMember: Object): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        firebaseDataLayer.removeTeamMember(teamId, teamMember)
            .then((data: any) => {
                dispatch({ type: types.REMOVE_TEAM_MEMBER_SUCCESS, data });
            })
            .catch((error: Error) => {
                dispatch({ type: types.REMOVE_TEAM_MEMBER_FAIL, error });
            });
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

export const addTeamMember = (teamId: string, member: TeamMember, status: string): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        const newMember = TeamMember.create(Object.assign({}, member, { memberStatus: status || member.memberStatus }));
        firebaseDataLayer.addTeamMember(teamId, newMember, "ACCEPTED", dispatch)
            .then(() => {
                dispatch({ type: types.ADD_TEAM_MEMBER_SUCCESS, data: { teamId, newMember } });
            })
            .catch((error: Error) => {
                dispatch({ type: types.ADD_TEAM_MEMBER_FAIL, data: { teamId, newMember }, error });
            });
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const updateTeamMember = (teamId: string, member: TeamMember, status: string): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        const newMember = TeamMember.create(Object.assign({}, member, { memberStatus: status || member.memberStatus }));
        firebaseDataLayer.updateTeamMember(teamId, newMember)
            .then(() => {
                dispatch({ type: types.UPDATE_TEAM_MEMBER_SUCCESS, data: { teamId, newMember } });
            })
            .catch((error: Error) => {
                dispatch({ type: types.UPDATE_TEAM_MEMBER_FAIL, data: { teamId, newMember }, error });
            });
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const saveLocations = (locations: Array<LocationType>, team: TeamType): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        if (team.id) {
            firebaseDataLayer.saveLocations(locations, team.id)
                .then(() => {
                    dispatch({ type: types.SAVE_LOCATIONS_SUCCESS, data: locations });
                })
                .catch((error: Error) => {
                    dispatch({ type: types.SAVE_LOCATIONS_FAIL, error, data: locations });
                });
        } else {
            dispatch({ type: types.SAVE_LOCATIONS_FAIL, error: "Invalid Team" });
        }
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const selectTeamById = (teamId: string): ActionType => ({ type: types.SELECT_TEAM_BY_ID, data: teamId });

export const leaveTeam = (teamId: string, user: Object): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        firebaseDataLayer.leaveTeam(teamId, user).then(() => {
            dispatch({ type: types.DELETE_MESSAGE_SUCCESS });
        })
            .catch((error: Error) => {
                dispatch({ type: types.DELETE_MESSAGE_FAIL, error });
            });
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export const deleteMessage = (userId: string, messageId: string): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        firebaseDataLayer.deleteMessage(userId, messageId)
            .then(() => {
                dispatch({ type: types.LEAVE_TEAM_SUCCESS });
            })
            .catch((error: Error) => {
                dispatch({ type: types.LEAVE_TEAM_FAIL, error });
            });
    }

    thunk.interceptOnOffline = true;
    return thunk;
};
