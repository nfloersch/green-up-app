import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TrashTrackerScreen from "../screens/trash-map-screen";
import TrashTrackerModalScreen from "../screens/trash-map-modal-screen";
import BagTaggerScreen from "../screens/trash-map-bag-tagger-screen";

const Stack = createStackNavigator();

export default function TrashTrackerStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: "transparent" },
                cardOverlayEnabled: true,
                presentation: 'modal',
                cardStyleInterpolator: ({ current: { progress } }) => ({
                    cardStyle: {
                        opacity: progress.interpolate({
                            inputRange: [0, 0.5, 0.9, 1],
                            outputRange: [0, 0.25, 0.7, 1]
                        })
                    },
                    overlayStyle: {
                        opacity: progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 0.5],
                            extrapolate: "clamp"
                        })
                    }
                })
            }}
        >
            <Stack.Screen
                name="TrashTracker"
                component={TrashTrackerScreen}
                options={TrashTrackerScreen.navigationOptions}
            />
            <Stack.Screen
                name="TrashTrackerModal"
                component={TrashTrackerModalScreen}
                options={TrashTrackerModalScreen.navigationOptions}
            />
            <Stack.Screen
                name="TrashTaggerModal"
                component={BagTaggerScreen}
                options={BagTaggerScreen.navigationOptions}
            />
        </Stack.Navigator>
    );
}