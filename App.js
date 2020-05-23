// @flow
import React, { useState } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import AppState from "./components/app-state";
import Session from "./components/session";
import { Ionicons } from "@expo/vector-icons";
import AppNavigator from "./navigation/app-navigator";
import { YellowBox } from "react-native";
// This and the following two lines account for missing base64 support in some versions of Node
import {decode, encode} from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }
// Some versions of Firebase assume access to a Window object that react-native does not have
window.addEventListener = x => x;

// Stop annoying Android users with useless warnings.
YellowBox.ignoreWarnings(["Setting a timer"]);

type PropsType = { skipLoadingScreen: boolean };
// Bootstrapping the app
const App = ({ skipLoadingScreen }: PropsType): React$Element<any> => {

    const [isLoadingComplete, setIsLoadingComplete] = useState(false);

    const loadResourcesAsync = async (): Promise<any> => Promise.all([
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
        Font.loadAsync({
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
        setIsLoadingComplete(true);
    };

    const load = (
        <AppLoading
            onError={ handleLoadingError }
            onFinish={ handleFinishLoading }
            startAsync={ loadResourcesAsync }
        />
    );

    const mainApp = (
        <AppState>
            <Session>
                <AppNavigator/>
            </Session>
        </AppState>
    );

    return (!isLoadingComplete && !skipLoadingScreen ? load : mainApp);

};

export default App;