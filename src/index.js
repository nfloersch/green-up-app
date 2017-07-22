// @flow

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as loginActions from './screens/login/login-actions';
import PropTypes from 'prop-types';
import {View, Alert} from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Welcome from './screens/login/';
import ForgotPassword from './screens/login/forgot-password';
import CreateNewAccount from './screens/login/create-new-account';
import Messages from './screens/messages/';
import Donate from './screens/donate/Donate';
import Teams from './screens/my-teams/';
import TrashTracker from './screens/trash-tracker/';
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
        screen: Teams
    },
    TrashTracker: {
        screen: TrashTracker
    },
    AllAboutGreenUpDay: {
        screen: AllAboutGreenUpDay
    }
}, {drawerPosition: 'right'});

class Nav extends Component {
    static propTypes = {
        session: PropTypes.object
    }
    constructor(props) {
        super(props);
    }
componentDidMount(){
         async function showFirstContactAsync() {
            // Ask for permission to query contacts.
            const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
            if (permission.status !== 'granted') {
                // Permission was denied...
                return;
            }
            const contacts = await Expo.Contacts.getContactsAsync({
                fields: [
                    Expo.Contacts.PHONE_NUMBERS,
                    Expo.Contacts.EMAILS,
                    Expo.Contacts.PHONETIC_FIRST_NAME,
                    Expo.Contacts.PHONETIC_LAST_NAME
                ],
                pageSize: 1000,
                pageOffset: 0,
            });
            if (contacts.total > 0) {
                console.log(JSON.stringify(contacts));
                Alert.alert(
                    'Your first contact is...',
                    `Name: ${contacts.data[0].name}\n` +
                    `Phone numbers: ${JSON.stringify(contacts.data[0].phoneNumbers)}\n` +
                    `Emails: ${JSON.stringify(contacts.data[0].emails)}`
                );
            }
        }
        showFirstContactAsync();
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
