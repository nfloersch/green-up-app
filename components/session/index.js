// @flow
import React, { useEffect, Fragment } from "react";
import { bindActionCreators } from "redux";
import LoginScreen from "../../screens/login-screen/index";
// import MarketingPermissionsScreen from "../../screens/marketing-permissions";
import * as actionCreators from "../../action-creators/session-action-creators";
import { connect } from "react-redux";
import { Platform, StyleSheet, StatusBar, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    statusBarUnderlay: {
        height: 24,
        backgroundColor: "rgba(0,0,0,0.2)"
    }
});

type PropsType = {
    actions: { initialize: () => void },
    children: React$Element<any>,
    appIsInitialized: boolean,
//     marketingPermissionsGranted: boolean,
    userIsLoggedIn: boolean
};

const Session = ({ actions, children, appIsInitialized, userIsLoggedIn }: PropsType): React$Element<View> => {

    useEffect(() => {
        if (
            !appIsInitialized) {
            actions.initialize();
        }
    }, []);


    const content = userIsLoggedIn ? (<Fragment>{ children }</Fragment>) : (<LoginScreen/>);

    return (
        <View style={ styles.container }>
            { Platform.OS === "ios" && <StatusBar barStyle="default"/> }
            { content }
        </View>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

/**
 * @param {Object} state - app state
 * @returns {{appInitialized: (boolean|*), userIsLoggedIn: (boolean|*)}} - state
 */
const mapStateToProps = (state: Object): Object => ({
    userIsLoggedIn: Boolean(state.login.user)
});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(Session);