/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import logo from '../../../assets/GreenupVermontlogo.png';
import facebookLogo from '../../../assets/facebook-logo.png';
import googleLogo from '../../../assets/google-logo.png';

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
    linkText: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    link: {},
    socialLoginButton: {
        borderColor: '#999999',
        borderStyle: 'solid',
        borderWidth: 1,
        width: '100%',
        height: 60,
        backgroundColor: 'mintcream',
        padding: 10,
        marginTop: 5
    },
    socialLogin: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    socialLoginText: {
        fontSize: 24,
        marginTop: 8
    },
    logos: {
        width: 40,
        height: 40
    }
});
export default class Welcome extends Component {

    static propTypes = {
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Login'
    };
    constructor(props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.onForgotPassword = this.onForgotPassword.bind(this);
        this.onCreateNewAccount = this.onCreateNewAccount.bind(this);
    }
    onForgotPassword() {
        this.props.navigation.navigate('ForgotPassword');
    }
    onCreateNewAccount() {
        this.props.navigation.navigate('CreateNewAccount');
    }
    onButtonPress() {}

    render() {
        return (
            <View style={styles.container}>
                <Image source={logo} style={{
                    height: 120,
                    width: 120
                }}/>
                <LoginForm/>
                <TouchableHighlight style={styles.link} onPress={this.onForgotPassword}>
                    <Text style={styles.linkText}>I forgot my password</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.link} onPress={this.onCreateNewAccount}>
                    <Text style={styles.linkText}>Create a new account</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.socialLoginButton} onPress={this.onButtonPress}>
                    <View style={styles.socialLogin}>
                        <Image source={googleLogo} style={styles.logos}/>
                        <Text style={styles.socialLoginText}>Login with Google</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.socialLoginButton} onPress={this.onButtonPress}>
                    <View style={styles.socialLogin}>
                        <Image source={facebookLogo} style={styles.logos}/>
                        <Text style={styles.socialLoginText}>Login with Facebook</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}
