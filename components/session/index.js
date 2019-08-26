// @flow
import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import LoginScreen from "../../screens/login-screen/index";
// import MarketingPermissionsScreen from "../../screens/marketing-permissions";
import * as actions from "./actions";
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

type Props = {
    actions: { initialize: () => void },
    children: typeof React.Node,
    appIsInitialized: boolean,
//     marketingPermissionsGranted: boolean,
    user: Object,
    userIsLoggedIn: Boolean,
};

class Session extends Component<Props> {

    componentDidMount(): void {
        if (!this.props.appIsInitialized) {
            this.props.actions.initialize();
        }
    }

    render() {
        const { userIsLoggedIn, children } = this.props;
        const content = userIsLoggedIn ? (<Fragment>{ children }</Fragment>) : (<LoginScreen/>);

        return (
            <View style={ styles.container }>
                { Platform.OS === "ios" && <StatusBar barStyle="default"/> }
                { content }
            </View>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

/**
 * @param {Object} state - app state
 * @returns {{appInitialized: (boolean|*), userIsLoggedIn: (boolean|*)}} - state
 */
function mapStateToProps(state) {
    return {
        userIsLoggedIn: Boolean(state.login.user)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Session);

