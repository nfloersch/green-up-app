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
class TeamDetails extends Component {
    static propTypes = {
        actions: PropTypes.object,
        selectedTeam: PropTypes.object
    };

    static navigationOptions = {
        title: 'Team Details'
    };
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.teams}>{this.props.selectedTeam.name}</Text>
                <Text>{'Where: somewhere out there'}</Text>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {selectedTeam: state.teamReducers.selectedTeam};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(teamActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetails);
