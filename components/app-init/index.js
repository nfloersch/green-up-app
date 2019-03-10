// @flow


import React, {Component, Fragment} from 'react';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import {connect} from 'react-redux';
import {AppLoading, Asset, Font, Icon} from 'expo';


type Props = {
    children: any,
    isLoadingComplete: boolean,
    actions: { handleFinishLoading: () => void, loadingCompleted: () => void },
    skipLoadingScreen: boolean
};

class AppInit extends Component<Props> {
    constructor(props) {
        super(props);
        this._handleFinishLoading = this._handleFinishLoading.bind(this);
        this._handleLoadingError = this._handleLoadingError.bind(this);
    }

    _loadResourcesAsync = async () => Promise.all([
        Asset.loadAsync([
            require('../../assets/images/circle-turquoise.png'),
            require('../../assets/images/circle-blue.png'),
            require('../../assets/images/circle-red.png'),
            require('../../assets/images/circle-yellow.png'),
            require('../../assets/images/circle-green.png'),
            require('../../assets/images/circle-purple.png'),
            require('../../assets/images/circle-orange.png'),
            require('../../assets/images/broom.png'),
            require('../../assets/images/robot-dev.png'),
            require('../../assets/images/robot-prod.png'),
            require('../../assets/images/google-logo.jpg'),
            require('../../assets/images/facebook-logo.png'),
            require('../../assets/images/green-up-logo.png'),
            require('../../assets/images/covered-bridge2.jpg'),
            require('../../assets/images/teamwork.jpeg')
        ]),
        Font.loadAsync({
            //This is the font that we are using for our tab bar
            ...Icon.Ionicons.font,
            // We include SpaceMono because we use it in HomeScreen.js. Feel free
            // to remove this if you are not using it in your app
            'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf')
        })
    ]);

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        // console.warn(error);
        this.props.actions.loadingCompleted(false, error);
    };

    _handleFinishLoading = () => {
        this.props.actions.loadingCompleted();
    };

    render() {
        const {isLoadingComplete, skipLoadingScreen, children} = this.props;

        return (!isLoadingComplete && !skipLoadingScreen)
            ? (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            )
            : (<Fragment>{children}</Fragment>);
    }

}

function mapStateToProps(state) {
    return {
        isLoadingComplete: state.loading.isLoadingComplete,
        skipLoadingScreen: state.loading.skipLoadingScreen,
        isInitialized: state.loading.isInitialized
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppInit);
