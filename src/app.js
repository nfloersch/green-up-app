import {Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import registerScreens from './screens';
// screen related book keeping
registerScreens();
const tabs = [
    {
        label: 'Navigation',
        screen: 'GreenUpVermont.Types',
        icon: require('../img/list.png'),
        title: 'Navigation Types'
    }, {
        label: 'Actions',
        screen: 'GreenUpVermont.Actions',
        icon: require('../img/swap.png'),
        title: 'Navigation Actions'
    }
];
if (Platform.OS === 'android') {
    tabs.push({label: 'Transitions', screen: 'GreenUpVermont.Transitions', icon: require('../img/transform.png'), title: 'Navigation Transitions'});
}
// this will start our app
// Navigation.startTabBasedApp({
//     tabs,
//     tabsStyle: {
//         tabBarBackgroundColor: '#003a66',
//         navBarButtonColor: '#ffffff',
//         tabBarButtonColor: '#ffffff',
//         navBarTextColor: '#ffffff',
//         tabBarSelectedButtonColor: '#ff505c',
//         navigationBarColor: '#003a66',
//         navBarBackgroundColor: '#003a66',
//         statusBarColor: '#002b4c',
//         tabFontFamily: 'BioRhyme-Bold'
//     },
//     appStyle: {
//         tabBarBackgroundColor: '#003a66',
//         navBarButtonColor: '#ffffff',
//         tabBarButtonColor: '#ffffff',
//         navBarTextColor: '#ffffff',
//         tabBarSelectedButtonColor: '#ff505c',
//         navigationBarColor: '#003a66',
//         navBarBackgroundColor: '#003a66',
//         statusBarColor: '#002b4c',
//         tabFontFamily: 'BioRhyme-Bold'
//     },
//     drawer: {
//         left: {
//             screen: 'GreenUpVermont.Types.Drawer'
//         }
//     }
// });
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
