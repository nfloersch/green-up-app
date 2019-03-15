/* eslint no-unused-vars: 1 */
// @flow

import firebase from 'firebase';
import * as dataLayerActions from './data-layer-actions';
import User from '../models/user';
import TeamMember from '../models/team-member';
import Town from '../models/town';
import Message from '../models/message';
import Invitation from '../models/invitation';
import * as types from '../constants/actionTypes';
import {firebaseConfig} from './firebase-config';
import 'firebase/firestore';
import {curry} from 'ramda';
import * as messageTypes from '../constants/message-types';
import TrashDrop from '../models/trash-drop';
import * as teamStatuses from '../constants/team-member-statuses';

firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// Disable deprecated features
db.settings({});

let myListeners = {};

const deconstruct = obj => JSON.parse(JSON.stringify(obj));

const removeListener = (key: string): void => {
    if (myListeners[key]) {
        myListeners[key]();
        delete myListeners[key];
    }
};

const addListener = (key: string, listener: any => any): void => {
    if (!key) {
        throw Error('Cannot add listener. Invalid listener key');
    }
    removeListener(key);
    myListeners[key] = listener;
};

const removeAllListeners = () => (
    new Promise((resolve, reject) => {
        try {
            Object.values(myListeners).forEach(listener => listener());
            myListeners = {};
            resolve(true);
        } catch (e) {
            reject(e);
        }
    })
);


function returnType(entry) {
    switch (true) {
        case (entry instanceof Date):
            return entry.toString();
        case Array.isArray(entry):
            return entry.map(x => returnType(x));
        case entry !== null && typeof entry === 'object' :
            return stringifyDates(entry); // eslint-disable-line
        default:
            return entry;
    }
}

function stringifyDates(obj) {
    return Object.entries(obj).reduce((returnObj, entry) => Object.assign({}, returnObj, {
        [entry[0]]: returnType(entry[1])
    }), {});
}

/** *************** Profiles ***************  **/

export function updateProfile(profile: Object, dispatch: any => any) {
    const newProfile = Object.assign({}, profile, {updated: (new Date()).toString()}); // TODO fix this hack right
    const profileUpdate = db.collection('profiles').doc(profile.uid).update(newProfile);
    return profileUpdate.catch((error) => {
        dispatch(dataLayerActions.profileUpdateFail(error));
    });
}

function createProfile(user: User, dispatch: any => void): Promise {
    const now = new Date();
    const newProfile = User.create(user);

    return db.collection('profiles').doc(newProfile.uid).set({
        ...newProfile,
        created: now,
        updated: now
    }).catch((error) => {
        dispatch(dataLayerActions.profileCreateFail(error));
    });
}

/** *************** INITIALIZATION *************** **/


function fetchEventInfo(dispatch) {
    db.collection('eventInfo').doc('eventSettings').get().then(
        doc => {
            if (!doc.exists) {
                throw Error('Failed to retrieve event info');
            }
            dispatch({type: types.FETCH_EVENT_INFO_SUCCESS, data: doc.data()});

        }).catch(
        (error) => {
            console.log('Error getting event info:', error);
        }
    );
}


function setupInvitedTeamMemberListener(teamId: string, dispatch: any => void): void {
    const ref = db.collection(`teams/${teamId}/invitees`);

    addListener(`teamMembers_${teamId}_invitees}`,
        ref.onSnapshot(
            querySnapshot => {
                const data = [];
                querySnapshot.forEach(_doc => data.push({..._doc.data(), id: _doc.id}));
                const invitees = data.reduce((obj, member) => ({...obj, [member.id]: member}), {});
                dispatch(dataLayerActions.inviteesFetchSuccessful(invitees, teamId));
            },
            ((error) => {
                console.log(error);
                // TODO : Handle the error
            })
        ));
}

function setupInvitationListener(email, dispatch) {
    const ref = db.collection(`/invitations/${email}/teams`);

    addListener(`invitations_${email}_teams`,
        ref.onSnapshot(
            querySnapshot => {
                const data = [];
                querySnapshot.forEach(doc => {
                    data.push(Invitation.create({...doc.data(), id: doc.id}));
                });
                // this should be an array not an object
                const invitations = data.reduce((obj, team) => ({...obj, [team.id]: team}), {});
                const messages = Object.values(data).reduce((obj, invite) => (
                    {
                        ...obj, [invite.id]: Message.create({
                            id: invite.id,
                            text: `${invite.sender.displayName} has invited you to join team : ${invite.team.name}`,
                            sender: invite.sender,
                            teamId: invite.team.id,
                            read: false,
                            active: true,
                            link: null,
                            type: messageTypes.INVITATION,
                            created: invite.created
                        })
                    }
                ), {});
                // Add listeners for new team member list changes
                // Object.keys(invitations).forEach(key => {
                //     setupInvitedTeamMemberListener(key, dispatch);
                // });
                dispatch(dataLayerActions.messageFetchSuccessful({invitations: messages}));
                dispatch(dataLayerActions.invitationFetchSuccessful(invitations));
            },
            ((error) => {
                console.log(error);
                // TODO : Handle the error
            })
        )
    );
}

