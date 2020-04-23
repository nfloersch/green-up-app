// @flow
import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import { TabBarIcon } from "../components/tab-bar-icon/tab-bar-icon";
import MessagesIconWithBadge from "../components/tab-bar-icon/messages-icon-with-badge";
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
    tabBarIcon: (args): React$Element<any> => (
        <MessagesIconWithBadge
            focused={ args.focused }
            name={
                Platform.OS === "ios"
                    ? `ios-chatbubbles${ args.focused ? "" : "" }`
                    : "md-chatbubbles"
            }
        />
    )
};


/** * Messages ***/
LeaderboardStack.navigationOptions = {
    tabBarLabel: "Leaderboard",
    tabBarIcon: ({ focused }: FocusedType): React$Element<any> => (
        <TabBarIcon
            focused={ focused }
            name={
                Platform.OS === "ios"
                    ? `ios-list-box${ focused ? "" : "" }`
                    : "md-list-box"
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
                Platform.OS === "ios" ? `ios-pin${ focused ? "" : "" }` : "md-pin"
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
