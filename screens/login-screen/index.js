// @flow

import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    Alert,
    Image,
    StyleSheet,
    SafeAreaView
} from "react-native";
import { View, Button, Text, Divider } from "@shoutem/ui";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import * as actionCreators from "../../action-creators/session-action-creators";
import logo from "../../assets/images/gu-50-logo.png";
import LoginForm from "../../components/login-form";
import { defaultStyles } from "../../styles/default-styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as constants from "../../styles/constants";

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

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

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
            <View style={ { paddingLeft: 20, paddingRight: 20, flex: 1, justifyContent: "flex-end" } }>
                <HideWithKeyboard>
                    <View style={ styles.logo }>
                        <Image source={ logo } style={ { height: 120, width: 120 } }/>
                    </View>
                </HideWithKeyboard>
                <View style={ { width: "100%" } }>
                    <LoginForm onButtonPress={ actions.loginWithEmailPassword }/>
                    <Divider styleName="line"/>
                    <View style={ { marginTop: 40 } } styleName="horizontal">
                        <Button
                            onPress={ () => {
                                navigation.navigate("ForgotPassword");
                            } }
                            style={ { paddingLeft: 20, paddingRight: 20 } }
                            styleName="confirmation secondary"
                        >
                            <MaterialCommunityIcons
                                name={ "account-convert" }
                                size={ 25 }
                                style={ { marginRight: 10 } }
                                color="#FFF"
                            />
                            <Text>RESET PASSWORD</Text>
                        </Button>
                        <Button
                            onPress={ () => {
                                navigation.navigate("CreateNewAccount");
                            } }
                            style={ { paddingLeft: 20, paddingRight: 20 } }
                            styleName="confirmation secondary"
                        >
                            <MaterialCommunityIcons
                                name={ "account-plus" }
                                size={ 25 }
                                style={ { marginRight: 10 } }
                                color="#FFF"
                            />
                            <Text style={ styles.buttonText }>CREATE ACCOUNT</Text>
                        </Button>
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
