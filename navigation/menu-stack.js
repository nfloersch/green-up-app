// @flow
// import { createStackNavigator, createAppContainer } from "react-navigation";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AboutScreen from "../screens/about-screen";
import MenuScreen from "../screens/menu-screen";
import TownsScreen from "../screens/towns-screen";
import ProfileScreen from "../screens/profile-screen";
import LegalScreen from "../screens/legal-screen";

// $FlowFixMe
const MenuStack = createStackNavigator({
    Menu: { screen: MenuScreen },
    About: { screen: AboutScreen },
    Towns: { screen: TownsScreen },
    Profile: { screen: ProfileScreen },
    Legal: { screen: LegalScreen }
});

export default createAppContainer<any, any>(MenuStack);

