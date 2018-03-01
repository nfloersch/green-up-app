import firebase from 'firebase';
import * as dataLayerActions from './data-layer-actions';
import {User} from '../models/user';

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

function setupSupplyLocationsListener(dispatch) {
    const supplyLocations = firebase.database().ref('supplyLocations');
    supplyLocations.on('value', (snapshot) => {
        dispatch(dataLayerActions.supplyLocationsFetchSuccessful(snapshot.val()));
    });
}

async function initialize(dispatch) {
    console.log('Initializing Firebase');

    /** Setup Listeners **/

    firebase
        .auth()
        .onAuthStateChanged((user) => {
            if (!!user) {
                console.log('We are authenticated now!'); // eslint-disable-line
                dispatch(dataLayerActions.userAuthenticated(User.create(user)));
                setupMessageListener(user.uid, dispatch);
                setupProfileListener(user.uid, dispatch);
                setupTeamListener(dispatch);
                setupTrashDropListener(dispatch);
                setupSupplyLocationsListener(dispatch);
            } else {
                console.log('We failed auth'); // eslint-disable-line
                dispatch(dataLayerActions.userFailedAuthentication());
            }
        });
    // const teams = firebase.database().ref('teams/');
    //
    // teams.on('value', (snapshot) => {
    //    dispatch(dataLayerActions.teamFetchSuccessful(snapshot.val()));
    // });

    // const trashDrops = firebase.database().ref('trashDrops/');
    //
    // await trashDrops.on('value', (snapshot) => {
    //     dispatch(dataLayerActions.trashDropFetchSuccessful(snapshot.val()));
    // });


    /** end Listeners **/


// await firebase.getCurrentUser(
//     (user) => {
//         if (!!user) {
//             console.log('We are authenticated now!'); // eslint-disable-line
//             dispatch(dataLayerActions.userAuthenticated(User.create(user)));
//             setupMessageListener(user.uid, dispatch);
//
//         } else {
//             console.log('We are not logged in'); // eslint-disable-line
//             dispatch(dataLayerActions.userFailedAuthentication());
//         }
//     }
// );

}

// TODO fix the id vs uid dilemma
// async function updateTeamMember(team, member) {
//     const id = team.uid || team.id;
//     const members = team.members.filter(_member => (_member.uid !== member.uid)).concat(member);
//     const _team = Object.assign({}, team, {uid: null, id: null}, {members});
//     // delete _team.uid;
//     if (!id) {
//         firebase
//             .database()
//             .ref('teams')
//             .push(team);
//     } else {
//         firebase.database().ref(`teams/${id}`).set(_team);
//     }
// }

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
    firebase
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
function saveTeam(team, id) {
    const _id = id || team.uid || team.id;
    const _team = Object.assign({}, team);
    delete _team.uid;
    if (!_id) {
        firebase
            .database()
            .ref('teams')
            .push(team);
    } else {
        firebase.database().ref(`teams/${_id}`).set(_team);
    }
}

function saveLocations(locations, teamId) {
    return firebase.database().ref(`teams/${teamId}/locations`).set(locations);
}

function createUser(email, password, displayName) {
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
            console.log(error.message); // eslint-disable-line
            throw error; // Rethrow so we can deal with error later too.
        });
}

function loginWithEmailPassword(email, password) {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => {
            console.log(error.message); // eslint-disable-line
            throw error; // Rethrow so we can deal with error later too.
        });
}

function resetPassword(emailAddress) {
    return firebase.auth().sendPasswordResetEmail(emailAddress);
}

function logout() {
    return firebase.auth().signOut();
}

function sendInviteEmail(invitation) {
    firebase
        .database()
        .ref('invitations')
        .push(invitation);
}

function dropTrash(trashDrop) {
    firebase
        .database()
        .ref('trashDrops/')
        .push(trashDrop);
}

function updateTrashDrop(trashDrop) {
    firebase
        .database()
        .ref(`trashDrops/${trashDrop.uid}`)
        .set(trashDrop);
}

function updateMessage(message, userId) {
    const newMessage = Object.assign({}, message, {created: message.created.toString()}); // TODO fix this hack right
    return firebase
        .database()
        .ref(`messages/${userId}/${message.uid}`).set(newMessage);
}

function updateProfile(profile) {
    const newProfile = Object.assign({}, profile, {updated: (new Date()).toString()}); // TODO fix this hack right
    return firebase
        .database()
        .ref(`profiles/${profile.uid}`).set(newProfile);
}

function addTeamMember(teamId, teamMember) {
    firebase
        .database()
        .ref(`teamMembers/${teamId}`)
        .push(teamMember);
}

function updateTeamMember(teamId, memberId, teamMember) {
    firebase
        .database()
        .ref(`teamMembers/${teamId}/${memberId}`)
        .set(teamMember);
}

function removeTeamMember(teamId: string, membershipId: string) {
    firebase.database().rev(`teamMembers/${teamId}/${membershipId}`).remove();
}

export const firebaseDataLayer = {
    addTeamMember,
    createUser,
    facebookAuth,
    dropTrash,
    googleAuth,
    initialize,
    loginWithEmailPassword,
    logout,
    removeTeamMember,
    resetPassword,
    saveTeam,
    saveLocations,
    sendUserMessage,
    sendInviteEmail,
    sendGroupMessage,
    updateMessage,
    updateProfile,
    updateTeamMember,
    updateTrashDrop
};