function setupMessageListener(uid, dispatch) {
    const ref = db.collection(`messages/${uid}/messages`);

    addListener(`message_${uid}_messages`, ref.onSnapshot(
        querySnapshot => {
            const data = [];
            querySnapshot.forEach(doc => data.push({...doc.data(), id: doc.id}));
            const messages = data.reduce((obj, message) => ({...obj, [message.id]: Message.create(message)}), {});
            dispatch(dataLayerActions.messageFetchSuccessful({[uid]: messages}));
        },
        ((error) => {
            console.log(error);
            // TODO : Handle the error
        })
    ));
}

function setupTeamListener(dispatch) {

    addListener('teams', db.collection('teams')
        .onSnapshot(
            querySnapshot => {
                const data = [];
                querySnapshot.forEach(doc => data.push({...doc.data(), id: doc.id}));
                const teams = data.reduce((obj, team) => ({...obj, [team.id]: team}), {});
                dispatch(dataLayerActions.teamFetchSuccessful(teams));
            },
            ((error) => {
                console.log(error);
                // TODO : Handle the error
            })
        ));
}

function setupTeamMemberListener(teamIds: Array<string> = [], dispatch: any => void): void {
    return (teamIds || []).map(teamId => (
        addListener(`team_${teamId}_members`, db.collection(`teams/${teamId}/members`)
            .onSnapshot(
                querySnapshot => {
                    const data = [];
                    querySnapshot.forEach(_doc => data.push({..._doc.data(), id: _doc.id}));
                    const members = data.reduce((obj, member) => ({...obj, [member.id]: member}), {});
                    dispatch(dataLayerActions.teamMemberFetchSuccessful(members, teamId));
                },
                ((error) => {
                    console.log(error);
                    // TODO : Handle the error
                })
            ))
    ));
}

function setupTeamMessageListener(teamIds: Array<string>, dispatch: any => any) {
    (teamIds || []).map(teamId => {
        const ref = db.collection(`teams/${teamId}/messages`);

        addListener(`team_${teamId}_messages`, ref.onSnapshot(
            (querySnapshot => {
                const data = [];
                querySnapshot.forEach(doc => data.push({...doc.data(), id: doc.id}));
                const messages = data.reduce((obj, message) => ({...obj, [message.id]: Message.create(message)}), {});
                dispatch(dataLayerActions.messageFetchSuccessful({[teamId]: messages}));
            }),
            ((error) => {
                console.log(error);
                // TODO : Handle the error
            })
        ));
    });
}

function setupProfileListener(user, dispatch) {
    const {uid} = user;

    addListener(`profiles_${uid}`, db.collection('profiles').doc(uid)
        .onSnapshot(doc => {
            if (doc.exists) {
                const profile = doc.data();
                dispatch({type: types.FETCH_PROFILE_SUCCESS, profile});
            } else {
                // just in case
                createProfile(user, dispatch);
            }
        }));
}

function setupMyTeamsListener(user, dispatch) {
    const {uid} = user;

    addListener('myTeams', db.collection(`profiles/${uid}/teams`)
        .onSnapshot(querySnapshot => {
            const data = [];
            const ids = [];
            querySnapshot.forEach(doc => {
                data.push({...doc.data(), id: doc.id});
                ids.push(doc.id);
            });
            const myTeams = data.reduce((obj, team) => ({...obj, [team.id]: team}), {});
            dispatch({type: types.FETCH_MY_TEAMS_SUCCESS, myTeams});
            setupTeamMessageListener(ids, dispatch);
            setupTeamMemberListener(ids, dispatch);
        }));
}

function setupTrashDropListener(dispatch) {
    addListener('trashDrops', db.collection('trashDrops').onSnapshot(querySnapshot => {
        const trashDrops = [];
        querySnapshot.forEach(doc => {
            trashDrops.push(TrashDrop.create(doc.data(), doc.id));
        });
        dispatch({type: types.FETCH_TRASH_DROPS_SUCCESS, trashDrops});
    }));
}

