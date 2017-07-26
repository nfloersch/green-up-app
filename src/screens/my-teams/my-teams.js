// @flow

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
    headerButton: {
        // flex: 1,
        width: 32
    },
    teams: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    inputStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 2,
        color: '#262626',
        fontSize: 18,
        fontWeight: '200',
        height: 40,
        width: '100%',
        textAlign: 'left',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        borderStyle: 'solid'
    }
});

class TeamSummaries extends Component {
    static propTypes = {
        actions: PropTypes.object,
        teams: PropTypes.array,
        navigation: PropTypes.object,
        toTeamDetails: PropTypes.func
    };

    static navigationOptions = {
        title: 'Teams'
    };

    constructor(props) {
        super(props);
        this.toTeamDetail = this.toTeamDetail.bind(this);
        this.toTeamSearch = this.toTeamSearch.bind(this);
    }

    toTeamSearch() {
        this.props.navigation.navigate('TeamSearch');
    }

    toTeamDetail(team: Object) {
        let nextScreen = 'TeamDetails';
        switch (true) {
            case team.invitationPending:
                nextScreen = 'TeamInvitationDetails';
                break;
            case team.userIsOwner:
                nextScreen = 'TeamEditor';
                break;
            default:
                nextScreen = 'TeamDetails';
                break;
        }
        return () => {
            this.props.navigation.navigate(nextScreen);
        };
    }

    render() {

        var myTeams = (this.props.teams || []).map(team => (
            <TouchableHighlight key={team._id} onPress={this.toTeamDetail(team)}>
                <View>
                    <Text style={styles.teams}>{team.name}</Text>
                </View>
            </TouchableHighlight>
        ));
        return (
            <View style={styles.container}>
                <Text>Team Summaries Screen</Text>
                {myTeams}
                <Button onPress={this.toTeamSearch} title="Search Teams"/>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {teams: state.teamReducers.session.user.teams};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(teamActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSummaries);
