// @flow
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "../screens/home-screen";
import Messages from "../screens/message-summaries-screen";
import FindTeam from "../screens/find-team-screen";
import NewTeam from "../screens/new-team-screen";
import HandlingTrash from "../screens/handling-trash-screen";
import FreeSupplies from "../screens/free-supplies-screen";
import Celebrations from "../screens/celebrations-screen";
import GreenUpFacts from "../screens/green-up-facts-screen";

const HomeStack = createStackNavigator({
    Home: { screen: HomeScreen },
    Messages: { screen: Messages },
    FindTeam: { screen: FindTeam },
    NewTeam: { screen: NewTeam },
    HandlingTrash: { screen: HandlingTrash },
    FreeSupplies: { screen: FreeSupplies },
    Celebrations:{screen: Celebrations},
    GreenUpFacts:{screen: GreenUpFacts}
});

export default createAppContainer(HomeStack);
