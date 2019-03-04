import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import TrashTrackerScreen from '../screens/trash-tracker-screen';
import TeamsStack from './teams-stack';
import MenuStack from './menu-stack';
import MessagesStack from './messages-stack';

/*** Messages ***/
MessagesStack.navigationOptions = {
    tabBarLabel: 'Messages',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-chatbubbles${focused ? '' : ''}`
                    : 'md-chatbubbles'
            }
        />
    ),
};


/*** Teams ***/
TeamsStack.navigationOptions = {
    tabBarLabel: 'Teams',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios' ? `ios-contacts${focused ? '' : ''}` : 'md-contacts'
            }
        />
    ),
};

/*** Trash Tracker ***/
const TrashTrackerStack = createStackNavigator({
    TrashTracker: TrashTrackerScreen,
});

TrashTrackerStack.navigationOptions = {
    tabBarLabel: 'Trash',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios' ? `ios-pin${focused ? '' : ''}` : 'md-pin'
            }
        />
    ),
};


// /** Menu **/
// const MenuStack = createStackNavigator({
//     Menu: MenuScreen,
// });
//
MenuStack.navigationOptions = {
    tabBarLabel: 'Menu',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
        />
    ),
};

export default createBottomTabNavigator({
    MessagesStack,
    TeamsStack,
    TrashTrackerStack,
    MenuStack,
});
