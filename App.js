// @flow
import React, { useState } from "react";
import { Asset } from "expo-asset";
import { loadAsync } from "expo-font";
import AppLoading from "./components/app-loading";
import AppState from "./components/app-state";
import Session from "./components/session";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import initSentry from "./clients/sentry";
import 'expo-dev-client';

// This and the following two lines account for missing base64 support in some versions of Node
import { decode, encode } from "base-64";
import MainTabNavigator from "./navigation/main-tab-navigator";
if (!global.btoa) {
    global.btoa = encode;
}
if (!global.atob) {
    global.atob = decode;
}
// Some versions of Firebase assume access to a Window object that react-native does not have
window.addEventListener = x => x;

// Stop annoying Android users with useless warnings.
// LogBox.ignoreLogs(["Setting a timer for a long period of time", "getNode", "old version of react-navigation library"]);
// LogBox.ignoreAllLogs();

type PropsType = { skipLoadingScreen: boolean };
// Bootstrapping the app
const App = ({ skipLoadingScreen }: PropsType): React$Element<any> => {
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);

    const loadResourcesAsync = async (): Promise<any> =>
        Promise.all([
            Asset.loadAsync([
                require("./assets/images/circle-turquoise.png"),
                require("./assets/images/circle-blue.png"),
                require("./assets/images/circle-red.png"),
                require("./assets/images/circle-yellow.png"),
                require("./assets/images/circle-green.png"),
                require("./assets/images/circle-purple.png"),
                require("./assets/images/circle-orange.png"),
                require("./assets/images/green-up-logo.png")
            ]),
            loadAsync({
                // This is the font that we are using for our tab bar
                ...Ionicons.font,
                "Rubik-Regular": require("./assets/fonts/Rubik/Rubik-Regular.ttf"),
                "Rubik-Medium": require("./assets/fonts/Rubik/Rubik-Medium.ttf"),
                "Rubik-MediumItalic": require("./assets/fonts/Rubik/Rubik-MediumItalic.ttf"),
                "Rubik-Bold": require("./assets/fonts/Rubik/Rubik-Bold.ttf"),
                "Rubik-BoldItalic": require("./assets/fonts/Rubik/Rubik-BoldItalic.ttf"),
                "Rubik-Black": require("./assets/fonts/Rubik/Rubik-Black.ttf"),
                "Rubik-BlackItalic": require("./assets/fonts/Rubik/Rubik-BlackItalic.ttf"),
                "Rubik-Light": require("./assets/fonts/Rubik/Rubik-Light.ttf"),
                "Rubik-LightItalic": require("./assets/fonts/Rubik/Rubik-LightItalic.ttf"),
                "rubicon-icon-font": require("./assets/fonts/Rubik/rubicon-icon-font.ttf")
            })
        ]);

    const handleLoadingError = (error: Error) => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error); // eslint-disable-line no-console
    };

    const handleFinishLoading = () => {
        // This pause lets a user see the loading screen longer,
        // which is good because it has a winning poster picture on it.
        // The pause is long enough that people can see the poster,
        // and short enough it shouldn't bother anyone.
        setTimeout(() => {
            setIsLoadingComplete(true);
        }, 4000);
    };

    const load = (
        <AppLoading onError={handleLoadingError} onFinish={handleFinishLoading} startAsync={loadResourcesAsync} />
    );

    initSentry();

    const mainApp = (
        <AppState>
            <NavigationContainer>
                <Session>
                    <MainTabNavigator />
                </Session>
            </NavigationContainer>
        </AppState>
    );

    return !isLoadingComplete && !skipLoadingScreen ? load : mainApp;
};

export default App;