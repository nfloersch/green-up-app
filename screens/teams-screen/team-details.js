/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, ScrollView, View} from 'react-native';
import * as actions from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        width: '100%',
        height: '100%',
        padding: 10
    },
    teams: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    info: {
        width: '100%',
        marginLeft: '15%',
        marginRight: '15%',
        margin: 10
    },
    textInfo: {
        fontSize: 20,
        marginRight: 20
    },
    boldInfo: {
        fontSize: 20,
        fontWeight: 'normal'
    },
    details: {
        borderWidth: 2,
        borderColor: '#678',
        padding: 5
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
        const {selectedTeam} = this.props;
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.teams}>{selectedTeam.name}</Text>
                <View style={styles.info}>
                    <Text style={styles.textInfo}>{'Where:'}</Text>
                    <Text style={styles.boldInfo}>{selectedTeam.location}, {selectedTeam.town}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.textInfo}>{'Start:'}</Text>
                    <Text style={styles.boldInfo}>{selectedTeam.start}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.textInfo}>{'Ends:'}</Text>
                    <Text style={styles.boldInfo}>{selectedTeam.end}</Text>
                </View>
                <View style={styles.details}>
                    <Text style={{fontSize: 10}}>{'Notes'}</Text>
                    <Text style={styles.boldInfo}>{selectedTeam.notes}</Text>
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {selectedTeam: state.teams.selectedTeam};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetails);
