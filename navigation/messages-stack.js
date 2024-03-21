import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MessageSummariesScreen from "../screens/message-summaries-screen";
import NewMessageScreen from "../screens/new-message-screen";
import MessageDetailsScreen from "../screens/message-details-screen";

const Stack = createStackNavigator();

export default function MessagesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Messages"
                component={MessageSummariesScreen}
                options={MessageSummariesScreen.navigationOptions}
            />
            <Stack.Screen name="NewMessage" component={NewMessageScreen} options={NewMessageScreen.navigationOptions} />
            <Stack.Screen
                name="MessageDetails"
                component={MessageDetailsScreen}
                options={MessageDetailsScreen.navigationOptions}
            />
        </Stack.Navigator>
    );
}