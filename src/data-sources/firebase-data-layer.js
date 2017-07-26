function sendUserMessage(userId, message) {
    firebase.database().ref('users/' + userId).set({
        messages: message
    });
}

function setupUserListener(userId) {
    firebase.database().ref('users/' + userId).on('value', (snapshot) => {
        const user = snapshot.val();
        console.log("User Changed " + JSON.stringify(user));
    });
}


function sendGroupMessage(group, message) {
    group.members.forEach((member) => {sendUserMessage(member._id, message)});
}
