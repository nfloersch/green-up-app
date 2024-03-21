import React from "react";
import * as SplashScreen from "expo-splash-screen";

export default class AppLoading extends React.Component {
    static defaultProps = {
        autoHideSplash: true
    };

    constructor(props) {
        super(props);
        SplashScreen.preventAutoHideAsync();
    }

    componentWillUnmount() {
        // eslint-disable-next-line react/prop-types
        if (this.props.autoHideSplash === false) {
            return;
        }
        // @ts-ignore
        if (global.__E2E__) {
            // Hide immediately in E2E tests
            SplashScreen.hideAsync();
        } else {
            setTimeout(SplashScreen.hideAsync, 200);
        }
    }

    render() {
        return null;
    }
}