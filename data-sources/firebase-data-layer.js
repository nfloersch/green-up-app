import firebase from 'firebase';
import * as dataLayerActions from './data-layer-actions';
import {User} from '../models/user';
import {firebaseConfig} from './firebase-config.js';

//   Initialize Firebase

firebase.initializeApp(firebaseConfig);


function setupMessageListener(userId, dispatch) {
    let messages = firebase.database().ref(`messages/${userId}`);
    messages.on('value', (snapshot) => {
        dispatch(dataLayerActions.messageFetchSuccessful(snapshot.val()));
    });
}

async function initialize(dispatch) {

    /** Setup Listeners **/
    firebase
        .auth()
        .onAuthStateChanged((user) => {
            if (!!user) {
                console.log('We are authenticated now!');
                dispatch(dataLayerActions.userAuthenticated(User.create(user)));
                setupMessageListener(user.uid, dispatch);

            } else {
                console.log('We failed auth');
                dispatch(dataLayerActions.userFailedAuthentication());
            }
        });


    const teams = firebase.database().ref('teams/');

    teams.on('value', (snapshot) => {
        dispatch(dataLayerActions.teamFetchSuccessful(snapshot.val()));
    });

    const trashDrops = firebase.database().ref('trashDrops/');

    trashDrops.on('value', (snapshot) => {
        dispatch(dataLayerActions.trashDropFetchSuccessful(snapshot.val()));
    });

    /** end Listeners **/

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

// function setupUserListener(userId) {
//     firebase
//         .database()
//         .ref('users/' + userId)
//         .on('value', (snapshot) => {
//             const user = snapshot.val();
//             console.log('User Changed ' + JSON.stringify(user));
//             dataLayerActions.userFetchSuccessfule(user);
//         });
// }

function sendGroupMessage(group, message) {
    group.forEach((memberUID) => {
        sendUserMessage(memberUID, message);
    });
}

// Teams
function saveTeam(team, id) {
    const _id = id || team.uid;
    let _team = Object.assign({}, team);
    Reflect.deleteProperty(_team, 'uid');
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
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage); //eslint-disable-line
        });
}

function loginWithEmailPassword(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
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
    saveTeam,
    sendUserMessage,
    sendInviteEmail,
    sendGroupMessage
};
