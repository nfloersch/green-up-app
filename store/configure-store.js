// @flow
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    const logState = false
    const actionPayload = false
    const actionPayloadPretty = false
    const ignorePersist = (getState, action) => {
        return !['persist/PERSIST', 'persist/REHYDRATE'].includes(action.type)
    };

    middlewares.push(createLogger({
        predicate: ignorePersist,
        stateTransformer: (state) => {
            if (!logState) {
                return '<state ignored in logs>'
            }

            return JSON.stringify(state, null, 2)
        },
        actionTransformer: (action) => {
            const { type, data } = action

            if (!actionPayload) {
                return `${type} payload=<payload ignored in logs>`
            }

            return `${type} payload=${JSON.stringify(data, null, actionPayloadPretty ? 2 : 0)}`;
        }
    }));
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default (): Object => {
    // eslint-disable-next-line no-undefined
    const store = createStore(
        persistedReducer,
        // eslint-disable-next-line no-undefined
        undefined,
        composeWithDevTools(applyMiddleware(...middlewares))
    );
    // $FlowFixMe
    const persistor = persistStore(store);
    return { store, persistor };
};