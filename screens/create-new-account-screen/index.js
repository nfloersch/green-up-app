// @flow

import React from "react";
import {
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CreateAccountForm from "@/components/create-account-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as actionCreators from "@/action-creators/session-action-creators";
import { defaultStyles } from "@/styles/default-styles";
import * as constants from "@/styles/constants";

const myStyles = {};
const styles = StyleSheet.create({...defaultStyles, ...myStyles});

type PropsType = {
    actions: { createUser: any => void },
    createUserError: string
};


const Index = ({ actions, createUserError }: PropsType): React$Element<any> => (
    <KeyboardAwareScrollView style={ { backgroundColor: constants.colorBackgroundDark } }>
        <SafeAreaView style={ styles.container }>
            <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                <View style={ { paddingLeft: 20, paddingRight: 20, flex: 1, marginTop: 20, justifyContent: "flex-end" } }>
                    <CreateAccountForm
                        buttonText="Create Account"
                        createUserError={ createUserError }
                        createAccount={ actions.createUser }
                    />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    </KeyboardAwareScrollView>
);


Index.navigationOptions = {
    title: "Create New Account",
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
    session: state.login.session,
    createUserError: state.login.createUserError
});

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(Index);
