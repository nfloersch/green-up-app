// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import logo from '../../assets/images/green-up-logo.png';
import facebookLogo from '../../assets/images/facebook-logo.png';
import googleLogo from '../../assets/images/google-logo.png';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LoginForm from '../../components/login-form';
import * as actions from './actions';

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

class Login extends Component {

    static propTypes = {
        actions: PropTypes.object,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Log In'
    };

    constructor(props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
    }

    onButtonPress() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={logo} style={{height: 120, width: 120}}/>

                <View style={{width: '100%'}}>
                    <LoginForm onButtonPress={this.props.actions.loginWithEmailPassword}/>

                    <TouchableHighlight
                        style={styles.link}
                        onPress={() => this.props.navigation.navigate('ForgotPassword')}
                    >
                        <Text style={styles.linkText}>I forgot my password</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.link}
                        onPress={() => this.props.navigation.navigate('CreateNewAccount')}
                    >
                        <Text style={styles.linkText}>Create a new account</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.socialLoginButton}
                        onPress={() => this.props.actions.googleLogin()}>

                        <View style={styles.socialLogin}>
                            <Image source={googleLogo} style={styles.logos}/>
                            <Text style={styles.socialLoginText}>Login with Google</Text>
                        </View>

                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.socialLoginButton}
                        onPress={() => this.props.actions.facebookLogin()}
                    >

                        <View style={styles.socialLogin}>
                            <Image source={facebookLogo} style={styles.logos}/>
                            <Text style={styles.socialLoginText}>Login with Facebook</Text>
                        </View>

                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {user: state.login.user, initialAuthChecked: state.login.initialAuthChecked};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
