// @flow

import Login from "../screens/login-screen";
import CreateNewAccount from "../screens/create-new-account";
import ForgotPassword from "../screens/forgot-password-screen";
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator({
    Login: {
        screen: Login
    },
    CreateNewAccount: {
        screen: CreateNewAccount
    },
    ForgotPassword: {
        screen: ForgotPassword
    }
});

// $FlowFixMe
export default createAppContainer(AppNavigator);

