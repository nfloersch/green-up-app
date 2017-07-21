/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as teamActions from './team-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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
    },
    column: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#678',
        padding: 3,
        width: '100%'
    }
});
export default class TeamSearch extends Component {
    static propTypes = {
        actions: PropTypes.object,
        teams: PropTypes.array
    };

    static navigationOptions = {
        title: 'Find a Team'
    };
    constructor(props) {
        super(props);
    }

    render() {
        var myResults = (this.props.teams || []).map(team => (
            <TouchableHighlight style={styles.column} >
                <Text style={styles.teams}>{'Team 1'}</Text>
            </TouchableHighlight>
        ));

        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TextInput keyBoardType={'default'}
                        placeholder={'search teams'}
                        style={{width: '83%'}}
                    />
                    <Button title={'search'} />
                </View>
                <ScrollView style={{width: '100%'}}>
                    {myResults}
                </ScrollView>
            </View>
        );
    }
}
