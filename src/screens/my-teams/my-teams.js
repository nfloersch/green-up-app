// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as teamActions from './team-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Team from '../../models/team';

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
        justifyContent: 'flex-start',
        fontSize: 20,
        margin: 5
    },
    inputStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 2,
        color: '#262626',
        fontSize: 18,
        fontWeight: '200',
        height: 20,
        width: '100%',
        textAlign: 'left',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    row: {flex: 1, justifyContent: 'flex-start', flexDirection:'row'},
    column1:{width: 32},
    column2:{}
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
        this.toMessageTeam = this.toMessageTeam.bind(this);
        this.toNewTeam = this.toNewTeam.bind(this);
    }

    toTeamSearch() {
        this.props.navigation.navigate('TeamSearch');
    }

    toMessageTeam() {
        this.props.navigation.navigate('MessageTeam');
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
            this.props.actions.selectTeam(team);
            this.props.navigation.navigate(nextScreen);
        };
    }

    toNewTeam() {

        this.props.actions.selectTeam(Team.create());
        this.props.navigation.navigate('TeamEditor');

    }

    toTeamIcon(team: Object) {
        switch (true) {
            case team.invitationPending:
                return 'contact-mail';
            case team.userIsOwner:
                return 'pencil-box';
            default:
                return 'arrow-right-thick';
        }
    }

    render() {

        var myTeams = (this.props.teams || []).map(team => (
                <View style={styles.row} key={team._id}>
                    <TouchableHighlight  style={styles.column1}onPress={this.toMessageTeam}>
                        <MaterialCommunityIcons name='bullhorn' size={25}/>
                    </TouchableHighlight>
                    <TouchableHighlight  style={styles.column2} key={team._id} onPress={this.toTeamDetail(team)}>
                        <View style={styles.row}>
                            <Text style={styles.teams}>{team.name}</Text>
                            <MaterialCommunityIcons
                                name={this.toTeamIcon(team)}
                                size={25}
                                style={styles.column1}
                            />
                        </View>
                    </TouchableHighlight>
                </View>
            ))
        ;
        return (
            <View style={styles.container}>
                <Text>Team Summaries Screen</Text>
                {myTeams}
                <Button onPress={this.toTeamSearch} title="Search Teams"/>
                <Button onPress={this.toNewTeam} title="New Team"/>
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
