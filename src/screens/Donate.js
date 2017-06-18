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
    TouchableHighlight,
    WebView,
    View
} from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    text: {
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
export default class Donate extends Component {
    static propTypes = {};
    constructor(props) {
        super(props);
        this._myAwesomeMethod = this._myAwesomeMethod.bind(this);
    }
    _myAwesomeMethod() {
        Alert.alert('Huzzah!');
    }
    render() {
        return (<WebView source={{
            uri: 'https://www.razoo.com/story/Greenupvermont'
        }} style={styles.container}/>);
    }
}
