// @flow

import React, {Component} from 'react';

import Nav from './src/';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './src/reducers/';
import thunk from 'redux-thunk'

// import * as firebase from 'firebase';
//
// // Initialize Firebase
// const firebaseConfig = {
//     apiKey: "AIzaSyAjwSCpOvLPgYcFr26V3gmfwJlGb-VtWAs",
//     authDomain: "greenupvermont-de02b.firebaseapp.com",
//     databaseURL: "https://greenupvermont-de02b.firebaseio.com",
//     storageBucket:  "greenupvermont-de02b.appspot.com"
// };
//
// firebase.initializeApp(firebaseConfig);


const store = createStore(reducer, applyMiddleware(thunk));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Nav/>
            </Provider>
        );
    }
}

export default App;
