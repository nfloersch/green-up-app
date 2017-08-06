import firebase from 'firebase';
import * as dataLayerActions from './data-layer-actions';
import {User} from '../models/user';
//
// // Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyAjwSCpOvLPgYcFr26V3gmfwJlGb-VtWAs',
    authDomain: 'greenupvermont-de02b.firebaseapp.com',
    databaseURL: 'https://greenupvermont-de02b.firebaseio.com',
    storageBucket: 'greenupvermont-de02b.appspot.com'
};

firebase.initializeApp(firebaseConfig);

// Authentication Listen for authentication state to change.
firebase
    .auth()
    .onAuthStateChanged((user) => {
        if (!!user) {
            console.log('We are authenticated now!');
            console.log(user);
            dataLayerActions.userAuthenticated(User.create(user));
        } else {
            console.log('We failed auth');
            dataLayerActions.userFailedAuthentication();
        }
    });

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

// Messaging
function sendUserMessage(userId, message) {
    firebase
        .database()
        .ref('users/' + userId)
        .set({messages: message});
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
            sendUserMessage(member._id, message);
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
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });
}

export const firebaseDataLayer = {
    createUser,
    saveTeam,
    setupUserListener,
    sendUserMessage,
    sendGroupMessage,
    facebookAuth
};