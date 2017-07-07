function sendUserMessage(userId, message) {
    firebase.database().ref('users/' + userId).set({
        messages: message
    });
}