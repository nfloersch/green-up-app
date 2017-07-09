/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import logo from '../../../assets/GreenupVermontlogo.png';
import LoginForm from '../../components/login-form';
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
export default class Welcome extends Component {

    static propTypes = {};

    constructor(props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
    }
    onButtonPress() {}
    render() {
        return (
            <View style={styles.container}>
                <Image source={logo}/>
                <Text style={styles.welcome}>
                    Welcome to the Green Up Vermont App!
                </Text>
                <LoginForm/>
                <TouchableHighlight onPress={this.onButtonPress}>
                    <View>
                        <MaterialCommunityIcons name='google' size={24} color='blue'/>
                        <Text>Login with Google</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.onButtonPress}>
                    <View>
                        <MaterialCommunityIcons name='facebook' size={24} color='blue'/>
                        <Text>Login with Facebook</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}