// Get Town Data
function setupTownListener(dispatch) {
    addListener('towns', db.collection('towns').onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => data.push(Town.create(doc.data(), doc.id)));
        const towns = data.reduce((obj, town) => ({...obj, [town.id]: town}), {});
        setTimeout(() => dispatch({type: types.FETCH_TOWN_DATA_SUCCESS, towns}), 1);
    }));
}


// Initialize or de-initialize a user
const initializeUser = curry((dispatch, user) => {
    if (Boolean(user)) {
        fetchEventInfo(dispatch);
        setupMessageListener(user.uid, dispatch);
        setupTeamListener(dispatch);
        setupMyTeamsListener(user, dispatch);
        setupTrashDropListener(dispatch);
        setupInvitationListener(user.email, dispatch);
        setupTownListener(dispatch);
        setupProfileListener(user, dispatch);
        dispatch(dataLayerActions.userAuthenticated(User.create(user)));
        dispatch({type: types.IS_LOGGING_IN_VIA_SSO, isLoggingInViaSSO: false});
    } else {
        removeAllListeners();
        dispatch(dataLayerActions.userLoggedOut());
    }
});


/**
 * Sets up a listener that initializes the user after login, or resets app state after a logout.
 * @param {function} dispatch - dispatch function
 * @returns {void}
 */
export function initialize(dispatch: any => any) {
    firebase.auth().onAuthStateChanged(user => initializeUser(dispatch)(user));
}

/** *************** AUTHENTICATION *************** **/

export function createUser(email: string, password: string, displayName: string) {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password).then(
            response => createProfile({...User.create(response.user), displayName})
        );
}

export async function facebookAuth(token) {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase
        .auth
        .FacebookAuthProvider
        .credential(token);

    // Sign in with credential from the Facebook user.
    return firebase
        .auth()
        .signInWithCredential(credential)
        .then(user => {
            const {uid, email, displayName, photoURL} = user;
            db.collection('profiles').doc(uid).get().then(
                doc => {
                    if (!doc.exists) {
                        createProfile({uid, email, displayName, photoURL});
                    }
                }).catch((error) => {
                console.log('Error getting document:', error);
            });
        });
}

export async function googleAuth(token) {
    // Build Firebase credential with the Google access token.
    const credential = firebase.auth.GoogleAuthProvider.credential(token);
    return firebase.auth().signInWithCredential(credential)
        .then(user => {
            const {uid, email, displayName, photoURL} = user;
            db.collection('profiles').doc(uid).get().then(
                doc => {
                    if (!doc.exists) {
                        createProfile({uid, email, displayName, photoURL});
                    }
                }).catch((error) => {
                console.log('Error getting document:', error);
            });
        });
}

export function loginWithEmailPassword(_email: string, password: string) {
    return firebase
        .auth()
        .signInWithEmailAndPassword(_email, password)
        .then(userInfo => {
            const {uid, email, displayName, photoURL} = userInfo.user;
            db.collection('profiles').doc(uid).get().then(
                doc => {
                    if (!doc.exists) {
                        createProfile({uid, email, displayName, photoURL});
                    }
                }).catch((error) => {
                console.log('Error getting document:', error);
            });
        });
}

export function resetPassword(emailAddress: string) {
    return firebase.auth().sendPasswordResetEmail(emailAddress);
}

export function logout(dispatch) {
    removeAllListeners();
    dispatch(dataLayerActions.resetData());
    return firebase.auth().signOut();
}

export function updateEmail(email: string) {
    return firebase.auth().currentUser.updateEmail(email);
}

/** *************** MESSAGING *************** **/

export function sendUserMessage(userId, message) {
    const _message = deconstruct(stringifyDates(message));
    return db.collection(`messages/${userId}/messages`).add(_message);
}

export function sendGroupMessage(group, message) {
    group.forEach((memberUID) => {
        sendUserMessage(memberUID, deconstruct(message));
    });
}

export function sendTeamMessage(teamId, message) {
    return db.collection(`teams/${teamId}/messages`).add(deconstruct(message));
}

export function updateMessage(message: Object, userId: string) {
    const newMessage = deconstruct({...message, sender: {...message.sender}});
    return db.collection(`messages/${userId}/messages`).doc(message.id).set(newMessage);
}

export function deleteMessage(userId: string, messageId: string) {
    return db.collection(`messages/${userId}/messages`).doc(messageId).delete();
}

/** *************** TEAMS *************** **/

