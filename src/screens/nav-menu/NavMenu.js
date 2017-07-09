import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, ScrollView} from 'react-native';
import Row from '../../components/Row';
import {navMenuLinks} from '../../libs/navigation-switch';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
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
        this.myNavigator = this.props.navigator;
        this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
    }
    _onPressButton(action) {
        return () => {
            this.props.navigator.toggleDrawer({
                side: 'right', // the side of the drawer since you can have two, 'left' / 'right'
                animated: true, // does the toggle have transition animation or does it happen immediately (optional)
                to: 'closed' // optional, 'open' = ope the drawer, 'closed' = close it, missing = the opposite of current state
            });
            this.props.navigator.handleDeepLink({link: action});
        };
    }
    _onNavigatorEvent(event) {
        if (event.type === 'DeepLink' && event.link === 'toggle-menu') {
            this.myNavigator.toggleDrawer({
                side: 'right', // the side of the drawer since you can have two, 'left' / 'right'
                animated: true // does the toggle have transition animation or does it happen immediately (optional)
            });
        }
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <Row onPress={this._onPressButton(navMenuLinks.INVITE_FORM)} title='Invite Form'/>
                <Row onPress={this._onPressButton(navMenuLinks.TEAM_SEARCH)} title='Team Search'/>
                <Row onPress={this._onPressButton(navMenuLinks.MESSAGE_DETAILS)} title='Message Details'/>
                <Row onPress={this._onPressButton(navMenuLinks.MESSAGES)} title='Messages'/>
                <Row onPress={this._onPressButton(navMenuLinks.MY_TEAMS)} title='My Teams'/>
                <Row onPress={this._onPressButton(navMenuLinks.DONATE)} title='Donate'/>
                <Row onPress={this._onPressButton(navMenuLinks.MESSAGES)} title='Messages'/>
                <Row onPress={this._onPressButton(navMenuLinks.MY_TEAMS)} title='My Teams'/>
                <Row onPress={this._onPressButton(navMenuLinks.TRASH_TRACKER)} title='Trash Tracker'/>
                <Row onPress={this._onPressButton(navMenuLinks.ALL_ABOUT_GREEN_UP_DAY)} title='About Green Up Day'/>
                <Row onPress={this._onPressButton(navMenuLinks.LOG_OUT)} title='Log Out'/>
            </ScrollView>
        );
    }
}
export default NavMenu;
