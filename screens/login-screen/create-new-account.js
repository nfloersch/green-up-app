// @flow

import React from "react";
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CreateAccountForm from "../../components/create-account-form";
import * as actionCreators from "./actions";
import { defaultStyles } from "../../styles/default-styles";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type PropsType = {
    actions: { createUser: any => void },
    createUserError: string
};


const CreateNewAccount = ({ actions, createUserError }: PropsType): React$Element<any> => (
    <KeyboardAvoidingView
        style={ defaultStyles.frame }
        behavior={ Platform.OS === "ios" ? "padding" : null }
    >
        <ScrollView style={ styles.scroll }>
            <CreateAccountForm
                buttonText="Create Account"
                createUserError={ createUserError }
                createAccount={ actions.createUser }
            />
            {
                Platform.OS === "ios"
                    ? (<View style={ defaultStyles.padForIOSKeyboardBig }/>)
                    : null
            }
        </ScrollView>
    </KeyboardAvoidingView>
);


CreateNewAccount.navigationOptions = {
    title: "Create New Account"
};

const mapStateToProps = (state: Object): Object => ({
    session: state.login.session,
    createUserError: state.login.createUserError
});

const mapDispatchToProps = (dispatch: Dispatch<ActionType>): Object => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(CreateNewAccount);
