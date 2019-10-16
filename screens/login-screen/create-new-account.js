// @flow

import React, { Component } from "react";
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CreateAccountForm from "../../components/create-account-form";
import * as actionCreators from "./actions";
import { defaultStyles } from "../../styles/default-styles";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type Props = {
    actions: {createUser: any => void},
    createUserError: string,
    navigation: Object
};


class CreateNewAccount extends Component<Props> {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: "Create New Account"
    };

    render() {
        const { actions, createUserError } = this.props;
        return (
            <KeyboardAvoidingView
                style={ defaultStyles.frame }
                behavior={ Platform.OS === "ios" ? "padding" : null }
            >
                <ScrollView style={ styles.scroll }>
                    <CreateAccountForm
                        buttonText="Create Account"
                        createUserError={ createUserError }
                        onButtonPress={ actions.createUser }
                    />
                    {
                        Platform.OS === "ios"
                            ? (<View style={ defaultStyles.padForIOSKeyboardBig }/>)
                            : null
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state) => ({ session: state.login.session, createUserError: state.login.createUserError });

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewAccount);
