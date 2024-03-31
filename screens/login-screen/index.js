// @flow

import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    Alert,
    Image,
    StyleSheet,
    View,
    Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import * as actionCreators from "@/action-creators/session-action-creators";
import logo from "@/assets/images/2021_sticker_glowed.png";
import LoginForm from "@/components/login-form";
import { defaultStyles } from "@/styles/default-styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as constants from "@/styles/constants";
import { LineDivider } from "@/components/divider";
import { SecondaryButton } from "@/components/button";

const myStyles = {
    logo: {
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 5,
        marginTop: 50
    },
    logoText: {
        fontSize: 24,
        color: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.6,
        shadowRadius: 1
    },
    socialLoginButton: {
        width: "100%",
        height: 44,
        marginTop: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 2, flex: 1, flexDirection: "row"
    },
    socialLoginLogo: {
        padding: 12,
        width: 44,
        alignSelf: "flex-start"
    },
    socialLogin: {
        flex: 1
    },
    socialLoginText: {
        fontSize: 16,
        fontWeight: "700",
        height: 40,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 12,
        color: "white"
    },
    logos: {
        width: 20,
        height: 20
    },
    form: {
        flex: 1,
        justifyContent: "space-between"
    },
    headerStyles: {
        backgroundColor: constants.backgroundColorDark
    }
};

const styles = StyleSheet.create({...defaultStyles, ...myStyles});

type PropsType = {
    actions: Object,
    loginError: any,
    navigation: Object
};

const Login = ({ actions, loginError, navigation }: PropsType): React$Element<any> => (
    <SafeAreaView style={ styles.container }>
        <KeyboardAwareScrollView>
            { loginError
                ? Alert.alert(
                    "",
                    (loginError.message || "Login Failed"),
                    [
                        {
                            text: "OK", onPress: () => {
                            }
                        }
                    ],
                    { cancelable: false }
                ) : null
            }
            <View style={ { paddingLeft: 20, paddingRight: 20 } }>
                <HideWithKeyboard>
                    <View style={ styles.logo }>
                        <Image source={ logo } style={ { height: 120, width: 120 } }/>
                    </View>
                </HideWithKeyboard>
                <View>
                    <LoginForm onButtonPress={ actions.loginWithEmailPassword }/>
                    <LineDivider/>
                    <View style={ { marginTop: 40, flexDirection: 'row', justifyContent: 'space-between' } }>
                        <SecondaryButton
                            onPress={ () => {
                                navigation.navigate("ForgotPassword");
                            } }
                            style={ { width: '48%' } }
                        >
                            <MaterialCommunityIcons
                                name={ "account-convert" }
                                size={ 25 }
                                style={ { marginRight: 10 } }
                                color="#FFF"
                            />
                            <Text style={{color: 'white'}}>RESET PASSWORD</Text>
                        </SecondaryButton>
                        <SecondaryButton
                            onPress={ () => {
                                navigation.navigate("CreateNewAccount");
                            } }
                            style={ { width: '48%' } }
                        >
                            <MaterialCommunityIcons
                                name={ "account-plus" }
                                size={ 25 }
                                style={ { marginRight: 10 } }
                                color="#FFF"
                            />
                            <Text style={{ color: 'white'}}>CREATE ACCOUNT</Text>
                        </SecondaryButton>
                    </View>
                </View>
                <View style={ { flex: 1 } }/>
            </View>
        </KeyboardAwareScrollView>
    </SafeAreaView>

);


Login.navigationOptions = {
    title: "Log In",
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

const mapStateToProps = (state: Object): Object => ({
    user: state.login.user,
    initialAuthChecked: state.login.initialAuthChecked,
    loginError: state.login.loginError
});

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(Login);
