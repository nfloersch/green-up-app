// @flow
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { isValidEmail } from "../../libs/validators";
import { defaultStyles } from "../../styles/default-styles";
import { Button, Text, Subtitle, TextInput } from "@shoutem/ui";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
            <View style={ styles.formControl }>
                <Text style={ styles.label }>{ "Email" }</Text>
                <TextInput
                    autoCapitalize="none"
                    keyBoardType="email-address"
                    autoCorrect={ false }
                    placeholder="janedoe@example.com"
                    value={ email }
                    onChangeText={ setEmail }
                />
            </View>
            <View style={ styles.formControl }>
                <Text style={ styles.label }>{ "Password" }</Text>
                <TextInput
                    autoCapitalize="none"
                    keyBoardType={ "default" }
                    autoCorrect={ false }
                    placeholder={ "*****" }
                    secureTextEntry={ true }
                    value={ password }
                    onChangeText={ setPassword }
                />
            </View>
            <View style={ styles.formControl }>
                <Button
                    onPress={ handleButtonPress }
                    styleName={ "primary" }
                    style={ { padding: 10, paddingLeft: 20, paddingRight: 20 } }
                >
                    <MaterialCommunityIcons name={ "login" } style={ { marginRight: 10 } } size={ 25 } color="#555"/>
                    <Subtitle
                        styleName={ "bold" }
                        style={ { textAlign: "center", color: "#555" } }
                    >
                        { buttonText ? buttonText.toUpperCase() : "LOG IN" }
                    </Subtitle>
                </Button>
            </View>
        </View>
    );
};
