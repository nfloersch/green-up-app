const fs = require("fs");

// eslint-disable-next-line no-process-env
const apiKey = process.env.FIREBASE_API_KEY;
// eslint-disable-next-line no-process-env
const authDomain = process.env.FIREBASE_AUTH_DOMAIN;
// eslint-disable-next-line no-process-env
const databaseURL = process.env.FIREBASE_DATABASE_URL;
// eslint-disable-next-line no-process-env
const projectId = process.env.FIREBASE_PROJECT_ID;
// eslint-disable-next-line no-process-env
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
// eslint-disable-next-line no-process-env
const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID;
// eslint-disable-next-line no-process-env
const appId = process.env.FIREBASE_APP_ID;

const firebaseConfig = {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
};

const fileContents = `export const firebaseConfig = ${JSON.stringify(firebaseConfig)};`;

fs.writeFile("./data-sources/firebase-config.js", fileContents, (err) => {
    if (err) {
        throw err;
    }
    // eslint-disable-next-line no-console
    console.log("Successfully written to firebase-config.js.");
});