/* eslint-disable react/prop-types */
// @flow
import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStack from "./home-stack";
import MessagesStack from "./messages-stack";
import LeaderboardStack from "./leaderboard-stack";
import TrashTrackerStack from "./trash-tracker-stack";
import MenuStack from "./menu-stack";

import TabBarIcon from "../components/tab-bar-icon";

const BottomTabs = createBottomTabNavigator();

export default function MainTabNavigator() {
    return (
        <BottomTabs.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <BottomTabs.Screen
                name="_Home"
                component={HomeStack}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name={Platform.OS === "ios" ? "ios-home" : "md-home"} />
                    )
                }}
            />
            <BottomTabs.Screen
                name="_Messages"
                component={MessagesStack}
                options={{
                    tabBarLabel: "Messages",
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                            focused={focused}
                            name={Platform.OS === "ios" ? "ios-chatbubbles" : "md-chatbubbles"}
                        />
                    )
                }}
            />
            <BottomTabs.Screen
                name="Leaderboard"
                component={LeaderboardStack}
                options={{
                    tabBarLabel: "Leaderboard",
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name={Platform.OS === "ios" ? "ios-list" : "md-list"} />
                    )
                }}
            />
            <BottomTabs.Screen
                name="Trash"
                component={TrashTrackerStack}
                options={{
                    tabBarLabel: "Trash",
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name={Platform.OS === "ios" ? "ios-pin" : "md-pin"} />
                    )
                }}
            />
            <BottomTabs.Screen
                name="_Menu"
                component={MenuStack}
                options={{
                    tabBarLabel: "Menu",
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name={Platform.OS === "ios" ? "ios-menu" : "md-menu"} />
                    )
                }}
            />
        </BottomTabs.Navigator>
    );
}