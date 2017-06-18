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
import logo from '../../assets/GreenupVermontlogo.png';
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
export default class Welcome extends Component {
    static propTypes = {
        navigator: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
    }
    onButtonPress() {
        this.props.navigator.resetTo({
            screen: 'GreenUpVermont.Messages', // unique ID registered with Navigation.registerScreen
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
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={logo}/>
                <Text style={styles.welcome}>
                    Welcome to the Green Up Vermont App!
                </Text>
                <Text style={styles.instructions}>
                    Congratulations you got this app running!
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
                <Button onPress={this.onButtonPress} title="Login with Google" accessibilityLabel="Login With Google"/>
            </View>
        );
    }
}
