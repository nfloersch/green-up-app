// @flow
//import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./main-tab-navigator";

// export default createAppContainer<any, any>(createSwitchNavigator({
//     Main: MainTabNavigator
// }));

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/*{isLoggedIn ? (*/}
                {/*    <>*/}
                {/*        <Stack.Screen name="Home" component={HomeScreen} />*/}
                {/*        <Stack.Screen name="Settings" component={SettingsScreen} />*/}
                {/*    </>*/}
                {/*) : (*/}
                {/*    <Stack.Screen name="SignIn" component={SignInScreen} />*/}
                {/*)}*/}
                {MainTabNavigator}
            </Stack.Navigator>
        </NavigationContainer>
    );
}