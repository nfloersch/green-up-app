import { initializeApp, getApps, getApp } from "@firebase/app"
import { initializeAuth, getReactNativePersistence, getAuth } from '@firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from "../firebase-config";
import { initializeFirestore, getFirestore } from "@firebase/firestore";

const createFirebaseApp = (config = {}) => {
    if (getApps().length === 0) {
        console.log('initializing firebase app with config:', config)
        const app = initializeApp(config)
        initializeAuth(app, {
            persistence: getReactNativePersistence(ReactNativeAsyncStorage)
        })
        initializeFirestore(app, {}, config.databaseID)
        return app
    }

    return getApp()
}

export const firebaseApp = createFirebaseApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
export const firestore = getFirestore(firebaseApp)