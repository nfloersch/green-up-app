// @flow

import React, {Component} from 'react';

import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Welcome from './screens/login/';
import ForgotPassword from './screens/login/forgot-password';
import CreateNewAccount from './screens/login/create-new-account';
import Messages from './screens/messages/Messages';
import Donate from './screens/donate/Donate';
import MyTeams from './screens/my-teams/MyTeams';
import TrashTracker from './screens/trash-tracker/TrashTracker';
import AllAboutGreenUpDay from './screens/about-green-up-day/AllAboutGreenUpDay';

const LoginNav = StackNavigator({
    Welcome: {
        screen: Welcome
    },
    ForgotPassword: {
        screen: ForgotPassword
    },
    CreateNewAccount: {
        screen: CreateNewAccount
    }
});

const AppNav = DrawerNavigator({
    Messages: {
        screen: Messages
    },
    Donate: {
        screen: Donate
    },
    MyTeams: {
        screen: MyTeams
    },
    TrashTracker: {
        screen: TrashTracker
    },
    AllAboutGreenUpDay: {
        screen: AllAboutGreenUpDay
    }
});

class Nav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<LoginNav/>);
    }
}

export default Nav;
