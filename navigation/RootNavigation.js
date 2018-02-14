import {Notifications} from 'expo';
import React from 'react';
import {StackNavigator} from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import TeamEditor from '../screens/teams-screen/team-editor';
import TeamSearch from '../screens/teams-screen/team-search';
import MessageDetails from '../screens/messages-screen/message-details';
import NewMessage from '../screens/messages-screen/new-message';

const RootStackNavigator = StackNavigator(
    {
        Main: {
            screen: MainTabNavigator
        },
        MessageDetails: {
            screen: MessageDetails
        },
        TeamEditor: {
            screen: TeamEditor
        },
        TeamSearch: {
            screen: TeamSearch
        },
        NewMessage: {
            screen: NewMessage
        }
    },
    {
        navigationOptions: () => ({
            headerTitleStyle: {
                fontWeight: 'normal'
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
        console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
    };

    render() {
        return <RootStackNavigator/>;
    }


}
