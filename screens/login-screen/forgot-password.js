// @flow

import React, { useState } from "react";
import { Alert, TouchableOpacity, TouchableHighlight, StyleSheet, Text, TextInput, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isValidEmail } from "../../libs/validators";
import * as actionCreators from "./actions";
import { defaultStyles } from "../../styles/default-styles";


const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type PropsType = {
    actions: { resetPassword: string=>void },
    navigation: { goBack: any => void }
};

const ForgotPassword = ({ actions, navigation }: PropsType): React$Element<any> => {

    const [email, setEmail] = useState("");
    const [passwordResetSent, setPasswordResetSent] = useState(false);

    const onButtonPress = () => {
        if (isValidEmail(email)) {
            actions.resetPassword(email);
            setPasswordResetSent(true);
        } else {
            Alert.alert("Please enter a valid email address");
        }
    };

    return (
        <View style={ styles.frame }>
            <View style={ [styles.container, {
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 20,
                paddingTop: "20%"
            }] }>
                { passwordResetSent
                    ? (
                        <View style={ [styles.container, { paddingTop: "30%" }] }>
                            <Text style={ [styles.text, { textAlign: "center" }] }>{ "Check your email" }</Text>
                            <TouchableHighlight style={ styles.link } onPress={ () => {
                                navigation.goBack();
                            } }>
                                <Text style={ styles.linkText }>{ "< Back to Login" }</Text>
                            </TouchableHighlight>
                        </View>
                    )
                    : (
                        <View style={ styles.container }>
                            <Text style={ styles.label }>{ "Email Address" }</Text>
                            <TextInput
                                autoCorrect={ false }
                                value={ email }
                                keyBoardType="email-address"
                                placeholder="you@domain.com"
                                onChangeText={ setEmail }
                                style={ styles.textInput }
                                underlineColorAndroid={ "transparent" }
                            />
                            <TouchableOpacity
                                style={ styles.button }
                                onPress={ onButtonPress }
                            >
                                <Text style={ styles.buttonText }>{ "Reset Password" }</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
        </View>
    );
};


ForgotPassword.navigationOptions = {
    title: "Forgot Password"
};

const mapStateToProps = (state: Object): Object => ({ session: state.login.session });

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
