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
        width: '100%',
        padding: 10
    },
    teams: {
        fontSize: 40,
        fontWeight: '40',
        textAlign: 'center'
    },
    info: {
        flexDirection: 'row',
        width: '100%',
        marginLeft: '15%',
        marginRight: '15%',
        justifyContent: 'space-between',
        margin: 10
    },
    textInfo: {
        fontSize: 20,
        marginRight: 20
    },
    boldInfo: {
        fontSize: 20,
        fontWeight: '30'
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
                <View style={styles.info}>
                    <Text style={styles.textInfo}>{'Where:'}</Text>
                    <Text style={styles.boldInfo}>{'Some place in Vermont'}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.textInfo}>{'Start:'}</Text>
                    <Text style={styles.boldInfo}>{'May 4 12:00 am'}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.textInfo}>{'Ends:'}</Text>
                    <Text style={styles.boldInfo}>{'May 5 3:00 pm'}</Text>
                </View>
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
