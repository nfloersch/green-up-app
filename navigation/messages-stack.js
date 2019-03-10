// @flow

import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import NewMessageScreen from '../screens/new-message-screen';
import MessagesSummariesScreen from '../screens/message-summaries-screen';
import MessageDetailsScreen from '../screens/message-details-screen';


const MessagesStack = createStackNavigator({
    Message: {screen: MessagesSummariesScreen},
    NewMessage: {screen: NewMessageScreen},
    MessageDetails: {screen: MessageDetailsScreen}
});

export default createAppContainer(MessagesStack);

