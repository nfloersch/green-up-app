// @flow

import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import TeamsScreen from '../screens/teams-screen';
import TeamDetailsScreen from '../screens/team-details-screen';
import TeamEditorScreen from '../screens/team-editor-screen';

const TeamsStack = createStackNavigator({
    Teams: {screen: TeamsScreen},
    TeamDetails: {screen: TeamDetailsScreen},
    TeamEditor: {screen: TeamEditorScreen}
});

export default createAppContainer(TeamsStack);

