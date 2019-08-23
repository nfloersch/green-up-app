// @flow
import React from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import AppState from "./components/app-state";
import Session from "./components/session";
import { Ionicons } from "@expo/vector-icons";
import AppNavigator from "./navigation/app-navigator";
import NetworkStatus from "./components/network-status";

type Props = { skipLoadingScreen: boolean };

// Bootstrapping the app
export default class App extends React.Component<Props> {
    state = {
        isLoadingComplete: false
    };

    _loadResourcesAsync = async () => Promise.all([
        Asset.loadAsync([
            require("./assets/images/circle-turquoise.png"),
            require("./assets/images/circle-blue.png"),
            require("./assets/images/circle-red.png"),
            require("./assets/images/circle-yellow.png"),
            require("./assets/images/circle-green.png"),
            require("./assets/images/circle-purple.png"),
            require("./assets/images/circle-orange.png"),
            require("./assets/images/broom.png"),
            require("./assets/images/robot-dev.png"),
            require("./assets/images/robot-prod.png"),
            require("./assets/images/google-logo.jpg"),
            require("./assets/images/facebook-logo.png"),
            require("./assets/images/green-up-logo.png"),
            require("./assets/images/covered-bridge2.jpg"),
            require("./assets/images/teamwork.jpeg")
        ]),
        Font.loadAsync({
            // This is the font that we are using for our tab bar
            ...Ionicons.font,
            "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
        })
    ]);

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error); // eslint-disable-line no-console
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };

    render() {
        const load = (
            <AppLoading
                onError={ this._handleLoadingError }
                onFinish={ this._handleFinishLoading }
                startAsync={ this._loadResourcesAsync }
            />
        );

        const mainApp = (
            <AppState>
                <NetworkStatus/>
                <Session>
                    <AppNavigator/>
                </Session>
            </AppState>
        );

        return (!this.state.isLoadingComplete && !this.props.skipLoadingScreen ? load : mainApp);
    }
}

