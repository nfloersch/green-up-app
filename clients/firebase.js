import { initializeApp, getApps, getApp } from "@firebase/app"
import { initializeAuth, getReactNativePersistence, getAuth } from '@firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeFirestore, getFirestore } from "@firebase/firestore";
import Constants from "expo-constants";

const createFirebaseApp = (config = {}) => {
    if (getApps().length === 0) {
        const app = initializeApp(config)
        initializeAuth(app, {
            persistence: getReactNativePersistence(ReactNativeAsyncStorage)
        })
        initializeFirestore(app, {}, config.databaseID)
        return app
    }

    return getApp()
}

export const firebaseApp = createFirebaseApp(Constants.expoConfig.extra.firebase)
export const firebaseAuth = getAuth(firebaseApp)
export const firestore = getFirestore(firebaseApp)