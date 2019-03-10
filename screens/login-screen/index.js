// @flow

import React from 'react';
import Login from './login';
import CreateNewAccount from './create-new-account';
import ForgotPassword from './forgot-password';
import {createStackNavigator, createAppContainer} from 'react-navigation';


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

export default createAppContainer(AppNavigator);

