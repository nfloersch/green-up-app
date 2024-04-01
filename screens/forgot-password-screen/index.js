// @flow

import React, { useState, Fragment } from "react";
import {
    Alert,
    StyleSheet,
    View,
    Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isValidEmail } from "@/libs/validators";
import * as actionCreators from "@/action-creators/session-action-creators";
import { defaultStyles } from "@/styles/default-styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as constants from "@/styles/constants";
import { TextInput } from "@/components/inputs";
import { PrimaryButton, SecondaryButton } from "@/components/button";

const myStyles = {};
const styles = StyleSheet.create({ ...defaultStyles, ...myStyles });

type PropsType = {
    actions: { resetPassword: string=> void },
    navigation: { goBack: any => void }
};

const Index = ({ actions, navigation }: PropsType): React$Element<any> => {

    const [email, setEmail] = useState("");
    const [passwordResetSent, setPasswordResetSent] = useState(false);

    const onButtonPress = () => {
        // Remove leading/trailing whitespace before processing email
        const trimmedEmail = email.trim();
        if (isValidEmail(trimmedEmail)) {
            actions.resetPassword(trimmedEmail);
            setPasswordResetSent(true);
        } else {
            Alert.alert("Please enter a valid email address");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingLeft: 20, paddingRight: 20, flex: 1, paddingTop: 50 }}>
                {passwordResetSent
                    ? (
                        <Fragment>
                            <View style={{ ...styles.formControl, marginBottom: 40 }}>
                                <Text style={{
                                    textAlign: "left",
                                    color: "#FFF"
                                }}>
                                    {"A link to reset your password has been sent to your email."}
                                </Text>
                            </View>
                            <View style={styles.formControl}>
                                <SecondaryButton
                                    onPress={() => {
                                        navigation.goBack();
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "#FFF"
                                        }}>{"RETURN TO LOGIN"}</Text>
                                </SecondaryButton>
                            </View>
                        </Fragment>
                    )
                    : (
                        <Fragment>
                            <View style={styles.formControl}>
                                <Text style={styles.label}>{"Email Address"}</Text>
                                <TextInput
                                    autoCorrect={false}
                                    value={email}
                                    keyBoardType="email-address"
                                    placeholder="you@domain.com"
                                    onChangeText={setEmail}
                                    underlineColorAndroid={"transparent"}
                                />
                            </View>
                            <View style={styles.formControl}>
                                <PrimaryButton onPress={onButtonPress}>
                                    <MaterialCommunityIcons
                                        name={"account-convert"}
                                        style={{ marginRight: 10 }}
                                        size={25}
                                        color="#555"
                                    />
                                    <Text
                                        styleName={"bold"}
                                        style={{
                                            textAlign: "center",
                                            color: "#555",
                                            fontFamily: "Rubik-Regular"
                                        }}
                                    >
                                        {"RESET PASSWORD"}
                                    </Text>
                                </PrimaryButton>
                            </View>
                        </Fragment>
                    )
                }
            </View>
        </SafeAreaView>
    );
};


Index.navigationOptions = {
    title: "Forgot Password",
    headerStyle: {
        backgroundColor: constants.colorBackgroundDark
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        fontFamily: "Rubik-Regular",
        fontWeight: "bold",
        fontSize: 20,
        color: constants.colorHeaderText
    },
    headerBackTitleStyle: {
        fontFamily: "Rubik-Regular",
        fontWeight: "bold",
        fontSize: 20,
        color: constants.colorHeaderText
    }
};

const mapStateToProps = (state: Object): Object => ({ session: state.login.session });

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(Index);
