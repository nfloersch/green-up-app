import firebase from 'firebase';

export function sendUserMessage(userId, message) {
    firebase.database().ref('users/' + userId).set({
        messages: message
    });
}

export function setupUserListener(userId) {
    firebase.database().ref('users/' + userId).on('value', (snapshot) => {
        const user = snapshot.val();
        console.log('User Changed ' + JSON.stringify(user));
    });
}


export function sendGroupMessage(group, message) {
    group.members.forEach((member) => {sendUserMessage(member._id, message)});
}


export function createTeam(group){
var teamsRef = firebase.database().ref("teams");
    var newTeamRef = teamsRef.push();
    newTeamRef.set(group);
}