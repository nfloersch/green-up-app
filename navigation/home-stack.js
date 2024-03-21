import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/home-screen";
import FindTeamScreen from "../screens/find-team-screen";
import NewTeamScreen from "../screens/new-team-screen";
import TrashDisposalScreen from "../screens/trash-disposal-screen";
import FreeSuppliesScreen from "../screens/free-supplies-screen";
import CelebrationsScreen from "../screens/celebrations-screen";
import GreenUpFactsScreen from "../screens/green-up-facts-screen";
import TeamDetailsScreen from "../screens/team-details-screen";
import TeamEditorScreen from "../screens/team-editor-screen";
import CelebrationDetailsScreen from "../components/celebration-details";
import RecordTrashScreen from "../screens/record-trash-screen";

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={HomeScreen.navigationOptions} />
            <Stack.Screen name="FindTeam" component={FindTeamScreen} options={FindTeamScreen.navigationOptions} />
            <Stack.Screen
                name="TeamDetails"
                component={TeamDetailsScreen}
                options={TeamDetailsScreen.navigationOptions}
            />
            <Stack.Screen name="NewTeam" component={NewTeamScreen} options={NewTeamScreen.navigationOptions} />
            <Stack.Screen name="TeamEditor" component={TeamEditorScreen} options={TeamEditorScreen.navigationOptions} />
            <Stack.Screen
                name="TrashDisposal"
                component={TrashDisposalScreen}
                options={TrashDisposalScreen.navigationOptions}
            />
            <Stack.Screen
                name="FreeSupplies"
                component={FreeSuppliesScreen}
                options={FreeSuppliesScreen.navigationOptions}
            />
            <Stack.Screen
                name="Celebrations"
                component={CelebrationsScreen}
                options={CelebrationsScreen.navigationOptions}
            />
            <Stack.Screen
                name="GreenUpFacts"
                component={GreenUpFactsScreen}
                options={GreenUpFactsScreen.navigationOptions}
            />
            <Stack.Screen
                name="CelebrationDetails"
                component={CelebrationDetailsScreen}
                options={CelebrationDetailsScreen.navigationOptions}
            />
            <Stack.Screen
                name="RecordTrash"
                component={RecordTrashScreen}
                options={RecordTrashScreen.navigationOptions}
            />
        </Stack.Navigator>
    );
}