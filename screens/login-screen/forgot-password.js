// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {email} from '../../libs/validators';

import * as actions from './actions';
import {defaultStyles} from '../../styles/default-styles';

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);
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
        if(email(this.state.email)) {
            this.props.actions.resetPassword(this.state.email);
            this.setState({passwordResetSent: true});
        } else {
            Alert.alert('Please enter a valid email address');
        }
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
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        autoCorrect={false}
                        value={this.state.email}
                        keyBoardType='email-address'
                        placeholder='you@domain.com'
                        onChangeText={this.onChangeState('email')}
                        style={styles.textInput}
                        underlineColorAndroid={'transparent'}
                    />
                    <Button onPress={this.onButtonPress} title={'Reset Password'}/>
                </View>
            );
    }
}

const mapStateToProps = (state) => ({session: state.login.session});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
