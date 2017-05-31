/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */

import React, { Component } from 'react';
// import * as firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/database';
// import 'firebase/storage';
// import 'firebase-messaging';
 // import FireAuth from 'react-native-firebase-auth';
 import {
  Alert,
  AppRegistry,
  Button,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import logo from "./assets/GreenupVermontlogo.png"
// Initialize Firebase
// var config = {
//   apiKey: "AIzaSyAjwSCpOvLPgYcFr26V3gmfwJlGb-VtWAs",
//   authDomain: "greenupvermont-de02b.firebaseapp.com",
//   databaseURL: "https://greenupvermont-de02b.firebaseio.com",
//   projectId: "greenupvermont-de02b",
//   storageBucket: "greenupvermont-de02b.appspot.com",
//   messagingSenderId: "439621369113"
// };
const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};
// var app = firebase.initializeApp(config);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GreenUpVermont', () => GreenUpVermont);
