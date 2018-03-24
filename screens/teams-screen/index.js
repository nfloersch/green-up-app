// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import {getMemberIcon} from '../../libs/member-icons';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    Modal,
    View,
    Platform
} from 'react-native';

import NewTeam from './new-team';
import {TeamMember} from '../../models/team-member';
import * as actions from './actions';
import {User} from '../../models/user';
import {defaultStyles} from '../../styles/default-styles';
import * as teamStatus from '../../constants/team-member-statuses';
import teamwork from '../../assets/images/teamwork.jpeg';


const myStyles = {
    teamIcon: {
        height: 50, width: 50,
        paddingRight: 10
    },
    messageIcon: {
        height: 50, width: 50,
        padding: 10
    },
    teamName: {
        flex: 4
    }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);


// class TeamItem extends Component {
//     static PropTypes = {
//         navigate: PropTypes.func,
//         team: PropTypes.object
//     };
//
//     render() {
//         return null;
// }


class MyTeams extends Component {
    static propTypes = {
        actions: PropTypes.object,
        currentUser: PropTypes.object,
        handleError: PropTypes.func,
        invitations: PropTypes.object,
        navigation: PropTypes.object,
        teamMembers: PropTypes.object,
        teams: PropTypes.object,
        toTeamDetails: PropTypes.func
    };

    static navigationOptions = {
        title: 'My Teams',
        tabBarLabel: 'Teams'
    };

    constructor(props) {
        super(props);
        this.toTeamDetail = this.toTeamDetail.bind(this);
        this.toTeamSearch = this.toTeamSearch.bind(this);
        this.toNewTeamEditor = this.toNewTeamEditor.bind(this);
        this.state = {selectedTeamId: null, isModalVisible: false, messageText: ''};
    }

    toTeamSearch() {
        this.props.navigation.navigate('TeamSearch');
    }

    toTeamDetail(status, team) {
        return () => {
            const nextScreen = {
                [TeamMember.memberStatuses.INVITED]: 'TeamInvitationDetails',
                [TeamMember.memberStatuses.OWNER]: 'TeamEditor',
                [TeamMember.memberStatuses.NOT_INVITED]: 'TeamDetails',
                [TeamMember.memberStatuses.ACCEPTED]: 'TeamDetails'
            };
            this.props.actions.selectTeam(team);
            this.props.navigation.navigate(nextScreen[status] || 'TeamDetails', {status});
        };
    }

    toNewTeamEditor() {
        this.setState({openModal: 'NEW_TEAM'});
    }

    toTeamIcon = (teamKey: string) => {
        const membershipId = ((this.props.currentUser || {}).email || '').toLowerCase().trim().replace(/\./g, ':');
        const status = (((this.props.teamMembers || {})[teamKey] || {})[membershipId] || {}).memberStatus;
        //  const memberStatus = TeamMember.memberStatuses;
        return getMemberIcon(status, {height: 50, width: 50, padding: 10});
    };

    render() {
        const _closeModal = () => this.setState({openModal: 'none'});
        const teams = this.props.teams;
        const user = this.props.currentUser;
        const membershipId = (user.email || '').toLowerCase().replace(/\./g, ':').trim();
        const canSendMessage = (teamId) => [teamStatus.OWNER, teamStatus.ACCEPTED].indexOf(((this.props.teamMembers[teamId] || {})[membershipId] || {}).memberStatus) > -1;
        const teamKeys = Object.keys((user.teams || {})).concat(Object.keys(this.props.invitations || {}));
        const myTeams = teamKeys.filter(key => Boolean(teams[key])) // avoid null exceptions if team was deleted
            .map(key => (
                <View key={key} style={styles.row}>
                    <TouchableHighlight style={{flex: 1, alignItems: 'stretch', height: 50, paddingLeft: 10}} onPress={this.toTeamDetail(user.teams[key], teams[key])}>
                        <Text style={[styles.textDark, {fontSize: 14, paddingTop: 20}]}>{teams[key].name}</Text>
                    </TouchableHighlight>
                    {
                        canSendMessage(key)
                            ? (
                                <TouchableOpacity style={styles.messageIcon} onPress={() => {
                                    this.props.navigation.navigate('NewMessage', {selectedTeamId: key});
                                }}>
                                    <Ionicons
                                        name={(Platform.OS === 'ios' ? 'ios-chatbubbles-outline' : 'md-chatboxes')}
                                        size={30}
                                    />
                                </TouchableOpacity>
                            )
                            : null
                    }
                    <TouchableOpacity style={styles.teamIcon}>
                        {this.toTeamIcon(key)}
                    </TouchableOpacity>
                </View>
            ));
        return (
            <View style={styles.frame}>
                <View style={styles.buttonBarHeader}>
                    <View style={styles.buttonBar}>
                        <View style={styles.buttonBarButton}>
                            <TouchableHighlight
                                style={styles.headerButton}
                                onPress={() => {
                                    this.props.navigation.navigate('TeamSearch');
                                }}>
                                <Text style={styles.headerButtonText}>{'Search Teams'}</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.buttonBarButton}>
                            <TouchableHighlight
                                style={styles.headerButton}
                                onPress={this.toNewTeamEditor}>
                                <Text style={styles.headerButtonText}>{'New Team'}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    {myTeams.length === 0 ? (
                        <ImageBackground source={teamwork} style={styles.backgroundImage}>
                            <View style={[styles.container, {backgroundColor: 'rgba(155,155,155,0.5)'}]}>
                                <View style={{
                                    marginTop: '30%',
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                    paddingTop: 50,
                                    paddingBottom: 50,
                                    backgroundColor: 'rgba(255,255,255, 0.85)'
                                }}>
                                    <Text style={[styles.textDark]}>
                                        {'Green Up Day is all about community and teamwork.'}
                                    </Text>
                                    <Text style={[styles.textDark]}>
                                        {'Search for teams in your area, or create a new one and invite some friends.'}
                                    </Text>
                                </View>
                            </View>
                        </ImageBackground>
                    )
                        : myTeams
                    }
                </View>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.openModal === 'NEW_TEAM'}
                    onRequestClose={() => {
                    }}>
                    <NewTeam closeModal={_closeModal}/>
                </Modal>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const user = state.login.user;
    const profile = state.profile;
    const invitations = state.teams.invitations;
    const currentUser = User.create(Object.assign({}, user, profile));
    const teams = state.teams.teams;
    const teamMembers = state.teams.teamMembers || {};
    return {teams, currentUser, teamMembers, invitations};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTeams);
