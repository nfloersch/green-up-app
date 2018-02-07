/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import Login from './login';
import CreateNewAccount from './create-new-account';
import ForgotPassword from './forgot-password';

import {StackNavigator} from 'react-navigation';

export default StackNavigator({
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

