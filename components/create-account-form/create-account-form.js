// @flow
import React, { Component } from "react";
import { Alert, TouchableOpacity, StyleSheet, Text, TextInput, View } from "react-native";
import { isValidEmail } from "../../libs/validators";
import { defaultStyles } from "../../styles/default-styles";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type Props = {
    buttonText: string,
    createUserError: string,
    onButtonPress: () => void
};

export class CreateAccountForm extends Component<Props> {

    constructor(props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.state = { email: "", password: "", displayName: "" };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.createUserError) {
            Alert.alert(nextProps.createUserError);
        }
    }

    static navigationOptions = {
        title: "Create New Account"
    };


    onChangeEmail(value) {
        this.setState({ email: (value || "").trim() });
    }

    onChangeState(stateKey) {
        return (value) => {
            this.setState({ [stateKey]: value });
        };
    }

    onButtonPress() {
        if (isValidEmail(this.state.email)) {
            this.props.onButtonPress(this.state.email, this.state.password, this.state.displayName);
        } else {
            Alert.alert("Please enter a valid email address");
        }
    }

    render() {
        return (
            <View style={ [styles.container, {
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 20,
                paddingTop: "20%"
            }] }>
                <View>
                    <Text style={ styles.label }>Email</Text>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={ false }
                        placeholder="you@domain.com"
                        value={ this.state.email }
                        onChangeText={ this.onChangeState("email") }
                        style={ styles.textInput }
                        underlineColorAndroid={ "transparent" }
                    />
                </View>
                <View>
                    <Text style={ styles.label }>Password</Text>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={ false }
                        placeholder={ "*****" }
                        secureTextEntry={ true }
                        value={ this.state.password }
                        onChangeText={ this.onChangeState("password") }
                        underlineColorAndroid={ "transparent" }

                        style={ styles.textInput }/>
                </View>
                <View>
                    <Text style={ styles.label }>Name</Text>
                    <TextInput
                        autoCorrect={ false }
                        placeholder={ "Jane Doe" }
                        value={ this.state.displayName }
                        onChangeText={ this.onChangeState("displayName") }
                        style={ styles.textInput }
                        underlineColorAndroid={ "transparent" }
                    />
                </View>
                <TouchableOpacity
                    style={ styles.button }
                    onPress={ this.onButtonPress }>
                    <Text style={ styles.buttonText }>
                        { this.props.buttonText || "Create Account" }
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
