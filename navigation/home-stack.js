// @flow
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "../screens/home-screen";
import FindTeamScreen from "../screens/find-team-screen";
import NewTeamScreen from "../screens/new-team-screen";
import TrashDisposalScreen from "../screens/trash-disposal-screen";
import FreeSupplies from "../screens/free-supplies-screen";
import CelebrationsScreen from "../screens/celebrations-screen";
import GreenUpFactsScreen from "../screens/green-up-facts-screen";
import TeamDetailsScreen from "../screens/team-details-screen";
import TeamEditorScreen from "../screens/team-editor-screen";
import CelebrationDetailsScreen from "../components/celebration-details";
import RecordTrashScreen from "../screens/record-trash-screen";

const HomeStack = createStackNavigator({
    Home: { screen: HomeScreen },
    FindTeam: { screen: FindTeamScreen },
    TeamDetails: { screen: TeamDetailsScreen },
    NewTeam: { screen: NewTeamScreen },
    TeamEditor: { screen: TeamEditorScreen },
    TrashDisposal: { screen: TrashDisposalScreen },
    FreeSupplies: { screen: FreeSupplies },
    Celebrations: { screen: CelebrationsScreen },
    GreenUpFacts: { screen: GreenUpFactsScreen },
    CelebrationDetails: { screen: CelebrationDetailsScreen },
    RecordTrash: { screen: RecordTrashScreen }
});

export default createAppContainer<any, any>(HomeStack);
