/**
 /**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, TouchableHighlight, StyleSheet, Text, View} from 'react-native';

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
    static navigationOptions = {
        title: 'Trash Tracker'
    };
    constructor(props) {
        super(props);
        this._goToTrashDrop = this
            ._goToTrashDrop
            .bind(this);
    }

    componentDidMount() {}

    _goToTrashDrop() {
        this
            .props
            .navigation
            .navigate('TrashDrop');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Trash Map</Text>
                <TouchableHighlight onPress={this._goToTrashDrop}>
                    <View>
                        <Text style={styles.text}>Drop Trash</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}
