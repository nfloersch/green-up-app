// @flow
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { isValidEmail } from "../../libs/validators";
import { defaultStyles } from "../../styles/default-styles";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type PropsType = {
    buttonText?: string,
    onButtonPress: (string, string) => void
};

export const LoginForm = ({ buttonText, onButtonPress }: PropsType): React$Element<View> => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleButtonPress = () => {
        if (isValidEmail(email)) {
            onButtonPress(email, password);
        } else {
            Alert.alert("Please enter a valid email address");
        }
    };

    return (
        <View style={ { marginBottom: 10 } }>
            <View>
                <Text style={ styles.label }>{ "Email" }</Text>
                <TextInput
                    autoCapitalize="none"
                    keyBoardType="email-address"
                    autoCorrect={ false }
                    placeholder="you@domain.com"
                    value={ email }
                    onChangeText={ setEmail }
                    style={ styles.textInput }
                    underlineColorAndroid={ "transparent" }
                />
            </View>
            <View>
                <Text style={ styles.label }>{ "Password" }</Text>
                <TextInput
                    autoCapitalize="none"
                    keyBoardType={ "default" }
                    autoCorrect={ false }
                    placeholder={ "*****" }
                    secureTextEntry={ true }
                    value={ password }
                    onChangeText={ setPassword }
                    style={ styles.textInput }
                    underlineColorAndroid={ "transparent" }
                />
            </View>
            <TouchableOpacity style={ styles.button } onPress={ handleButtonPress }>
                <Text style={ styles.buttonText }>{ buttonText || "Login" }</Text>
            </TouchableOpacity>
        </View>
    );
};
