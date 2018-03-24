import React from 'react';
import {Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {TabNavigator, TabBarBottom} from 'react-navigation';

// import Colors from '../constants/Colors';
import * as colors from '../styles/constants';
import MenuScreen from '../screens/menu-screen';
import TeamsScreen from '../screens/teams-screen/';
import MessagesScreen from '../screens/messages-screen/';
import TrashTrackerScreen from '../screens/trash-tracker-screen/';
// import DonateScreen from '../screens/donate-screen/';

export default TabNavigator(
    {
        Messages: {
            screen: MessagesScreen
        },
        Teams: {
            screen: TeamsScreen
        },
        TrashTracker: {
            screen: TrashTrackerScreen
        },
        Menu: {
            screen: MenuScreen
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
                                ? `ios-chatbubbles${focused ? '' : '-outline'}`
                                : 'md-chatbubbles';
                        break;
                    case 'Teams':
                        iconName = Platform.OS === 'ios' ? `ios-contacts${focused ? '' : '-outline'}` : 'md-contacts';
                        break;
                    case 'TrashTracker':
                        iconName = Platform.OS === 'ios' ? `ios-pin${focused ? '' : '-outline'}` : 'md-pin';
                        break;
                    // case 'Support' :
                    //     iconName = Platform.OS === 'ios' ? `ios-happy${focused ? '' : '-outline'}` : 'md-happy';
                    //     break;
                    case 'Menu' :
                        iconName = Platform.OS === 'ios' ? `ios-apps${focused ? '' : '-outline'}` : 'md-apps';
                        break;
                    default:
                        iconName = Platform.OS === 'ios' ? `ios-apps${focused ? '' : '-outline'}` : 'md-apps';
                        break;
                }
                return (
                    <Ionicons
                        name={iconName}
                        size={28}
                        style={{marginBottom: -3}}
                        color={focused ? colors.tabIconSelected : colors.tabIconDefault}
                    />
                );
            }
        }),
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: colors.buttonColor,
            inactiveTintColor: colors.tabIconDefault,
            labelStyle: {
                fontSize: 10
            },
            style: {
                backgroundColor: colors.tabBarBackground
            }
        }
    }
);
