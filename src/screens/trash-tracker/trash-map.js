/**
 /**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-checkbox';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'space-around',
        backgroundColor: 'white',
        borderColor: 'white',
        borderLeftWidth: 20,
        borderRightWidth: 20,
        justifyContent: 'flex-start'
    },
    text: {
        fontSize: 30,
        justifyContent: 'flex-start',
        fontWeight: 'bold',
        margin: 10
    },
    options: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    }
});
export default class TrashMap extends Component {
   
    static propTypes = {
        navigation: PropTypes.object
    };

    constructor(props) {
        super(props);
        this._myAwesomeMethod = this._myAwesomeMethod.bind(this);
    }

    componentDidMount() {}

    _myAwesomeMethod() {
        Alert.alert('Huzzah!');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Trash Map</Text>
            </View>
        );
    }
}
