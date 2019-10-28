// @flow
import React, { useState, useEffect } from "react";
import { Alert, TouchableOpacity, StyleSheet, Text, TextInput, View } from "react-native";
import { isValidEmail } from "../../libs/validators";
import { defaultStyles } from "../../styles/default-styles";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type PropsType = {
    buttonText: string,
    createUserError: string,
    createAccount: (string, string, string) => void
};

export const CreateAccountForm = ({ buttonText, createUserError, createAccount }: PropsType): React$Element<any> => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        if (createUserError) {
            Alert.alert(createUserError);
        }
    }, [createUserError]);

    const onButtonPress = () => {
        if (isValidEmail(email)) {
            createAccount(email, password, displayName);
        } else {
            Alert.alert("Please enter a valid email address");
        }
    };


    return (
        <View style={ [styles.container, {
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20,
            paddingTop: "20%"
        }] }>
            <View>
                <Text style={ styles.label }>{ "Email" }</Text>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={ false }
                    placeholder="you@domain.com"
                    value={ email }
                    onChangeText={ setEmail }
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
                    value={ password }
                    onChangeText={ setPassword }
                    underlineColorAndroid={ "transparent" }

                    style={ styles.textInput }/>
            </View>
            <View>
                <Text style={ styles.label }>Name</Text>
                <TextInput
                    autoCorrect={ false }
                    placeholder={ "Jane Doe" }
                    value={ displayName }
                    onChangeText={ setDisplayName }
                    style={ styles.textInput }
                    underlineColorAndroid={ "transparent" }
                />
            </View>
            <TouchableOpacity
                style={ styles.button }
                onPress={ onButtonPress }>
                <Text style={ styles.buttonText }>
                    { buttonText || "Create Account" }
                </Text>
            </TouchableOpacity>
        </View>
    );
};


CreateAccountForm.navigationOptions = {
    title: "Create New Account"
};