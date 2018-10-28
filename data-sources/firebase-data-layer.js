// @flow
import firebase from 'firebase';
import * as dataLayerActions from './data-layer-actions';
import {User} from '../models/user';
import {TeamMember} from '../models/team-member';
import * as types from '../constants/actionTypes';
import {firebaseConfig} from './firebase-config';
import 'firebase/firestore';

firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
});


let myTeamMemberListeners = {};


/** *************** INITIALIZATION *************** **/


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

function setupMessageListener(uid, dispatch) {
    const messages = firebase.database().ref(`messages/${uid}`);
    messages.on('value', (snapshot) => {
        dispatch(dataLayerActions.messageFetchSuccessful(snapshot.val()));
    });
}

function setupProfileListener(user, dispatch) {
    const {uid} = user;
    db.collection('profiles').doc(uid)
        .onSnapshot(doc => {
            if (doc.exists) {
                const profile = doc.data();
                dispatch(dataLayerActions.profileFetchSuccessful(profile));
                const removeUs = Object.keys(myTeamMemberListeners).filter(key => !(key in profile.teams));
                const addUs = Object.keys(profile.teams).filter(key => !(key in myTeamMemberListeners));
                // remove listeners for ex-team member list changes;
                removeUs.forEach(key => {
                    // unsubscribe listener
                    myTeamMemberListeners[key]();
                    // remove listener from cache
                    delete  myTeamMemberListeners[key];
                });
                // Add listeners for new team member list changes
                addUs.forEach(key => {
                    myTeamMemberListeners[key] = db.collection('teamMembers')
                        .onSnapshot(snapShot => {
                            dispatch(dataLayerActions.teamMemberFetchSuccessful(snapShot.data, id));
                        });
                });
            } else {
                // just in case
                createProfile(user);
            }
        });
}

function setupTeamListener(dispatch) {
    db.collection('teams')
        .onSnapshot(snapshot => {
            const data = snapshot.exists ? snapshot.data() : {};
            dispatch(dataLayerActions.teamFetchSuccessful(data));
        });
}

function setupTrashDropListener(dispatch) {
    db.collection('trashDrops').onSnapshot(snapshot => {
        const data = snapshot.exists ? snapshot.data() : {};
        dispatch(dataLayerActions.trashDropFetchSuccessful(data));
    });
}

function setupInvitationListener(email, dispatch) {
    db.collection('invitations')
        .doc(email)
        .onSnapshot(snapshot => {
            const data = snapshot.exists ? snapshot.data() : {};
            dispatch(dataLayerActions.invitationFetchSuccessful(data));
        });
}


function initializeUser(dispatch, user) {
    if (Boolean(user)) {
        dispatch(dataLayerActions.userAuthenticated(User.create(user)));
        dispatch({type: types.IS_LOGGING_IN_VIA_SSO, isLoggingInViaSSO: false});
        setupProfileListener(user, dispatch);
        setupMessageListener(user.uid, dispatch);
        setupTeamListener(dispatch);
        setupTrashDropListener(dispatch);
        setupInvitationListener(user.email, dispatch);
        // Get Town Data
        db.collection('townData').get().then(
            doc => {
                const myDispatch = doc.exists ? dataLayerActions.townDataFetchSuccessful(doc.data()) : dataLayerActions.townDataFetchFail();
                dispatch(myDispatch);
            });
        dispatch(dataLayerActions.initilizationSuccessful());
    } else {
        dispatch(dataLayerActions.userFailedAuthentication());
    }
}

/**
 *
 * @param {function} dispatch - dispatch funciton
 */
export function initialize(dispatch: any => any) {
    firebase.auth().onAuthStateChanged(user => initializeUser(dispatch, user));
}


/** *************** Profiles ***************  **/


export function updateProfile(profile: Object, teamMembers: Object) {
    const db = firebase.database();
    const membershipKey = profile.email.toLowerCase().replace(/\./g, ':');
    const newProfile = Object.assign({}, profile, {updated: (new Date()).toString()}); // TODO fix this hack right
    const profileUpdate = db.ref(`profiles/${profile.uid}`).set(newProfile);
    const teamUpdates = Object.keys(teamMembers).map(key => {
        const oldTeamMember = (teamMembers[key] || {})[membershipKey] || {};
        const newTeamMember = TeamMember.create({...oldTeamMember, ...newProfile});
        return db.ref(`teamMembers/${key}/${membershipKey}`).set(newTeamMember);
    });
    return Promise.all(teamUpdates.concat(profileUpdate));
}


function createProfile(user: User): Promise {
    const now = new Date();
    const newProfile = User.create(user);

    return db.collection('profiles').doc(newProfile.uid).set({
        ...newProfile,
        created: now,
        updated: now
    })
        .then(function (docRef) {
            console.log('Document written with ID: ', docRef.id);
        })
        .catch(function (error) {
            console.error('Error adding document: ', error);
        });
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
                }).catch(function (error) {
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
                }).catch(function (error) {
                console.log('Error getting document:', error);
            });
        });
}

