import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/login-screen";
import CreateNewAccount from "../screens/create-new-account-screen";
import ForgotPassword from "../screens/forgot-password-screen";

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={Login.navigationOptions} />
            <Stack.Screen
                name="CreateNewAccount"
                component={CreateNewAccount}
                options={CreateNewAccount.navigationOptions}
            />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={ForgotPassword.navigationOptions} />
        </Stack.Navigator>
    );
}