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


// // @flow
// import React, { Component, Fragment } from "react";
// import { bindActionCreators } from "redux";
// import LoginScreen from "../../screens/login-screen/index";
// import MarketingPermissionsScreen from "../../screens/marketing-permissions";
//
// import * as actions from "./actions";
// import { connect } from "react-redux";
//
// type Props = {
//     children: any,
//     initialAuthChecked: boolean,
//     isInitialized: boolean,
//     isLoggingInViaSSO: boolean,
//     actions: { initialize: () => void },
//     marketingPermissionsGranted: boolean,
//     splash: Object,
//     user: Object,
//     userIsLoggedIn: boolean
// };
//
// class Session extends Component<Props> {
//
//
//     constructor(props) {
//         super(props);
//     }
//
//     componentDidMount() {
//         this.props.actions.initialize();
//     }
//
//     render() {
//         const { userIsLoggedIn, isInitialized, isLoggingInViaSSO, splash, children, marketingPermissionsGranted } = this.props;
//
//         switch (true) {
//             case (userIsLoggedIn === false && !isLoggingInViaSSO) :
//                 return (
//                     <LoginScreen/>
//                 );
//             case (isInitialized && !marketingPermissionsGranted):
//                 return (
//                     <MarketingPermissionsScreen/>
//                 );
//             case (isInitialized && marketingPermissionsGranted):
//                 return (
//                     <Fragment>
//                         {children}
//                     </Fragment>
//                 );
//             default :
//                 return (
//                     <Fragment>{splash}</Fragment>
//                 );
//         }
//     }
//
// }
//
// function mapStateToProps(state) {
//     const { login, loading } = state;
//     const isInitialized = loading.setupMessagesListener && loading.setupProfileListener;
//     const { initialAuthChecked, isLoggingInViaSSO, userIsLoggedIn, user } = login;
//     const marketingPermissionsGranted = state.profile &&
//         typeof state.profile.grantMarketingConsent !== "undefined" &&
//         state.profile.grantMarketingConsent !== null;
//
//     return {
//         initialAuthChecked,
//         isLoggingInViaSSO,
//         userIsLoggedIn,
//         isInitialized,
//         user: user || {},
//         marketingPermissionsGranted
//     };
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(actions, dispatch)
//     };
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Session);
