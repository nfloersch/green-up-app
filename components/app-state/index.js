// @flow

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import Splash from "../../components/splash";
import configureStore from "../../store/configure-store";

const { persistor, store } = configureStore(); // Using a persisted store

type PropsType = { children?: React$Element<any> };

const AppState = ({ children }: PropsType): React$Element<any> => (
    <Provider store={ store }>
        <PersistGate loading={ <Splash message={ "Thinking green thoughts ..." }/> } persistor={ persistor }>
            { children }
        </PersistGate>
    </Provider>
);

export default AppState;

