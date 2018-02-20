import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/';
import thunk from 'redux-thunk';
import LoadingScreen from './screens/loading-screen';
import {firebaseConfig} from './data-sources/firebase-config.js';
import firebase from 'firebase';


const store = createStore(reducer, applyMiddleware(thunk));

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <LoadingScreen/>
            </Provider>
        );
    }
}


