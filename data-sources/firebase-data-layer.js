import firebase from 'firebase';
import * as dataLayerActions from './data-layer-actions';
import {User} from '../models/user';

function setupMessageListener(userId, dispatch) {
    const messages = firebase.database().ref(`messages/${userId}`);
    messages.on('value', (snapshot) => {
        dispatch(dataLayerActions.messageFetchSuccessful(snapshot.val()));
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

            } else {
                console.log('We failed auth'); // eslint-disable-line
                dispatch(dataLayerActions.userFailedAuthentication());
            }
        });
    const teams = firebase.database().ref('teams/');
    //
    teams.on('value', (snapshot) => {
        dispatch(dataLayerActions.teamFetchSuccessful(snapshot.val()));
    });

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

async function facebookAuth(token) {

    // Build Firebase credential with the Facebook access token.
    const credential = firebase
        .auth
        .FacebookAuthProvider
        .credential(token);

    // Sign in with credential from the Facebook user.
    return firebase
        .auth()
        .signInWithCredential(credential);

}

async function googleAuth(token) {
    // Build Firebase credential with the Google access token.
    const credential = firebase.auth.GoogleAuthProvider.credential(token);
    return firebase.auth().signInWithCredential(credential);
}

// Messaging
function sendUserMessage(userId, message) {
    firebase
        .database()
        .ref(`messages/${userId}`)
        .push(message);
}


function sendGroupMessage(group, message) {
    group.forEach((memberUID) => {
        sendUserMessage(memberUID, message);
    });
}

// Teams
function saveTeam(team, id) {
    const _id = id || team.uid;
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

function createUser(email, password) {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
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


export const firebaseDataLayer = {
    createUser,
    facebookAuth,
    dropTrash,
    googleAuth,
    initialize,
    loginWithEmailPassword,
    logout,
    resetPassword,
    saveTeam,
    sendUserMessage,
    sendInviteEmail,
    sendGroupMessage
};
