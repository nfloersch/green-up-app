import firebase from 'firebase';
//
// // Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAjwSCpOvLPgYcFr26V3gmfwJlGb-VtWAs",
    authDomain: "greenupvermont-de02b.firebaseapp.com",
    databaseURL: "https://greenupvermont-de02b.firebaseio.com",
    storageBucket:  "greenupvermont-de02b.appspot.com"
};

firebase.initializeApp(firebaseConfig);

function sendUserMessage(userId, message) {
    firebase.database().ref('users/' + userId).set({messages: message});
}

function setupUserListener(userId) {
    firebase.database().ref('users/' + userId).on('value', (snapshot) => {
        const user = snapshot.val();
        console.log('User Changed ' + JSON.stringify(user));
    });
}

function sendGroupMessage(group, message) {
    group.members.forEach((member) => {
        sendUserMessage(member._id, message);
    });
}

function saveTeam(team) {
    firebase.database().ref('teams').push(team);
}

export const firebaseDataLayer = {saveTeam, setupUserListener, sendUserMessage, sendGroupMessage};