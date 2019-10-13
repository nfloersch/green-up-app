// @flow
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "../screens/home-screen";


const HomeStack = createStackNavigator({
    Home: { screen: HomeScreen }
});

export default createAppContainer(HomeStack);
