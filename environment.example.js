/** ***************************
 * environment.js
 * path: '/environment.js' (root of your project)
 ******************************/

/**
 * This is is just a template. You will need to copy the settings from your firebase app.
 * Go here for help setting up a Firebase app: https://firebase.google.com/
 */

import Constants from "expo-constants";

const ENV = {
    dev: {
        apiKey: "Your Firebase API Key",
        authDomain: "your-firebase-auth-domain.firebaseapp.com",
        databaseURL: "https://your-firebase-data-url.firebaseio.com",
        projectId: "your-firebase-project-dev",
        storageBucket: "your-firebase-storage-bucket.appspot.com",
        messagingSenderId: "your-firebase-messaging-sender-id",
        appId: "your-firebase-app-id"
    },
    staging: {"settings for your firebase staging app"},
    prod: {"settings for your firebase production app"}
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    // What is __DEV__ ?
    // This variable is set to true when react-native is running in Dev mode.
    // __DEV__ is true when run locally, but false when published.
    // eslint-disable-next-line no-undef
    if (__DEV__) {
        return ENV.dev;
    } else if (env === "staging") {
        return ENV.staging;
    } else if (env === "prod") {
        return ENV.prod;
    }
    return ENV.dev;
};

export default getEnvVars;