// @flow
import React, { useState, useEffect } from "react";
import {
    Alert,
    StyleSheet,
    View,
    Text,
} from "react-native";
import { isValidEmail } from "@/libs/validators";
import { defaultStyles } from "@/styles/default-styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "../inputs";
import { PrimaryButton } from "../button";

const myStyles = {};
const styles = StyleSheet.create({...defaultStyles, ...myStyles});

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
        // Remove leading/trailing whitespace before processing email
        const trimmedEmail = email.trim();
        if (isValidEmail(trimmedEmail)) {
            createAccount(trimmedEmail, password, displayName);
        } else {
            Alert.alert("Please enter a valid email address");
        }
    };


    return (
        <View>
            <View style={styles.formControl}>
                <Text style={styles.label}>{"Email"}</Text>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="janedoe@example.com"
                    value={email}
                    onChangeText={setEmail}
                    underlineColorAndroid={"transparent"}
                />
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder={"*****"}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    underlineColorAndroid={"transparent"}
                />
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    autoCorrect={false}
                    placeholder={"Jane Doe"}
                    value={displayName}
                    onChangeText={setDisplayName}
                    underlineColorAndroid={"transparent"}
                />
            </View>
            <View style={styles.formControl}>
                <PrimaryButton onPress={onButtonPress}
                    styleName={"primary"}
                    style={{ marginTop: 20, padding: 10, paddingLeft: 20, paddingRight: 20 }}
                >
                    <MaterialCommunityIcons name={"account-plus"} style={{ marginRight: 10 }} size={25} color="#555" />
                    <Text
                        style={{ textAlign: "center", color: "#555" }}
                    >
                        {buttonText ? buttonText.toUpperCase() : "CREATE ACCOUNT"}
                    </Text>
                </PrimaryButton>
            </View>
        </View>
    );
};