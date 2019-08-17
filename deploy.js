const fs = require("fs");

// eslint-disable-next-line no-process-env
const apiKey = process.env.FIREBASE_API_KEY;
// eslint-disable-next-line no-process-env
const authDomain = process.env.FIREBASE_API_KEY;
// eslint-disable-next-line no-process-env
const databaseURL = process.env.FIREBASE_API_KEY;
// eslint-disable-next-line no-process-env
const projectId = process.env.FIREBASE_API_KEY;
// eslint-disable-next-line no-process-env
const storageBucket = process.env.FIREBASE_API_KEY;
// eslint-disable-next-line no-process-env
const messagingSenderId = process.env.FIREBASE_API_KEY;

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