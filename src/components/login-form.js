// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
const styles = StyleSheet.create({
    inputStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 2,
        color: '#262626',
        fontSize: 18,
        fontWeight: '200',
        flex: 1,
        height: 40
    },
    labelStyle: {
        fontSize: 12,
        color: '#7F7D7D',
        fontWeight: '200',
        flex: 1
    },
    containerStyle: {
        height: 45,
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        borderColor: '#D4D4D4',
        borderBottomWidth: 1
    }
});
export default class LoginForm extends Component {

    static propTypes = {};

    constructor(props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.state = {
            email: '',
            password: ''
        };
    }

    onChangeState(stateKey) {
        return (event) => {
            let newState = {};
            newState[stateKey] = event.target.value;
            this.setState(newState);
        };
    }

    onButtonPress() {}
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Email</Text>
                <TextInput autoCorrect={false} placeholder='you@domain.com' value={this.state.email} onChangeText={this.onChangeState('email')} style={styles.inputStyle}/>
                <Text style={styles.label}>Password</Text>
                <TextInput autoCorrect={false} placeholder={'*****'} secureTextEntry={true} value={this.state.password} onChangeText={this.onChangeState('password')} style={styles.inputStyle}/>
                <Button onPress={this.login} title='Login'/>
            </View>
        );
    }
}
