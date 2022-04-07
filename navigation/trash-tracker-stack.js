// @flow
// import { createStackNavigator, createAppContainer } from "react-navigation";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import TrashTrackerScreen from "../screens/trash-map-screen";
import TrashTrackerModalScreen from "../screens/trash-map-modal-screen";
import BagTaggerScreen from "../screens/trash-map-bag-tagger-screen";

const TrashTrackerStack = createStackNavigator(
    {
        TrashTracker: { screen: TrashTrackerScreen },
        TrashTrackerModal: { screen: TrashTrackerModalScreen },
        TrashTaggerModal: { screen: BagTaggerScreen }
    },
    {
        screenOptions: {
            cardStyle: { backgroundColor: "transparent" },
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({ current: { progress } }) => (
                {
                    cardStyle: {
                        opacity: progress.interpolate(
                            {
                                inputRange: [0, 0.5, 0.9, 1],
                                outputRange: [0, 0.25, 0.7, 1]
                            }
                        )
                    },
                    overlayStyle: {
                        opacity: progress.interpolate(
                            {
                                inputRange: [0, 1],
                                outputRange: [0, 0.5],
                                extrapolate: "clamp"
                            }
                        )
                    }
                }
            )
        },
        mode: "modal"
    }
);


export default createAppContainer<any, any>(TrashTrackerStack);