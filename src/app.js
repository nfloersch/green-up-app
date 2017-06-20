import React from 'react'; // eslint-disable-line
import {Provider} from 'react-redux';
import {Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import registerScreens from './screens';
import configureStore from './store/configureStore';
const store = configureStore();
// screen related book keeping
registerScreens();
const navigatorStyle = {
    statusBarColor: 'black',
    statusBarTextColorScheme: 'light',
    navigationBarColor: 'black',
    navBarBackgroundColor: '#0a0a0a',
    navBarTextColor: 'white',
    navBarButtonColor: 'white',
    tabBarButtonColor: 'red',
    tabBarSelectedButtonColor: 'red',
    tabBarBackgroundColor: 'white',
    topBarElevationShadowEnabled: false,
    navBarHideOnScroll: true,
    tabBarHidden: true,
    drawUnderTabBar: true
};
Navigation.startSingleScreenApp({
    screen: {
        screen: 'GreenUpVermont.Screens.Welcome', // unique ID registered with Navigation.registerScreen
        title: 'Green Up Vermont', // title of the screen as appears in the nav bar (optional)
        navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
    },
    drawer: { // optional, add this if you want a side menu drawer in your app
        right: { // optional, define if you want a drawer from the left
            screen: 'GreenUpVermont.Types.NavMenu', // unique ID registered with Navigation.registerScreen
            passProps: {} // simple serializable object that will pass as props to all top screens (optional)
        },
        disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
    },
    passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
    animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});
