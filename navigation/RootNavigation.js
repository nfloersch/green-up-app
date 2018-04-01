import {Notifications} from 'expo';
import React from 'react';
import {StackNavigator} from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import TeamEditor from '../screens/teams-screen/team-editor';
import TeamSearch from '../screens/teams-screen/team-search';
import TeamDetails from '../screens/teams-screen/team-details';
import MessageDetails from '../screens/messages-screen/message-details';
import NewMessage from '../screens/messages-screen/new-message';
import InviteContacts from '../screens/teams-screen/invite-contacts';
import InviteForm from '../screens/teams-screen/invite-form';
import Profile from '../screens/profile-screen/';
import About from '../screens/about-screen/';
import TeamMemberDetails from '../screens/teams-screen/team-member-details';
import TrashBagFinder from '../screens/trash-bag-finder-screen';
import Privacy from '../screens/about-screen/privacy-screen';

const RootStackNavigator = StackNavigator(
    {
        Main: {
            screen: MainTabNavigator
        },
        MessageDetails: {
            screen: MessageDetails
        },
        Profile: {
            screen: Profile
        },
        TeamEditor: {
            screen: TeamEditor
        },
        TeamSearch: {
            screen: TeamSearch
        },
        TeamDetails: {
            screen: TeamDetails
        },
        NewMessage: {
            screen: NewMessage
        },
        InviteContacts: {screen: InviteContacts},
        Privacy: {screen: Privacy},
        About: {screen: About},
        InviteForm: {screen: InviteForm},
        TeamMemberDetails: {screen : TeamMemberDetails},
        TrashBagFinder: {screen: TrashBagFinder}
    },
    {
        navigationOptions: () => ({
            headerTitleStyle: {
                fontWeight: 'normal',
                margin: 0,
                textAlign:'center'
            }
        })
    }
);

export default class RootNavigator extends React.Component {
    componentDidMount() {
        this._notificationSubscription = this._registerForPushNotifications();
    }

    componentWillUnmount() {
        if (!!this._notificationSubscription) {
            this._notificationSubscription.remove();
        }
    }

    _registerForPushNotifications() {
        // Send our push token over to our backend so we can receive notifications
        // You can comment the following line out if you want to stop receiving
        // a notification every time you open the app. Check out the source
        // for this function in api/registerForPushNotificationsAsync.js
        registerForPushNotificationsAsync();

        // Watch for incoming notifications
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification = ({origin, data}) => {
    };

    render() {
        return <RootStackNavigator/>;
    }


}
