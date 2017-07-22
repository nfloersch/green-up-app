/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, TextInput, TouchableHighlight, View, ScrollView, Alert} from 'react-native';
import CheckBox from 'react-native-checkbox';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as teamActions from './team-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Contacts } from 'expo';

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





export default class InviteContacts extends Component {
    static propTypes = {
        actions: PropTypes.object,
        teams: PropTypes.array
    };

    static navigationOptions = {
        title: 'Invite Contacts'
    };
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps='never'>
                    <CheckBox
                        label='Contact 1'
                    />
                    <CheckBox
                        label='Contact 2'
                    />
                    <CheckBox
                        label='Contact 3'
                    />
                    <CheckBox
                        label='Contact 4'
                    />
                    <Button
                        onPress={() => { Alert.alert('This will invite your contacts to your group'); }}
                        title='Invite to Group'
                        color='green'
                    />
                </ScrollView>
            </View>
        );
    }
}
