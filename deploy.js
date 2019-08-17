const fs = require("fs");
const apiKey = proccess.env.FIREBASE_API_KEY;

const authDomain = proccess.env.FIREBASE_API_KEY;
const databaseURL = proccess.env.FIREBASE_API_KEY;
const projectId = proccess.env.FIREBASE_API_KEY;
const storageBucket = proccess.env.FIREBASE_API_KEY;
const messagingSenderId = proccess.env.FIREBASE_API_KEY;

const firebaseConfig = {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId
};

const fileContents = `export const firebaseConfig = ${JSON.stringify(firebaseConfig)};`;

fs.writeFile("./data-sources/firebase-config.js", fileContents, (err) => {
    if (err) {
        throw err;
    }
    console.log("Successfully written to firebase-config.js.");
});