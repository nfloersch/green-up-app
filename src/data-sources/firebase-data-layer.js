import firebase from 'firebase';
import * as dataLayerActions from './data-layer-actions';
import { User } from '../models/user';
import { firebaseConfig } from "./firebase-config.js";
//
//   Initialize Firebase

firebase.initializeApp(firebaseConfig);

function initialize(dispatch) {
    /** Setup Listeners **/
    firebase
        .auth()
        .onAuthStateChanged((user) => {
            if (!!user) {
                console.log('We are authenticated now!');
                console.log(user);
                dispatch(dataLayerActions.userAuthenticated(User.create(user)));
            } else {
                console.log('We failed auth');
                dispatch(dataLayerActions.userFailedAuthentication());
            }
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
        .ref('users/' + userId)
        .set({ messages: message });
}

function setupUserListener(userId) {
    firebase
        .database()
        .ref('users/' + userId)
        .on('value', (snapshot) => {
            const user = snapshot.val();
            console.log('User Changed ' + JSON.stringify(user));
        });
}

function sendGroupMessage(group, message) {
    group
        .members
        .forEach((member) => {
            sendUserMessage(member.uid, message);
        });
}

// Teams
function saveTeam(team) {
    firebase
        .database()
        .ref('teams')
        .push(team);
}

function createUser(email, password) {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
}


function loginWithEmailPassword(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

function logout() {
    return firebase.auth().signOut();
}

export const firebaseDataLayer = {
    createUser,
    facebookAuth,
    googleAuth,
    initialize,
    loginWithEmailPassword,
    logout,
    saveTeam,
    setupUserListener,
    sendUserMessage,
    sendGroupMessage
};