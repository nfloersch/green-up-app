// @flow
import { createStackNavigator, createAppContainer } from "react-navigation";
import TrashTrackerScreen from "../screens/trash-map-screen";

const TrashTrackerStack = createStackNavigator({
    TrashTracker: { screen: TrashTrackerScreen }
});

export default createAppContainer<any, any>(TrashTrackerStack);