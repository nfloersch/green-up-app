import * as types from '../../constants/actionTypes';
import Contact from '../../models/contact';
import Expo from 'expo';
import Team from '../../models/team';
import {firebaseDataLayer} from '../../data-sources/firebase-data-layer';
const _teams = [...Array(43)].map((t, i) => {
    return Team.create({_id: i.toString(), name: `Team ${i}`})
});

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
export function searchForTeams(searchString) {
    return function (dispatch) {
        return Promise.resolve().then(() => {
            const teams = _teams.filter(team => (team.name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0));
            dispatch({type: types.SEARCH_TEAMS_SUCCESS, teams});
        });
    };
}
export function selectTeam(team) {
    return {type: types.SELECT_TEAM, team};
}

export function saveTeam(team) {
    return async function (dispatch) {
        // Ask for permission to query contacts.
        const savedTeam = await firebaseDataLayer.saveTeam(team);
        dispatch({type: types.SAVE_TEAM_SUCCESS, savedTeam});
    };
}
