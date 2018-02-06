// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import * as actions from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

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
    inputStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 2,
        color: '#262626',
        fontSize: 18,
        fontWeight: '200',
        height: 40,
        width: '100%',
        textAlign: 'left',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        borderStyle: 'solid'
    }
});

class ForgotPassword extends Component {

    static propTypes = {
        actions: PropTypes.object,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Forgot Password'
    };

    constructor(props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.state = {email: '', passwordResetSent: false};
    }

    onChangeState(stateKey) {
        return (value) => {
            this.setState({[stateKey]: value});
        };
    }

    onButtonPress() {
        this.props.actions.resetPassword(this.state.email);
        this.setState({passwordResetSent: true});
    }

    render() {
        return this.state.passwordResetSent
            ? (
                <View style={styles.container}>
                    <Text style={styles.label}>Check your email</Text>
                </View>
            )
            : (
                <View style={styles.container}>
                    <Text style={styles.label}>Email Address :</Text>
                    <TextInput
                        autoCorrect={false}
                        value={this.state.email}
                        onChangeText={this.onChangeState('email')}
                        style={styles.inputStyle}
                    />
                    <Button onPress={this.onButtonPress} title={'Reset Password'}/>
                </View>
            );
    }
}


function mapStateToProps(state) {
    return {session: state.login.session};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);