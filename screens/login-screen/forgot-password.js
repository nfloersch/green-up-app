// @flow

import React, { Component } from "react";
import { Alert, TouchableOpacity, TouchableHighlight, StyleSheet, Text, TextInput, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isValidEmail } from "../../libs/validators";
import * as actionCreators from "./actions";
import { defaultStyles } from "../../styles/default-styles";


const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type Props = {
    actions: { resetPassword: string=>void },
    navigation: { goBack: any => void }
};

class ForgotPassword extends Component<Props> {

    static navigationOptions = {
        title: "Forgot Password"
    };

    constructor(props) {
        super(props);
        this.state = { email: "", passwordResetSent: false };
    }


    render() {
        const { navigation, actions } = this.props;
        const onChangeState = (stateKey: string) => (value: any) => {
            this.setState({ [stateKey]: value });
        };

        const onButtonPress = () => {
            if (isValidEmail(this.state.email)) {
                actions.resetPassword(this.state.email);
                this.setState({ passwordResetSent: true });
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
                    { this.state.passwordResetSent
                        ? (
                            <View style={ [styles.container, { paddingTop: "30%" }] }>
                                <Text style={ [styles.text, { textAlign: "center" }] }>Check your email</Text>
                                <TouchableHighlight style={ styles.link } onPress={ () => navigation.goBack() }>
                                    <Text style={ styles.linkText }>{ "< Back to Login" }</Text>
                                </TouchableHighlight>
                            </View>
                        )
                        : (
                            <View style={ styles.container }>
                                <Text style={ styles.label }>Email Address</Text>
                                <TextInput
                                    autoCorrect={ false }
                                    value={ this.state.email }
                                    keyBoardType="email-address"
                                    placeholder="you@domain.com"
                                    onChangeText={ onChangeState("email") }
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
        )
        ;
    }
}

const mapStateToProps = (state) => ({ session: state.login.session });

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
