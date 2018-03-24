// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {email} from '../libs/validators';
import {defaultStyles} from '../styles/default-styles';

const myStyles = {};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

export default class LoginForm extends Component {
    static navigationOptions = {
        title: 'Green Up Vermont'
    };
    static propTypes = {
        buttonText: PropTypes.string,
        onButtonPress: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.state = {email: '', password: '', displayName: ''};
    }

    onChangeState(stateKey) {
        return (value) => {
            this.setState({[stateKey]: value});
        };
    }

    onButtonPress() {
        if(email(this.state.email)) {
            this.props.onButtonPress(this.state.email, this.state.password, this.state.displayName);
        } else {
            Alert.alert('Please enter a valid email address');
        }
    }

    render() {
        return (
            <View>
                <View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        keyBoardType='email-address'
                        autoCorrect={false}
                        placeholder='you@domain.com'
                        value={this.state.email}
                        onChangeText={this.onChangeState('email')}
                        style={styles.textInput}
                        underlineColorAndroid={'transparent'}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        keyBoardType={'default'}
                        autoCorrect={false}
                        placeholder={'*****'}
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={this.onChangeState('password')}
                        style={styles.textInput}
                        underlineColorAndroid={'transparent'}
                    />
                </View>
                <View style={{marginTop: 10, marginBottom: 10}}>
                    <Button onPress={this.onButtonPress} title={this.props.buttonText || 'Login'}/>
                </View>
            </View>
        );
    }
}
