// @flow
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "../screens/home-screen";
import Messages from "../screens/message-summaries-screen";
import FindTeam from "../screens/find-team-screen";
import NewTeam from "../screens/new-team-screen";

const HomeStack = createStackNavigator({
    Home: { screen: HomeScreen },
    Messages: { screen: Messages },
    FindTeam: { screen: FindTeam },
    NewTeam: { screen: NewTeam }
});

export default createAppContainer(HomeStack);
