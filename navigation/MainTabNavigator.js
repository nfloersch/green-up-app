import React from 'react';
import {Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {TabNavigator, TabBarBottom} from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import TeamsScreen from '../screens/teams-screen/';
import MessagesScreen from '../screens/messages-screen/';
import TrashTrackerScreen from '../screens/trash-tracker-screen/';
import DonateScreen from '../screens/donate-screen/';

export default TabNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Messages: {
            screen: MessagesScreen
        },
        Teams: {
            screen: TeamsScreen
        },
        TrashTracker: {
            screen: TrashTrackerScreen
        },
        Support: {
            screen: DonateScreen
        }
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused}) => {
                const {routeName} = navigation.state;
                let iconName;
                switch (routeName) {
                    case 'Messages':
                        iconName =
                            Platform.OS === 'ios'
                                ? `ios-information-circle${focused ? '' : '-outline'}`
                                : 'md-information-circle';
                        break;
                    case 'Groups':
                        iconName = Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link';
                        break;
                    case 'TrashTracker':
                        iconName =
                            Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options';
                        break;
                    case 'Support' :
                        iconName = Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-happy';
                        break;
                    default:
                        iconName = Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link';
                        break;
                }
                return (
                    <Ionicons
                        name={iconName}
                        size={28}
                        style={{marginBottom: -3}}
                        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                    />
                );
            }
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: false
    }
);
