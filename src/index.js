// @flow

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as loginActions from './screens/login/login-actions';
import PropTypes from 'prop-types';
import {View, Alert, Text, TouchableOpacity} from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Welcome from './screens/login/';
import ForgotPassword from './screens/login/forgot-password';
import CreateNewAccount from './screens/login/create-new-account';
import Messages from './screens/messages/';
import Donate from './screens/donate/Donate';
import Teams from './screens/my-teams/';
import TrashTracker from './screens/trash-tracker/';
import AllAboutGreenUpDay from './screens/about-green-up-day/AllAboutGreenUpDay';
import Logout from './screens/login/logout';

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
        screen: Teams
    },
    TrashTracker: {
        screen: TrashTracker
    },
    AllAboutGreenUpDay: {
        screen: AllAboutGreenUpDay
    },
    Logout: {
        screen: Logout
    }
}, {drawerPosition: 'right'});

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
            <View style={{
                flex: 1
            }}>{whichNav}</View>
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
