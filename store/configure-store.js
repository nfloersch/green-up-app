// @flow
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import { AsyncStorage } from "react-native";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { createNetworkMiddleware } from "react-native-offline";


const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
    blacklist: ["modals", "networkStatus"], // Add top-level store keys here to avoid persistence,
    timeout: 30000
};

const networkMiddleware = createNetworkMiddleware({
    queueReleaseThrottle: 200
});

const middlewares = [networkMiddleware, thunk];

if (__DEV__) {
    middlewares.push(createLogger());
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default (): Object => {
    // eslint-disable-next-line no-undefined
    const store = createStore(
        persistedReducer, 
        undefined, 
        composeWithDevTools(applyMiddleware(...middlewares))
    );
    // $FlowFixMe
    const persistor = persistStore(store);
    return { store, persistor };
};

