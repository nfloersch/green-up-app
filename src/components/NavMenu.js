import React from 'react';
import {StyleSheet, ScrollView, Text, Alert} from 'react-native';
import Row from '../components/Row';
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
    constructor(props) {
        super(props);
        this._onPressButton = this._onPressButton.bind(this);
    }
    _onPressButton(action) {
        return () => {
            switch (action) {
                case 'donate':
                    Alert.alert('donate');
                    break;
                case 'messages':
                    Alert.alert('messages');
                    break;
                case 'my-teams':
                    Alert.alert('my-teams');
                    break;
                case 'trash-tracker':
                    Alert.alert('trash-tracker');
                    break;
                case 'all-about-green-up-day':
                    Alert.alert('all-about-green-up-day');
                    break;
                case 'log-out':
                    Alert.alert('log-out');
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
