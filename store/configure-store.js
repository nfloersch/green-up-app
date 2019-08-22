import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

// Using the default initial state reconciler, autoMergeLevel1
const persistConfig = {
    key: "root",
    storage: storage,
    stateReconciler:autoMergeLevel2,
    blacklist: ["modals"]
};

const middlewares = [thunk];

// eslint-disable-next-line no-undef
if(__DEV__) {
    middlewares.push(createLogger());
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    // eslint-disable-next-line no-undefined
    const store = createStore(persistedReducer, undefined, composeWithDevTools(applyMiddleware(...middlewares)));
    const persistor = persistStore(store);
    return { store, persistor };
};

