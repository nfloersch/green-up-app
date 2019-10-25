// @flow

import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View
} from "react-native";
import * as actionCreators from "./actions";
import logo from "../../assets/images/green-up-logo.png";
import facebookLogo from "../../assets/images/facebook-logo.png";
// import googleLogo from "../../assets/images/google-logo.png";
import LoginForm from "../../components/login-form";
import { defaultStyles } from "../../styles/default-styles";


const myStyles = {
    logo: {
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 5
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
    }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type PropsType = {
    actions: Object,
    loginError: any,
    navigation: Object
};

const Login = ({ actions, loginError, navigation }: PropsType): React$Element<any> => {

    // const googleLogin = (): Promise<any> => {
    //     actions.isLoggingInViaSSO(true);
    //     return actions.googleLogin();
    // };


    const facebookLogin = (): Promise<any> => {
        actions.isLoggingInViaSSO(true);
        return actions.facebookLogin();
    };

    return (
        <View style={ styles.frame }>
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
            <View style={ styles.container }>
                <ScrollView style={ styles.scroll }>
                    <View style={ { paddingLeft: 20, paddingRight: 20 } }>
                        <View style={ styles.logo }>
                            <Image source={ logo } style={ { height: 120, width: 120 } }/>
                        </View>

                        <KeyboardAvoidingView
                            style={ styles.form }
                            behavior={ Platform.OS === "ios" ? "padding" : null }
                        >
                            <View style={ { width: "100%" } }>
                                <LoginForm onButtonPress={ actions.loginWithEmailPassword }/>
                                <TouchableHighlight
                                    style={ styles.link }
                                    onPress={ () => {
                                        navigation.navigate("ForgotPassword");
                                    } }>
                                    <Text style={ [styles.linkText, { fontSize: 16 }] }>I forgot my password</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={ styles.link }
                                    onPress={ () => {
                                        navigation.navigate("CreateNewAccount");
                                    } }>
                                    <Text style={ [styles.linkText, { fontSize: 16 }] }>Create a new account</Text>
                                </TouchableHighlight>
                            </View>
                        </KeyboardAvoidingView>
                        <Text style={ [styles.text, { textAlign: "center", marginTop: 10 }] }> - OR - </Text>
                        {/* <TouchableOpacity*/ }
                        {/* style={styles.socialLoginButton}*/ }
                        {/* onPress={googleLogin}>*/ }
                        {/* <View style={[styles.socialLoginLogo, {backgroundColor: 'white'}]}>*/ }
                        {/* <Image source={googleLogo} style={styles.logos}/>*/ }
                        {/* </View>*/ }
                        {/* <View style={[styles.socialLogin, {backgroundColor: '#4688f1'}]}>*/ }
                        {/* <Text style={styles.socialLoginText}>Log in with Google</Text>*/ }
                        {/* </View>*/ }
                        {/* </TouchableOpacity>*/ }
                        <TouchableOpacity
                            style={ styles.socialLoginButton }
                            onPress={ facebookLogin }>
                            <View style={ [styles.socialLoginLogo, {
                                backgroundColor: "#415893"
                            }] }>
                                <Image style={ styles.logos } source={ facebookLogo }/>
                            </View>
                            <View style={ [styles.socialLogin, { backgroundColor: "#2d3f67" }] }>
                                <Text style={ [styles.socialLoginText, { alignSelf: "stretch" }] }>
                                    Log in with Facebook
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={ defaultStyles.padForIOSKeyboard }/>
                </ScrollView>
            </View>
        </View>
    );
};


Login.navigationOptions = {
    title: "Log In"
};

const mapStateToProps = (state: Object): Object => ({
    user: state.login.user,
    initialAuthChecked: state.login.initialAuthChecked,
    loginError: state.login.loginError
});

const mapDispatchToProps = (dispatch: Dispatch<ActionType>): Object => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(Login);
