/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as teamActions from './team-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {MapView} from 'expo';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%'
    },
    teams: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});
export default class TeamEditorMap extends Component {
    static propTypes = {
        actions: PropTypes.object,
        teams: PropTypes.array
    };

    static navigationOptions = {
        title: 'Team Map',
        tabBarLabel: 'Map',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: () => (<MaterialCommunityIcons name='map-marker' size={24} color='blue'/>)
    };
    constructor(props) {
        super(props);
    }

    render() {
        return (<MapView style={{
            flex: 1
        }} initialRegion={{
            latitude: 44.4785386,
            longitude: -73.2126569,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }}/>);
    }
}
