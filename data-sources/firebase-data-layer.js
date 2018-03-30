import firebase from 'firebase';
import * as dataLayerActions from './data-layer-actions';
import {User} from '../models/user';
import {TeamMember} from '../models/team-member';
import * as types from '../constants/actionTypes';

// TODO : Fix these promise chains
// Some of these functions have nested promises where some of the promised are ignored (Not returned)
// Use async await for those and refactor to be more transactional in case of failure.
// We should also add catches to all promises where appropriate. (JN)

let myTeamMemberListeners = [];

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

function setupMessageListener(userId, dispatch) {
    const messages = firebase.database().ref(`messages/${userId}`);
    messages.on('value', (snapshot) => {
        dispatch(dataLayerActions.messageFetchSuccessful(snapshot.val()));
    });
}

function setupProfileListener(userId, dispatch) {
    const db = firebase.database();
    const profile = db.ref(`profiles/${userId}`);
    profile.on('value', (snapshot) => {
        const data = snapshot.val() || {};
        dispatch(dataLayerActions.profileFetchSuccessful(data));

        const newTeamMemberListeners = Object.keys(data.teams || {});

        // remove old listeners for teamMemberLists
        const removeUs = myTeamMemberListeners.filter(l => newTeamMemberListeners.indexOf(l) === -1);
        removeUs.forEach(id => {
            db.ref(`teamMembers/${id}`).off('value');
        });

        // add new listeners for teamMemberLists
        const addUs = newTeamMemberListeners.filter(l => myTeamMemberListeners.indexOf(l) === -1);

        myTeamMemberListeners = newTeamMemberListeners;

        if (addUs.length === 0) {
            dispatch(dataLayerActions.noTeamsToLoad());
        }

        addUs.forEach(id => {
            db.ref(`teamMembers/${id}`).on('value', (snapShot) => {
                const _data = snapShot.val();
                dispatch(dataLayerActions.teamMemberFetchSuccessful(_data, id));
            });
        });

        // send off success dispatch
    });
}

function setupTeamListener(dispatch) {
    const teams = firebase.database().ref('teams');
    teams.on('value', (snapshot) => {
        dispatch(dataLayerActions.teamFetchSuccessful(snapshot.val()));
    });
}

function setupTrashDropListener(dispatch) {
    const drops = firebase.database().ref('trashDrops');
    drops.on('value', (snapshot) => {
        dispatch(dataLayerActions.trashDropFetchSuccessful(snapshot.val()));
    });
}

function setupInvitationListener(email, dispatch) {
    const db = firebase.database();
    const membershipId = (email || '').toLowerCase().replace(/\./g, ':');
    const invitations = db.ref(`invitations/${membershipId}`);
    invitations.on('value', (snapshot) => {
        dispatch(dataLayerActions.invitationFetchSuccessful(snapshot.val()));
    });
}

async function initialize(dispatch) {

    /** Setup Listeners **/

    firebase
        .auth()
        .onAuthStateChanged((user) => {
            if (!!user) {
                dispatch(dataLayerActions.userAuthenticated(User.create(user)));
                dispatch({type: types.IS_LOGGING_IN_VIA_SSO, isLoggingInViaSSO: false});
                setupProfileListener(user.uid, dispatch);
                setupMessageListener(user.uid, dispatch);
                setupTeamListener(dispatch);
                setupTrashDropListener(dispatch);
                setupInvitationListener(user.email, dispatch);
                // Get Town Data
                const townData = firebase.database().ref('townData');
                townData.once('value', (snapshot) => {
                    dispatch(dataLayerActions.townDataFetchSuccessful(snapshot.val()));
                });
            } else {
                dispatch(dataLayerActions.userFailedAuthentication());
            }
        });
}

async function facebookAuth(token) {

    // Build Firebase credential with the Facebook access token.
    const credential = firebase
        .auth
        .FacebookAuthProvider
        .credential(token);

    // Sign in with credential from the Facebook user.
    return firebase
        .auth()
        .signInWithCredential(credential)
        .then((user) => {
            const {uid, email, displayName, photoURL} = user;
            firebase.database().ref(`profiles/${uid}`).once('value').then(snapshot => {
                if (!snapshot.val()) {
                    const newProfile = User.create({uid, email, displayName, photoURL});
                    newProfile.created = (new Date()).toString();
                    firebase.database().ref(`profiles/${uid}`).set(newProfile);
                }
            });
        });
}

async function googleAuth(token) {
    // Build Firebase credential with the Google access token.
    const credential = firebase.auth.GoogleAuthProvider.credential(token);
    return firebase.auth().signInWithCredential(credential)
        .then((user) => {
            const {uid, email, displayName, photoURL} = user;
            firebase.database().ref(`profiles/${uid}`).once('value').then(snapshot => {
                if (!snapshot.val()) {
                    const newProfile = User.create({uid, email, displayName, photoURL});
                    newProfile.created = (new Date()).toString();
                    firebase.database().ref(`profiles/${uid}`).set(newProfile);
                }
            });
        });
}

// Messaging
function sendUserMessage(userId, message) {
    const _message = stringifyDates(message);
    return firebase
        .database()
        .ref(`messages/${userId}`)
        .push(_message);
}

function sendGroupMessage(group, message) {
    group.forEach((memberUID) => {
        sendUserMessage(memberUID, message);
    });
}

