// @flow
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "../screens/home-screen";
import FindTeam from "../screens/find-team-screen";
import NewTeam from "../screens/new-team-screen";
import HandlingTrash from "../screens/handling-trash-screen";
import FreeSupplies from "../screens/free-supplies-screen";
import Celebrations from "../screens/celebrations-screen";
import GreenUpFacts from "../screens/green-up-facts-screen";
import TeamDetails from "../screens/team-details-screen";
import TeamEditorScreen from "../screens/team-editor-screen";
import CelebrationDetailsScreen from "../components/celebration-details";

const HomeStack = createStackNavigator({
    Home: { screen: HomeScreen },
    FindTeam: { screen: FindTeam },
    TeamDetails: { screen: TeamDetails },
    NewTeam: { screen: NewTeam },
    TeamEditor: { screen: TeamEditorScreen },
    HandlingTrash: { screen: HandlingTrash },
    FreeSupplies: { screen: FreeSupplies },
    Celebrations: { screen: Celebrations },
    GreenUpFacts: { screen: GreenUpFacts },
    CelebrationDetails: { screen: CelebrationDetailsScreen }
});

export default createAppContainer<any, any>(HomeStack);
