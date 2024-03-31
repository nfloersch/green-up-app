import React, { useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { isValidEmail } from "@/libs/validators";
import { defaultStyles } from "@/styles/default-styles";
import { PrimaryButton } from "@/components/button";
import { TextInput } from "@/components/inputs";

const myStyles = {};
const styles = StyleSheet.create({...defaultStyles, ...myStyles });

type PropsType = {
    buttonText?: string,
    onButtonPress: (string, string) => void
};

export const LoginForm = ({ buttonText, onButtonPress }: PropsType): React$Element<View> => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleButtonPress = () => {
        // Remove leading/trailing whitespace before processing email
        const trimmedEmail = email.trim();
        if (isValidEmail(trimmedEmail)) {
            onButtonPress(trimmedEmail, password);
        } else {
            Alert.alert("Please enter a valid email address");
        }
    };

    return (
        <View style={{ marginBottom: 10 }}>
            <View style={styles.formControl}>
                <Text style={styles.label}>{"Email"}</Text>
                <TextInput
                    autoCapitalize="none"
                    keyBoardType="email-address"
                    autoCorrect={false}
                    placeholder="janedoe@example.com"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>{"Password"}</Text>
                <TextInput
                    autoCapitalize="none"
                    keyBoardType={"default"}
                    autoCorrect={false}
                    placeholder={"*****"}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <View style={styles.formControl}>
                <PrimaryButton onPress={handleButtonPress}>
                    <MaterialCommunityIcons name={"login"} style={{ marginRight: 10 }} size={25} color="#555" />
                    <Text style={{ textAlign: "center", color: "#555" }} >
                        {buttonText ? buttonText.toUpperCase() : "LOG IN"}
                    </Text>
                </PrimaryButton>
            </View>
        </View>
    );
};