// Teams
function saveTeam(team) {
    const _id = team.uid || team.id;
    const _team = {...team, uid: null};
    return firebase.database().ref(`teams/${_id}`).set(_team);
}

function createTeam(team: Object = {}) {
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

function deleteTeam(teamId: string) {
    const db = firebase.database();
    return db.ref(`teamMembers/${teamId}`).remove().then(() => {
        db.ref(`teams/${teamId}`).remove();
    });
}

function saveLocations(locations: Object, teamId: string) {
    return firebase.database().ref(`teams/${teamId}/locations`).set(locations);
}

function createUser(email: string, password: string, displayName: string) {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password).then((user) => {
            const uid = user.uid;
            const newProfile = User.create({uid, email, displayName});
            newProfile.created = (new Date()).toString();
            firebase.database().ref(`profiles/${uid}`).set(newProfile);
        })
        .catch((error) => {
            // Handle Errors here.
            throw error; // Rethrow so we can deal with error later too.
        });
}

function loginWithEmailPassword(_email: string, password: string) {
    return firebase
        .auth()
        .signInWithEmailAndPassword(_email, password)
        .then((user) => {
            const {uid, email, displayName, photoURL} = user;
            firebase.database().ref(`profiles/${uid}`).once('value').then(snapshot => {
                if (!snapshot.val()) {
                    const newProfile = User.create({uid, email, displayName, photoURL});
                    newProfile.created = (new Date()).toString();
                    firebase.database().ref(`profiles/${uid}`).set(newProfile);
                }
            });
        })
        .catch(error => {
            throw error; // Rethrow so we can deal with error later too.
        });
}

function resetPassword(emailAddress: string) {
    return firebase.auth().sendPasswordResetEmail(emailAddress);
}

function logout() {
    return firebase.auth().signOut();
}

function inviteTeamMember(invitation: Object) {
    const db = firebase.database();
    const membershipId = invitation.teamMember.email.toLowerCase().replace(/\./g, ':');
    const teamId = invitation.team.id;
    return db
        .ref(`invitations/${membershipId}/${teamId}`)
        .set(invitation)
        .then(db.ref(`teamMembers/${teamId}/${membershipId}`).set(invitation.teamMember));
}

function dropTrash(trashDrop: Object) {
    firebase
        .database()
        .ref('trashDrops/')
        .push(trashDrop);
}

function updateTrashDrop(trashDrop: Object) {
    firebase
        .database()
        .ref(`trashDrops/${trashDrop.uid}`)
        .set(trashDrop);
}

function updateMessage(message: Object, userId: string) {
    const newMessage = Object.assign({}, message, {created: message.created.toString()}); // TODO fix this hack right
    return firebase
        .database()
        .ref(`messages/${userId}/${message.uid}`).set(newMessage);
}

function updateProfile(profile: Object, teamMembers: Object) {
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

function addTeamMember(teamId: string, teamMember: Object) {
    const db = firebase.database();
    const membershipId = teamMember.email.toLowerCase().replace(/\./g, ':');
    return db.ref(`profiles/${teamMember.uid}/teams/${teamId}`).set('ACCEPTED')
        .then(() => db.ref(`invitations/${membershipId}/${teamId}`).remove()
            .then(() => db.ref(`teamMembers/${teamId}/${membershipId}`).set(teamMember))
        );
}

function updateTeamMember(teamId, teamMember) {
    const db = firebase.database();
    const membershipId = teamMember.email.toLowerCase().replace(/\./g, ':');
    return db.ref(`teamMembers/${teamId}/${membershipId}`).set(teamMember);
}

function removeTeamMember(teamId: string, teamMember: Object) {
    const db = firebase.database();
    const membershipId = teamMember.email.toLowerCase().replace(/\./g, ':');
    return db.ref(`teamMembers/${teamId}/${membershipId}`).remove();
}

function leaveTeam(teamId: string, teamMember: Object) {
    const db = firebase.database();
    const membershipId = teamMember.email.toLowerCase().replace(/\./g, ':');
    return db.ref(`teamMembers/${teamId}/${membershipId}`).remove()
        .then(() => db.ref(`profiles/${teamMember.uid}/teams/${teamId}`).remove());
}

function revokeInvitation(teamId: string, membershipId: string) {
    const db = firebase.database();
    const _membershipId = membershipId.toLowerCase().replace(/\./g, ':');
    return db.ref(`teamMembers/${teamId}/${_membershipId}`).remove()
        .then(() => db.ref(`invitations/${_membershipId}/${teamId}`).remove());
}

function deleteMessage(userId: string, messageId: string) {
    return firebase
        .database()
        .ref(`messages/${userId}/${messageId}`).remove();
}

function updateEmail(email: string) {
    return firebase.auth().currentUser.updateEmail(email);
}

export const firebaseDataLayer = {
    addTeamMember,
    createTeam,
    createUser,
    deleteMessage,
    deleteTeam,
    dropTrash,
    facebookAuth,
    googleAuth,
    initialize,
    inviteTeamMember,
    loginWithEmailPassword,
    logout,
    leaveTeam,
    removeTeamMember,
    resetPassword,
    revokeInvitation,
    saveLocations,
    saveTeam,
    sendUserMessage,
    sendGroupMessage,
    updateEmail,
    updateMessage,
    updateProfile,
    updateTeamMember,
    updateTrashDrop
};
