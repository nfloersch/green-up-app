function createTeam(team) {
    firebase.database().ref('users/' + userId).set({
        highscore: score
    });
}