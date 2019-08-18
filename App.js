import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/';
import thunk from 'redux-thunk';
import Session from './components/session';
import Splash from './components/splash';
import AppInit from './components/app-init';
import {StyleSheet, View} from 'react-native';

import AppNavigator from './navigation/app-navigator';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    statusBarUnderlay: {
        height: 24,
        backgroundColor: 'rgba(0,0,0,0.2)'
    }
});

const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <AppInit>
                    <View style={styles.container}>
                        <Session splash={(<Splash message={'Thinking Green Thoughts...'}/>)}>
                            <View style={[styles.container, {padding: 0, margin: 0}]}>
                                <AppNavigator/>
                            </View>
                        </Session>
                    </View>
                </AppInit>
            </Provider>
        );
    }
}