export function loginWithEmailPassword(_email: string, password: string) {
    return firebase
        .auth()
        .signInWithEmailAndPassword(_email, password)
        .then(user => {
            const {uid, email, displayName, photoURL} = user;
            db.collection('profiles').doc(uid).get().then(
                doc => {
                    if (!doc.exists) {
                        createProfile({uid, email, displayName, photoURL});
                    }
                }).catch(function (error) {
                console.log('Error getting document:', error);
            });
        });
}

export function resetPassword(emailAddress: string) {
    return firebase.auth().sendPasswordResetEmail(emailAddress);
}

export function logout() {
    return firebase.auth().signOut();
}

export function updateEmail(email: string) {
    return firebase.auth().currentUser.updateEmail(email);
}


/** *************** MESSAGING *************** **/
export function sendUserMessage(userId, message) {
    const _message = stringifyDates(message);
    return firebase
        .database()
        .ref(`messages/${userId}`)
        .push(_message);
}

export function sendGroupMessage(group, message) {
    group.forEach((memberUID) => {
        sendUserMessage(memberUID, message);
    });
}

export function updateMessage(message: Object, userId: string) {
    const newMessage = Object.assign({}, message, {created: message.created.toString()}); // TODO fix this hack right
    return firebase
        .database()
        .ref(`messages/${userId}/${message.uid}`).set(newMessage);
}

export function deleteMessage(userId: string, messageId: string) {
    return firebase
        .database()
        .ref(`messages/${userId}/${messageId}`).remove();
}


/** *************** TEAMS *************** **/
export function saveTeam(team) {
    const _id = team.uid || team.id;
    const _team = {...team, uid: null};
    return firebase.database().ref(`teams/${_id}`).set(_team);
}

export function createTeam(team: Object = {}) {
    const db = firebase.database();
    const ownerId = (team.owner || {}).email.toLowerCase().replace(/\./g, ':');
    const uid = team.owner.uid;
    return db.ref('teams').push(team).then((_team) => {
        const teamId = _team.key;
        db.ref(`teamMembers/${teamId}/${ownerId}`).set(team.owner).then(
            () => {
                db.ref(`profiles/${uid}/teams/${teamId}`).set('OWNER');
            });
    });
}

export function deleteTeam(teamId: string) {
    const db = firebase.database();
    return db.ref(`teamMembers/${teamId}`).remove().then(() => {
        db.ref(`teams/${teamId}`).remove();
    });
}

export function saveLocations(locations: Object, teamId: string) {
    return firebase.database().ref(`teams/${teamId}/locations`).set(locations);
}

export function inviteTeamMember(invitation: Object) {
    const db = firebase.database();
    const membershipId = invitation.teamMember.email.toLowerCase().replace(/\./g, ':');
    const teamId = invitation.team.id;
    return db
        .ref(`invitations/${membershipId}/${teamId}`)
        .set(invitation)
        .then(db.ref(`teamMembers/${teamId}/${membershipId}`).set(invitation.teamMember));
}

export function addTeamMember(teamId: string, teamMember: Object) {
    const db = firebase.database();
    const membershipId = teamMember.email.toLowerCase().replace(/\./g, ':');
    return db.ref(`profiles/${teamMember.uid}/teams/${teamId}`).set('ACCEPTED')
        .then(() => db.ref(`invitations/${membershipId}/${teamId}`).remove()
            .then(() => db.ref(`teamMembers/${teamId}/${membershipId}`).set(teamMember))
        );
}

export function updateTeamMember(teamId, teamMember) {
    const db = firebase.database();
    const membershipId = teamMember.email.toLowerCase().replace(/\./g, ':');
    return db.ref(`teamMembers/${teamId}/${membershipId}`).set(teamMember);
}

export function removeTeamMember(teamId: string, teamMember: Object) {
    const db = firebase.database();
    const membershipId = teamMember.email.toLowerCase().replace(/\./g, ':');
    return db.ref(`teamMembers/${teamId}/${membershipId}`).remove();
}

export function leaveTeam(teamId: string, teamMember: Object) {
    const db = firebase.database();
    const membershipId = teamMember.email.toLowerCase().replace(/\./g, ':');
    return db.ref(`teamMembers/${teamId}/${membershipId}`).remove()
        .then(() => db.ref(`profiles/${teamMember.uid}/teams/${teamId}`).remove());
}

export function revokeInvitation(teamId: string, membershipId: string) {
    const db = firebase.database();
    const _membershipId = membershipId.toLowerCase().replace(/\./g, ':');
    return db.ref(`teamMembers/${teamId}/${_membershipId}`).remove()
        .then(() => db.ref(`invitations/${_membershipId}/${teamId}`).remove());
}


/** *************** TRASH DROPS *************** **/

export function dropTrash(trashDrop: Object) {
    firebase
        .database()
        .ref('trashDrops/')
        .push(trashDrop);
}

export function updateTrashDrop(trashDrop: Object) {
    firebase
        .database()
        .ref(`trashDrops/${trashDrop.uid}`)
        .set(trashDrop);
}

