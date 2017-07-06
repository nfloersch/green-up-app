function sendUserMessage(userId, message) {
    firebase.database().ref('users/' + userId).set({
        highscore: score
    });
}