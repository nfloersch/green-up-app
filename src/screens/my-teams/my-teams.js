// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    StyleSheet,
    Text,
    TouchableHighlight,
    ScrollView,
    View
} from 'react-native';
import {UserSummary} from "../../models/user-summary";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as teamActions from './team-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Team from '../../models/team';


function currentUserIsTeamOwner(team, currentUser){
  let teamUID = team && team.owner && team.owner.uid;
  let userUID = currentUser && currentUser.uid;
  return teamUID && userUID && teamUID === userUID;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%'
    },
    headerButton: {
        width: 32
    },
    teams: {
        fontSize: 18,
        margin: 2
    },
    inputStyle: {
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
    },
    buttons: {
        width: '100%',
        flexDirection: 'row',
        paddingTop: 15,
        justifyContent: 'space-around'
    }
});

class TeamSummaries extends Component {
    static propTypes = {
        actions: PropTypes.object,
        teams: PropTypes.array,
        navigation: PropTypes.object,
        currentUser: PropTypes.object,
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
        this.toNewTeamEditor = this.toNewTeamEditor.bind(this);
    }

    toTeamSearch() {
        this.props.navigation.navigate('TeamSearch');
    }

    toMessageTeam() {
        this.props.navigation.navigate('MessageTeam');
    }

    toTeamDetail(team : Object) {
        let nextScreen = 'TeamDetails';

        switch (true) {
            case team.invitationPending:
                nextScreen = 'TeamInvitationDetails';
                break;
            case currentUserIsTeamOwner(team, this.props.currentUser);
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

    toNewTeamEditor() {
        const owner =  UserSummary.create(this.props.currentUser);
        const team = Team.create({owner});
        this.props.actions.selectTeam(team);
        this.props.navigation.navigate('TeamEditor');
    }

    toTeamIcon(team : Object) {
        switch (true) {
            case team.invitationPending:
                return 'contact-mail';
            case currentUserIsTeamOwner(team, this.props.currentUser);
                return 'pencil-box';
            default:
                return 'arrow-right-thick';
        }
    }

    render() {
        var teams = this.props.teams;
        var myTeams = (Object.keys(teams) || []).map(key => (
            <TouchableHighlight key={key} onPress={this.toTeamDetail(key)}>
                <View style={styles.buttons}>
                    <TouchableHighlight onPress={this.toMessageTeam}>
                        <MaterialCommunityIcons name='message-text-outline' size={50}/>
                    </TouchableHighlight>
                    <Text style={styles.teams}>{teams[key].name}</Text>
                    <MaterialCommunityIcons name={this.toTeamIcon(teams[key])} size={50}/>
                </View>
            </TouchableHighlight>
        ));
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text>{'Team Summaries Screen'}</Text>
                {myTeams}
                <View style={styles.row}>
                    <Button onPress={this.toTeamSearch} title='Search Teams'/>
                    <Button onPress={this.toNewTeamEditor} title='New Team'/>
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {teams: state.teamReducers.teams, currentUser: state.loginReducer.user};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(teamActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSummaries);