export function createTeam(team: Object = {}, user: User = {}) {
    const {uid} = user;
    const myTeam = deconstruct({...team, owner: {...user}});
    return db.collection('teams').add(myTeam)
        .then((docRef) => Promise.all([
            db.collection(`teams/${docRef.id}/members`).doc(team.owner.uid).set({...team.owner}),
            db.collection(`profiles/${uid}/teams`).doc(docRef.id).set({...myTeam, isMember: true})
        ]));
}

export function saveTeam(team) {
    const _team = deconstruct({...team, owner: {...team.owner}});
    return db.collection('teams').doc(team.id).set(_team);
}

export function deleteTeam(teamId: string) {
    return db.collection('teamMembers').doc(teamId).delete().then(() => {
        db.collection('teams').doc(teamId).delete();
    });
}

export function saveLocations(locations: Object, teamId: string) {
    return db.collection('teams').doc(teamId).update({locations: deconstruct({...locations})});
}

export function inviteTeamMember(invitation: Object) {
    const membershipId = invitation.teamMember.email.toLowerCase();
    const teamId = invitation.team.id;
    const sender = {...invitation.sender};
    const team = {...invitation.team, owner: {...invitation.team.owner}};
    const teamMember = {...invitation.teamMember};
    const invite = {...invitation, teamMember, team, sender};
    return db
        .collection(`invitations/${membershipId}/teams`)
        .doc(teamId)
        .set({...invite})
        .then(db.collection(`teams/${teamId}/invitations`).doc(membershipId).set(deconstruct({...invitation.teamMember})));
}

export function removeInvitation(teamId, email) {
    const deleteInvitation = db.collection(`invitations/${email}/teams`).doc(teamId).delete();
    const deleteTeamRecord = db.collection(`teams/${teamId}/invitations`).doc(email.toLowerCase().trim()).delete();
    return Promise.all([deleteInvitation, deleteTeamRecord]);
}

export function addTeamMember(teamId: string, user: Object, status?: string = 'ACCEPTED') {
    const email = user.email.toLowerCase().trim();
    const teamMember = TeamMember.create(Object.assign({}, user, {memberStatus: status}));
    const addToTeam = db.collection(`teams/${teamId}/members`).doc(teamMember.uid).set(deconstruct(teamMember));
    const addTeamToProfile = db.collection(`profiles/${user.uid}/teams`).doc(teamId).set({isMember: true});
    return Promise.all([addToTeam, addTeamToProfile]).then(() => removeInvitation(teamId, email));
}

export function updateTeamMember(teamId: string, teamMember: TeamMember) {
    return db.collection(`teams/${teamId}/members`).doc(teamMember.uid).set(deconstruct({...teamMember}));
}

export function removeTeamMember(teamId: string, teamMember: TeamMember) {
    const deleteFromTeam = db.collection(`teams/${teamId}/members`).doc(teamMember.uid).delete();
    const deleteFromProfile = db.collection(`profiles/${teamMember.uid}/teams`).doc(teamId).delete();
    return Promise.all([deleteFromTeam, deleteFromProfile]);
}

export function leaveTeam(teamId: string, teamMember: TeamMember) {
    const teams = {...teamMember.teams};
    delete teams[teamId];
    return db.collection(`teams/${teamId}/members`).doc(teamMember.uid).delete()
        .then(() => db.collection('profiles').doc(teamMember.uid).update({teams}));
}

export function revokeInvitation(teamId: string, membershipId: string) {
    const _membershipId = membershipId.toLowerCase();
    return db.collection(`teams/${teamId}/members`).doc(_membershipId).delete()
        .then(() => db.collection(`invitations/${_membershipId}/teams`).doc(teamId).delete());
}

export function addTeamRequest(teamId: string, user: Object) {
    const email = user.email.toLowerCase().trim();
    const teamMember = TeamMember.create(Object.assign({}, user, {memberStatus: teamStatuses.REQUEST_TO_JOIN}));
    const teamRequest = db.collection(`teams/${teamId}/requests`).doc(teamMember.uid).set(deconstruct(teamMember));
    const addTeamToProfile = db.collection(`profiles/${user.uid}/teams`).doc(teamId).set({isMember: true});
    return Promise.all([teamRequest, addTeamToProfile]).then(() => removeInvitation(teamId, email));
}

/** *************** TRASH DROPS *************** **/

export function dropTrash(trashDrop: Object) {
    db.collection('trashDrops').add(deconstruct({...trashDrop, location: {...trashDrop.location}}));
}

export function updateTrashDrop(trashDrop: Object) {
    db.collection('trashDrops').doc(trashDrop.uid).set(deconstruct({...trashDrop, location: {...trashDrop.location}}));
}
