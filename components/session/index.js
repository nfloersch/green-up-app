// @flow
import React, { useEffect, useState, Fragment } from "react";
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
    actions: { initialize: Object => void },
    children: React$Element<any>,
    appIsInitialized: boolean,
    updates: Object,
    userIsLoggedIn: boolean,
    user: Object
};

const Session = ({ actions, children, appIsInitialized, updates, userIsLoggedIn, user }: PropsType): React$Element<View> => {

    const [cachedUpdates, setCachedUpdate] = useState((updates || {}).data || {});

    useEffect(() => {
        if (
            !appIsInitialized) {
            actions.initialize(user);
        }
    }, []);


    useEffect(() => {
        if (!updates.error) {
            const updatesData = (updates || {}).data || {};
            Object.keys(updatesData).forEach(key => {
                const actionKey = `fetch${ key[0].toUpperCase() }${ key.slice(1) }`;
                if (actions[actionKey] && (cachedUpdates[key] !== updatesData[key])) {
                    actions[actionKey]();
                }
            });
            setCachedUpdate(updatesData);
        }
        // TODO: Handle Error
    }, [updates]);

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
    user: state.login.user,
    userIsLoggedIn: Boolean(state.login.user),
    updates: state.session.updates || {}
});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(Session);