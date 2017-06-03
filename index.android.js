/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */

import React, {Component} from 'react';
import {
    Alert,
    AppRegistry,
    Button,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';

import logo from './assets/GreenupVermontlogo.png';

const onButtonPress = () => {
    Alert.alert('Button has been pressed!');
};

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
    },
});

export default class GreenUpVermont extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={logo} />
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
                <Button
                    onPress={onButtonPress}
                    title="Login with Google"
                    accessibilityLabel="Login With Google"
                />
            </View>
        );
    }
}



AppRegistry.registerComponent('GreenUpVermont', () => GreenUpVermont);
