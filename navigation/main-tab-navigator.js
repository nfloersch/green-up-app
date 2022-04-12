// @flow
import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import TabBarIcon from "../components/tab-bar-icon";
import MenuStack from "./menu-stack";
import MessagesStack from "./messages-stack";
import TrashTrackerStack from "./trash-tracker-stack";
import HomeStack from "./home-stack";
import LeaderboardStack from "./leaderboard-stack";

type FocusedType = { focused: boolean };

/** Home **/
HomeStack.navigationOptions = {
    tabBarLabel: "Home",
    tabBarIcon: ({ focused }: FocusedType): React$Element<any> => (
        <TabBarIcon
            focused={ focused }
            name={
                Platform.OS === "ios"
                    ? `ios-home${ focused ? "" : "" }`
                    : "md-home"
            }
        />
    )
};


/** * Messages ***/
MessagesStack.navigationOptions = {
    tabBarLabel: "Messages",
    tabBarIcon: ({ focused }: FocusedType): React$Element<any> => (
        <TabBarIcon
            focused={ focused }
            name={
                Platform.OS === "ios"
                    ? `ios-chatbubbles${ focused ? "" : "" }`
                    : "md-chatbubbles"
            }
        />
    )
};


LeaderboardStack.navigationOptions = {
    tabBarLabel: "Leaderboard",
    tabBarIcon: ({ focused }: FocusedType): React$Element<any> => (
        <TabBarIcon
            focused={ focused }
            name={
                Platform.OS === "ios"
                    ? `ios-list-circle${ focused ? "" : "" }`
                    : "md-list-circle"
            }
        />
    )
};


TrashTrackerStack.navigationOptions = {
    tabBarLabel: "Trash",
    tabBarIcon: ({ focused }: FocusedType): React$Element<any> => (
        <TabBarIcon
            focused={ focused }
            name={
                Platform.OS === "ios" ? `ios-location${ focused ? "" : "" }` : "md-location"
            }
        />
    )
};

MenuStack.navigationOptions = {
    tabBarLabel: "Menu",
    tabBarIcon: ({ focused }: FocusedType): React$Element<any> => (
        <TabBarIcon
            focused={ focused }
            name={ Platform.OS === "ios" ? "ios-menu" : "md-menu" }
        />
    )
};

export default createBottomTabNavigator({
    HomeStack,
    MessagesStack,
    TrashTrackerStack,
    LeaderboardStack,
    MenuStack
});
