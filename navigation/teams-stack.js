// @flow
import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import TeamsScreen from "../screens/teams-screen";
import TeamDetailsScreen from "../screens/team-details-screen";
import TeamEditorScreen from "../screens/team-editor-screen";
import TeamMemberDetails from "../screens/team-member-details";

const TeamsStack = createStackNavigator({
    Teams: { screen: TeamsScreen },
    TeamDetails: { screen: TeamDetailsScreen },
    TeamEditor: { screen: TeamEditorScreen },
    TeamMemberDetails: { screen: TeamMemberDetails }
});

export default createAppContainer(TeamsStack);

