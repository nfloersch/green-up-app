// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableHighlight, View, Alert,
    Platform
} from 'react-native';

import * as actions from './actions';
import logo from '../../assets/images/green-up-logo.png';
import facebookLogo from '../../assets/images/facebook-logo.png';
import googleLogo from '../../assets/images/google-logo.png';
import LoginForm from '../../components/login-form';
import {defaultStyles} from '../../styles/default-styles';


const myStyles = {
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'darkseagreen',
        marginBottom: 10
    },
    linkText: {
        textAlign: 'center',
        color: '#333',
        marginBottom: 5
    },
    socialLoginButton: {
        width: '100%',
        height: 40,
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        borderRadius: 2,
        elevation: 1
    },
    socialLogin: {
        flexWrap: 'wrap'
    },
    socialLoginText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#888',
        marginLeft: 20
    },
    logos: {
        width: 20,
        height: 20,
        alignSelf: 'flex-start',
        flexDirection: 'row'
    }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class Login extends Component {

    static propTypes = {
        actions: PropTypes.object,
        loginError: PropTypes.any,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Log In'
    };

    constructor(props) {
        super(props);
    }


    componentWillReceiveProps(nextProps) {
        if (!!nextProps.loginError) {
            Alert.alert(
                '',
                (nextProps.loginError.message || 'Login Failed'),
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')}
                ],
                {cancelable: false}
            );

        }
    }


    googleLogin = () => {
        this.props.actions.isLoggingInViaSSO(true);
        return this.props.actions.googleLogin();
    };


    facebookLogin = () => {
        this.props.actions.isLoggingInViaSSO(true);
        return this.props.actions.facebookLogin();
    };

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.frame}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
            >
                <ScrollView style={styles.container}>
                    <View style={styles.logo}>
                        <Image source={logo} style={{height: 120, width: 120}}/>
                    </View>
                    <View style={{width: '100%'}}>
                        <LoginForm onButtonPress={this.props.actions.loginWithEmailPassword}/>
                        <TouchableHighlight
                            onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                            <Text style={styles.linkText}>I forgot my password</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => this.props.navigation.navigate('CreateNewAccount')}>
                            <Text style={styles.linkText}>Create a new account</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.socialLoginButton}
                            onPress={this.googleLogin}>
                            <View style={styles.socialLogin}>
                                <Image source={googleLogo} style={styles.logos}/>
                                <Text style={styles.socialLoginText}>Log in with Google</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.socialLoginButton}
                            onPress={this.facebookLogin}>
                            <View style={styles.socialLogin}>
                                <Image source={facebookLogo} style={styles.logos}/>
                                <Text style={styles.socialLoginText}>Log in with Facebook</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    {
                        Platform.OS === 'ios'
                            ? (<View style={defaultStyles.padForIOSKeyboardBig}/>)
                            : null
                    }

                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.login.user,
    initialAuthChecked: state.login.initialAuthChecked,
    loginError: state.login.loginError
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
