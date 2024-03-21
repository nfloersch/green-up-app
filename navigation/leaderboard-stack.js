import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LeaderboardScreen from "../screens/leaderboard-screen";

const Stack = createStackNavigator();

export default function LeaderboardStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LeaderBoard"
                component={LeaderboardScreen}
                options={LeaderboardScreen.navigationOptions}
            />
        </Stack.Navigator>
    );
}