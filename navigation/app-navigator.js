// @flow
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./main-tab-navigator";

export default createAppContainer<any, any>(createSwitchNavigator({
    Main: MainTabNavigator
}));
