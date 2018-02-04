/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});

export default class LoginScreen extends Component {

    static propTypes = {
        actions: PropTypes.object,
        initialAuthChecked: PropTypes.bool,
        navigation: PropTypes.object,
        user: PropTypes.object
    };

    static navigationOptions = {
        title: 'Login'
    };

    constructor(props) {
        super(props);
        this.state = {currentScreen: 'login'};
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>LOGIN</Text>
            </View>
        );
    }
}

