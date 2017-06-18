import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, ScrollView, Text, Alert} from 'react-native';
import Row from '../../components/Row';
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        height: 48,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)'
    },
    text: {
        fontSize: 16
    }
});
class NavMenu extends React.Component {
    static propTypes = {
        navigator: PropTypes.object
    }
    constructor(props) {
        super(props);
        this._onPressButton = this._onPressButton.bind(this);
    }
    _onPressButton(action) {
        var navigator = this.props.navigator;
        return () => {
            navigator.toggleDrawer({
                side: 'right', // the side of the drawer since you can have two, 'left' / 'right'
                animated: true, // does the toggle have transition animation or does it happen immediately (optional)
                to: 'closed' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
            });
            switch (action) {
                case 'donate':
                    navigator.push({
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
                case 'messages':
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
                case 'my-teams':
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
                case 'trash-tracker':
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
                case 'all-about-green-up-day':
                    navigator.resetTo({
                        screen: 'GreenUpVermont.Screens.AllAboutGreenUpDay', // unique ID registered with Navigation.registerScreen
                        title: 'All About Green Up Day', // navigation bar title of the pushed screen (optional)
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
                case 'log-out':
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
        };
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <Row onPress={this._onPressButton('donate')} title='Donate'/>
                <Row onPress={this._onPressButton('messages')} title='Messages'/>
                <Row onPress={this._onPressButton('my-teams')} title='My Teams'/>
                <Row onPress={this._onPressButton('trash-tracker')} title='Trash Tracker'/>
                <Row onPress={this._onPressButton('all-about-green-up-day')} title='All About Green Up Day'/>
                <Row onPress={this._onPressButton('log-out')} title='Log Out'/>
            </ScrollView>
        );
    }
}
export default NavMenu;
