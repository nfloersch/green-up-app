// @flow
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "../screens/home-screen";
import FindTeam from "../screens/find-team-screen";
import NewTeam from "../screens/new-team-screen";
import TrashDisposalScreen from "../screens/trash-disposal-screen";
import FreeSupplies from "../screens/free-supplies-screen";
import Celebrations from "../screens/celebrations-screen";
import GreenUpFacts from "../screens/green-up-facts-screen";
import TeamDetails from "../screens/team-details-screen";
import TeamEditorScreen from "../screens/team-editor-screen";
import CelebrationDetailsScreen from "../components/celebration-details";
import RecordTrashScreen from "../screens/record-trash-screen";

const HomeStack = createStackNavigator({
    Home: { screen: HomeScreen },
    FindTeam: { screen: FindTeam },
    TeamDetails: { screen: TeamDetails },
    NewTeam: { screen: NewTeam },
    TeamEditor: { screen: TeamEditorScreen },
    TrashDisposal: { screen: TrashDisposalScreen },
    FreeSupplies: { screen: FreeSupplies },
    Celebrations: { screen: Celebrations },
    GreenUpFacts: { screen: GreenUpFacts },
    CelebrationDetails: { screen: CelebrationDetailsScreen },
    RecordTrash: { screen: RecordTrashScreen }
});

export default createAppContainer<any, any>(HomeStack);
