/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import {
    Alert,
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
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
export default class MyTeams extends Component {
    constructor(props) {
        super(props);
        this._myAwesomeMethod = this._myAwesomeMethod.bind(this);
    }
    _myAwesomeMethod() {
        Alert.alert('Huzzah!');
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this._myAwesomeMethod} underlayColor={'rgba(0, 0, 0, 0.054)'}>
                    <Text style={styles.text}>
                        My Teams
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}
