
import getEnvVars from "../environment";

const { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId } = getEnvVars();

export const firebaseConfig = { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId };