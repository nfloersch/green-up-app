import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AboutScreen from "../screens/about-screen";
import MenuScreen from "../screens/menu-screen";
import TownsScreen from "../screens/towns-screen";
import ProfileScreen from "../screens/profile-screen";
import LegalScreen from "../screens/legal-screen";

const Stack = createStackNavigator();

export default function MenuStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Menu" component={MenuScreen} options={MenuScreen.navigationOptions} />
            <Stack.Screen name="About" component={AboutScreen} options={AboutScreen.navigationOptions} />
            <Stack.Screen name="Towns" component={TownsScreen} options={TownsScreen.navigationOptions} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={ProfileScreen.navigationOptions} />
            <Stack.Screen name="Legal" component={LegalScreen} options={LegalScreen.navigationOptions} />
        </Stack.Navigator>
    );
}