// @flow
<<<<<<< HEAD
=======

>>>>>>> b3a5b2dbdda71d07e93f36f82bde97aebcd9b114
import { createStackNavigator, createAppContainer } from "react-navigation";
import NewMessageScreen from "../screens/new-message-screen";
import MessagesSummariesScreen from "../screens/message-summaries-screen";
import MessageDetailsScreen from "../screens/message-details-screen";

const MessagesStack = createStackNavigator({
    Message: { screen: MessagesSummariesScreen },
    NewMessage: { screen: NewMessageScreen },
    MessageDetails: { screen: MessageDetailsScreen }
});

export default createAppContainer(MessagesStack);

