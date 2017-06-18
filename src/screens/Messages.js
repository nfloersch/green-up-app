/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Button,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {onNavigatorEvent, navButtons} from '../libs/navigation-switch';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});
export default class Messages extends Component {
    static navigatorButtons = navButtons;
    static navigatorStyle = {
        navBarRightButtonFontSize: 17, // Change font size of right nav bar button
        navBarRightButtonColor: 'blue', // Change color of right nav bar button
        navBarRightButtonFontWeight: '600', // Change font weight of right nav bar button
    };
    static propTypes = {
        navigator: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.toMessageDetail = this.toMessageDetail.bind(this);
        this.props.navigator.setOnNavigatorEvent(onNavigatorEvent(this.props.navigator).bind(this));
    }
    toMessageDetail() {}
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={this.toMessageDetail}>
                    Messages
                </Text>
            </View>
        );
    }
}
