// @flow
// import { createStackNavigator, createAppContainer } from "react-navigation";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LeaderboardScreen from "../screens/leaderboard-screen";

const LeaderboardStack = createStackNavigator({
    LeaderBoard: { screen: LeaderboardScreen }
});

export default createAppContainer<any, any>(LeaderboardStack);
