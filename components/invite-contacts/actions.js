// @flow
import * as types from "../../constants/action-types";
import Contact from "../../models/contact";

import * as Contacts from "expo-contacts";
import * as Permissions from "expo-permissions";
import TeamMember from "../../models/team-member";
import Invitation from "../../models/invitation";
import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";
import { Alert } from "react-native";


export function retrieveContacts(_pageSize: number = 40): (Dispatch<Object> => Promise<any>) {
    return async function (dispatch: Dispatch<ActionType>) {

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
            dispatch({ type: types.RETRIEVE_CONTACTS_SUCCESS, contacts });
            return (data.hasNextPage !== 0)
                ? contacts.concat(getContactsAsync(pageSize, pageOffset + pageSize))
                : contacts;
        }

        try {

            const foo = Permissions.CONTACTS;
            // Ask for permission to query contacts.
            const permission = await Permissions.askAsync(foo);
            if (permission.status !== "granted") {
                // Permission was denied...
                dispatch({ type: types.RETRIEVE_CONTACTS_FAIL });
            } else {
                // we have permission lets start getting contacts
                getContactsAsync(_pageSize);
            }
        }
        catch (error) {
            dispatch({ type: types.RETRIEVE_CONTACTS_FAIL });
        }
    };
}

export function inviteContacts(team: Object, currentUser: Object, teamMembers: [TeamMember]): (Dispatch<any> => Promise<any>) {
    return async function () {
        teamMembers.forEach((teamMember: TeamMemberType) => {
            const invitation = Invitation.create({ team, sender: currentUser, teamMember });
            firebaseDataLayer.inviteTeamMember(invitation).catch((err: Error) => {
                Alert.alert(err);
                throw err;
            });
        });
    };
}