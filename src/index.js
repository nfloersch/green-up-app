// @flow

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as loginActions from './screens/login/login-actions';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Welcome from './screens/login/';
import ForgotPassword from './screens/login/forgot-password';
import CreateNewAccount from './screens/login/create-new-account';
import Messages from './screens/messages/';
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
    static propTypes = {
        session: PropTypes.object
    }
    constructor(props) {
        super(props);
    }

    render() {
        var whichNav = this.props.session && this.props.session.user && this.props.session.user._id
            ? (<AppNav/>)
            : (<LoginNav/>);
        return (
            <View style={{flex:1}}>{whichNav}</View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {session: state.loginReducer.session};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
