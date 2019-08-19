// @flow
<<<<<<< HEAD
=======

>>>>>>> b3a5b2dbdda71d07e93f36f82bde97aebcd9b114
import { createStackNavigator, createAppContainer } from "react-navigation";
import AboutScreen from "../screens/about-screen";
import MenuScreen from "../screens/menu-screen";
import TownsScreen from "../screens/towns-screen";
import ProfileScreen from "../screens/profile-screen";
import LegalScreen from "../screens/legal-screen";

const MenuStack = createStackNavigator({
    Menu: { screen: MenuScreen },
    About: { screen: AboutScreen },
    Towns: { screen: TownsScreen },
    Profile: { screen: ProfileScreen },
    Legal: { screen: LegalScreen }

});

export default createAppContainer(MenuStack);

