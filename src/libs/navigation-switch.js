import {Alert} from 'react-native';
export const navMenuLinks = {
    MESSAGE_DETAILS : 'MESSAGE_DETAILS',
    TEAM_SEARCH : 'TEAM_SEARCH',
    INVITE_FORM : 'INVITE_FORM',
    ALL_ABOUT_GREEN_UP_DAY: 'ALL_ABOUT_GREEN_UP_DAY',
    TRASH_TRACKER: 'TRASH_TRACKER',
    MY_TEAMS: 'MY_TEAMS',
    MESSAGES: 'MESSAGES',
    DONATE: 'DONATE',
    LOG_OUT: 'LOG_OUT'
};
export const navButtons = {
    leftButtons: [],
    rightButtons: [
        {
            icon: require('../../img/navicon_menu@2x.png'), // for icon button, provide the local image asset name
            id: 'menu' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        }
    ],
    animated: true
};
export function onNavigatorEvent(navigator) {
    return function(event) {
        if (event.type === 'NavBarButtonPress') { // this is the event type for button presses
            navigator.handleDeepLink({link: 'toggle-menu'});
        }
        if (event.type === 'DeepLink') {
            switch (event.link) {
              case navMenuLinks.TEAM_SEARCH:
                  navigator.resetTo({
                      screen: 'GreenUpVermont.Screens.TeamSearch', // unique ID registered with Navigation.registerScreen
                      title: 'Team Search', // navigation bar title of the pushed screen (optional)
                      // titleImage: undefined, // navigation bar title image instead of the title text of the pushed screen (optional)
                      passProps: {}, // Object that will be passed as props to the pushed screen (optional)
                      animated: true, // does the push have transition animation or does it happen immediately (optional)
                      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
                      // backButtonTitle: undefined, // override the back button title (optional)
                      backButtonHidden: false, // hide the back button altogether (optional)
                      navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
                      navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                  });
                  break;
              case navMenuLinks.MESSAGE_DETAILS:
                  navigator.resetTo({
                      screen: 'GreenUpVermont.Screens.MessageDetails', // unique ID registered with Navigation.registerScreen
                      title: 'Message Details', // navigation bar title of the pushed screen (optional)
                      // titleImage: undefined, // navigation bar title image instead of the title text of the pushed screen (optional)
                      passProps: {}, // Object that will be passed as props to the pushed screen (optional)
                      animated: true, // does the push have transition animation or does it happen immediately (optional)
                      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
                      // backButtonTitle: undefined, // override the back button title (optional)
                      backButtonHidden: false, // hide the back button altogether (optional)
                      navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
                      navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                  });
                  break;
                  case navMenuLinks.INVITE_FORM:
                      navigator.resetTo({
                          screen: 'GreenUpVermont.Screens.InviteForm', // unique ID registered with Navigation.registerScreen
                          title: 'Invite Form', // navigation bar title of the pushed screen (optional)
                          // titleImage: undefined, // navigation bar title image instead of the title text of the pushed screen (optional)
                          passProps: {}, // Object that will be passed as props to the pushed screen (optional)
                          animated: true, // does the push have transition animation or does it happen immediately (optional)
                          animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
                          // backButtonTitle: undefined, // override the back button title (optional)
                          backButtonHidden: false, // hide the back button altogether (optional)
                          navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
                          navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                      });
                      break;
                case navMenuLinks.DONATE:
                    navigator.resetTo({
                        screen: 'GreenUpVermont.Screens.Donate', // unique ID registered with Navigation.registerScreen
                        title: 'Donate', // navigation bar title of the pushed screen (optional)
                        // titleImage: undefined, // navigation bar title image instead of the title text of the pushed screen (optional)
                        passProps: {}, // Object that will be passed as props to the pushed screen (optional)
                        animated: true, // does the push have transition animation or does it happen immediately (optional)
                        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
                        // backButtonTitle: undefined, // override the back button title (optional)
                        backButtonHidden: false, // hide the back button altogether (optional)
                        navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
                        navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                    });
                    break;
                case navMenuLinks.MESSAGES:
                    navigator.resetTo({
                        screen: 'GreenUpVermont.Screens.Messages', // unique ID registered with Navigation.registerScreen
                        title: 'Messages', // navigation bar title of the pushed screen (optional)
                        // titleImage: undefined, // navigation bar title image instead of the title text of the pushed screen (optional)
                        passProps: {}, // Object that will be passed as props to the pushed screen (optional)
                        animated: true, // does the push have transition animation or does it happen immediately (optional)
                        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
                        // backButtonTitle: undefined, // override the back button title (optional)
                        backButtonHidden: false, // hide the back button altogether (optional)
                        navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
                        navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                    });
                    break;
                case navMenuLinks.MY_TEAMS:
                    navigator.resetTo({
                        screen: 'GreenUpVermont.Screens.MyTeams', // unique ID registered with Navigation.registerScreen
                        title: 'My Teams', // navigation bar title of the pushed screen (optional)
                        // titleImage: undefined, // navigation bar title image instead of the title text of the pushed screen (optional)
                        passProps: {}, // Object that will be passed as props to the pushed screen (optional)
                        animated: true, // does the push have transition animation or does it happen immediately (optional)
                        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
                        // backButtonTitle: undefined, // override the back button title (optional)
                        backButtonHidden: false, // hide the back button altogether (optional)
                        navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
                        navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                    });
                    break;
                case navMenuLinks.TRASH_TRACKER:
                    navigator.resetTo({
                        screen: 'GreenUpVermont.Screens.TrashTracker', // unique ID registered with Navigation.registerScreen
                        title: 'Trash Tracker', // navigation bar title of the pushed screen (optional)
                        // titleImage: undefined, // navigation bar title image instead of the title text of the pushed screen (optional)
                        passProps: {}, // Object that will be passed as props to the pushed screen (optional)
                        animated: true, // does the push have transition animation or does it happen immediately (optional)
                        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
                        // backButtonTitle: undefined, // override the back button title (optional)
                        backButtonHidden: false, // hide the back button altogether (optional)
                        navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
                        navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                    });
                    break;
                case navMenuLinks.ALL_ABOUT_GREEN_UP_DAY:
                    navigator.resetTo({
                        screen: 'GreenUpVermont.Screens.AllAboutGreenUpDay', // unique ID registered with Navigation.registerScreen
                        title: 'About Green Up Day', // navigation bar title of the pushed screen (optional)
                        // titleImage: undefined, // navigation bar title image instead of the title text of the pushed screen (optional)
                        passProps: {}, // Object that will be passed as props to the pushed screen (optional)
                        animated: true, // does the push have transition animation or does it happen immediately (optional)
                        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
                        // backButtonTitle: undefined, // override the back button title (optional)
                        backButtonHidden: false, // hide the back button altogether (optional)
                        navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
                        navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                    });
                    break;
                case navMenuLinks.LOG_OUT:
                    navigator.resetTo({
                        screen: 'GreenUpVermont.Screens.Welcome', // unique ID registered with Navigation.registerScreen
                        title: 'Welcome', // navigation bar title of the pushed screen (optional)
                        // titleImage: undefined, // navigation bar title image instead of the title text of the pushed screen (optional)
                        passProps: {}, // Object that will be passed as props to the pushed screen (optional)
                        animated: true, // does the push have transition animation or does it happen immediately (optional)
                        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
                        // backButtonTitle: undefined, // override the back button title (optional)
                        backButtonHidden: false, // hide the back button altogether (optional)
                        navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
                        navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
                    });
                    break;
                default:
                    break;
            }
        }
    };
}
