// @flow

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {DrawerNavigator} from 'react-navigation';
import Welcome from './src/screens/welcome/Welcome';
import Messages from './src/screens/messages/Messages';
import Donate from './src/screens/donate/Donate';
import MyTeams from './src/screens/my-teams/MyTeams';
import TrashTracker from './src/screens/trash-tracker/TrashTracker';
import AllAboutGreenUpDay from './src/screens/about-green-up-day/AllAboutGreenUpDay';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/reducers/';
import thunk from 'redux-thunk'

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAjwSCpOvLPgYcFr26V3gmfwJlGb-VtWAs",
    authDomain: "greenupvermont-de02b.firebaseapp.com",
    databaseURL: "https://greenupvermont-de02b.firebaseio.com",
    storageBucket:  "greenupvermont-de02b.appspot.com"
};

firebase.initializeApp(firebaseConfig);


const store = createStore(reducer, applyMiddleware(thunk));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

const Nav = DrawerNavigator({
    Messages: {screen: Messages},
    Donate: {screen: Donate},
    MyTeams: {screen: MyTeams},
    TrashTracker: {screen: TrashTracker},
    AllAboutGreenUpDay: {screen: AllAboutGreenUpDay}
});




class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Nav />
            </Provider>
        );
    }
}


export default App;