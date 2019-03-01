import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/';
import thunk from 'redux-thunk';
import Session from './components/session';
import Splash from './components/splash';
import AppInit from './components/app-init';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {AppLoading, Asset, Font, Icon} from 'expo';
import AppNavigator from './navigation/app-navigator';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    statusBarUnderlay: {
        height: 24,
        backgroundColor: 'rgba(0,0,0,0.2)'
    }
});

const store = createStore(reducer, applyMiddleware(thunk));

export default class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <AppInit>
                    <View style={styles.container}>
                        <Session splash={(<Splash message={'Thinking Green Thoughts...'}/>)}>
                            <View style={[styles.container, {padding: 0, margin: 0}]}>
                                <AppNavigator/>
                            </View>
                        </Session>
                    </View>
                </AppInit>
            </Provider>
        );
    }
}

// export default class App extends React.Component {
//     state = {
//         isLoadingComplete: false,
//     };
//
//     render() {
//         if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
//             return (
//                 < AppLoading
//             startAsync = {this._loadResourcesAsync
//         }
//             onError = {this._handleLoadingError
//         }
//             onFinish = {this._handleFinishLoading
//         }
//             />
//         )
//             ;
//         } else {
//             return (
//                 < View
//             style = {styles.container
//         }>
//             {
//                 Platform.OS === 'ios' && < StatusBar
//                 barStyle = "default" / >
//             }
//         <
//             AppNavigator / >
//             < /View>
//         )
//             ;
//         }
//     }
//
//     _loadResourcesAsync = async () => {
//         return Promise.all([
//             Asset.loadAsync([
//                 require('./assets/images/robot-dev.png'),
//                 require('./assets/images/robot-prod.png'),
//             ]),
//             Font.loadAsync({
//                 // This is the font that we are using for our tab bar
//                 ...Icon.Ionicons.font,
//                 // We include SpaceMono because we use it in HomeScreen.js. Feel free
//                 // to remove this if you are not using it in your app
//                 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
//             }),
//         ]);
//     };
//
//     _handleLoadingError = error => {
//         // In this case, you might want to report the error to your error
//         // reporting service, for example Sentry
//         console.warn(error);
//     };
//
//     _handleFinishLoading = () => {
//         this.setState({isLoadingComplete: true});
//     };
// }


