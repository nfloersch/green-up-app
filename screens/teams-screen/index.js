// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    TouchableHighlight,
    ScrollView,
    Modal,
    View,
    TextInput, Platform
} from 'react-native';

import {Message} from '../../models/message';
import TeamEditor from './team-editor';
import {TeamMember} from '../../models/team-member';
import Team from '../../models/team';
import * as actions from './actions';
import {User} from '../../models/user';

// import withErrorHandler from '../../components/with-error-handler';

function currentUserIsTeamOwner(team, currentUser) {
    const teamUID = team && team.owner && team.owner.uid;
    const userUID = currentUser && currentUser.uid;
    return teamUID && userUID && teamUID === userUID;
}

const styles = StyleSheet.create({
    headerButton: {
        width: 32
    },
    teams: {
        fontSize: 18,
        margin: 2
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        paddingTop: 15,
        justifyContent: 'space-around'
    },
    messageRow: {
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#678',
        width: '100%',
        height: '70%',
        padding: 4,
        marginTop: 10
    },
    buttonRow: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        marginTop: 10
    },
    addButton: {
        width: '49%',
        backgroundColor: '#0F0',
        justifyContent: 'center',
        padding: 10,
        marginRight: 3
    },
    cancelButton: {
        width: '49%',
        backgroundColor: '#F00',
        justifyContent: 'center',
        padding: 10,
        marginLeft: 3
    }
});

class MyTeams extends Component {
    static propTypes = {
        actions: PropTypes.object,
        currentUser: PropTypes.object,
        handleError: PropTypes.func,
        navigation: PropTypes.object,
        teamMembers: PropTypes.object,
        teams: PropTypes.object,
        toTeamDetails: PropTypes.func
    };

    static navigationOptions = {
        title: 'Green Teams',
        tabBarLabel: 'Teams'
    };

    constructor(props) {
        super(props);
        this.toTeamDetail = this.toTeamDetail.bind(this);
        this.toTeamSearch = this.toTeamSearch.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.openTeamMessageModal = this.openTeamMessageModal.bind(this);
        this.toNewTeamEditor = this.toNewTeamEditor.bind(this);
        this.onMessageTextChange = this.onMessageTextChange.bind(this);
        this.state = {selectedTeamId: null, isModalVisible: false, messageText: ''};
    }

    toTeamSearch() {
        this.props.navigation.navigate('TeamSearch');
    }

    openTeamMessageModal(selectedTeamId) {
        return () => {
            this.setState({messageText: '', selectedTeamId, isModalVisible: true, openModal: null});
        };
    }

    sendMessage() {
        // const team = this.props.teams[this.state.selectedTeamId];
        const myMessage = Message.create({
            text: this.state.messageText,
            sender: this.props.currentUser,
            teamId: this.state.selectedTeamId,
            type: Message.messageTypes.TEAM_MESSAGE
        });

        this.setState({sendingMessage: true}, () => {
            this.props.actions.sendTeamMessage(this.props.teamMembers[this.state.selectedTeamId] || {}, myMessage)
                .then(
                    this.setState({messagetext: '', isModalVisible: false})
                )
                .catch((error) => {
                    Alert.alert('Your message failed delivery :-(');
                });
        });
    }

    onMessageTextChange(messageText) {
        this.setState({messageText});
    }

    toTeamDetail(status, team) {
        return () => {
            let nextScreen = 'TeamDetails';


            switch (true) {
                case status === TeamMember.memberStatuses.INVITED:
                    nextScreen = 'TeamInvitationDetails';
                    break;
                case currentUserIsTeamOwner(team, this.props.currentUser):
                    nextScreen = 'TeamEditor';
                    break;
                default:
                    nextScreen = 'TeamDetails';
                    break;
            }
            this.props.actions.selectTeam(team);
            this.props.navigation.navigate(nextScreen);
        };
    }

    toNewTeamEditor() {
        const owner = TeamMember.create(Object.assign({}, this.props.currentUser, {memberStatus: TeamMember.memberStatuses.OWNER}));
        const team = Team.create({owner});
        this.props.actions.selectTeam(team);
        this.props.navigation.navigate('TeamEditor');
    }

    toTeamIcon(status: string) {
        const icons = {
            [TeamMember.memberStatuses.ACCEPTED]: Platform.OS === 'ios' ? 'ios-eye' : 'md-eye',
            [TeamMember.memberStatuses.INVITED]: Platform.OS === 'ios' ? 'ios-mail-outline' : 'md-mail',
            [TeamMember.memberStatuses.OWNER]: Platform.OS === 'ios' ? 'ios-settings' : 'md-settings',
            [TeamMember.memberStatuses.REQUEST_TO_JOIN]: Platform.OS === 'ios' ? 'ios-clock-outline' : 'md-clock'
        };
        return icons[status];
    }

    render() {

        const teams = this.props.teams;
        const user = this.props.currentUser;
        const myTeams = (Object.keys(user.teams || {})).map(key => (
            <TouchableHighlight key={key} onPress={this.toTeamDetail(user.teams[key], teams[key])}>
                <View style={styles.row}>
                    <TouchableHighlight onPress={this.openTeamMessageModal(key)}>
                        <Ionicons name={(Platform.OS === 'ios' ? 'ios-chatbubbles-outline' : 'md-chatboxes')}
                            size={30}/>
                    </TouchableHighlight>
                    <Text style={styles.teams}>{teams[key].name}</Text>
                    <Ionicons name={this.toTeamIcon(user.teams[key])} size={30} style={{color: 'black'}}/>
                </View>
            </TouchableHighlight>
        ));
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.row}>
                        <Button onPress={() => {
                            this.props.navigation.navigate('TeamSearch');
                        }} title='Search Teams'/>
                        <Button onPress={this.toNewTeamEditor} title='New Team'/>
                    </View>
                    {myTeams}
                    <Modal animationType={'slide'} transparent={false}
                        visible={this.state.isModalVisible} onRequestClose={() => {
                            this.setState({message: '', selectedTeam: null});
                        }}>
                        <View style={{marginTop: 22, flex: 1}}>
                            <ScrollView>
                                <View style={styles.messageRow}>
                                    <TextInput
                                        keyBoardType={'default'}
                                        multiline={true}
                                        numberOfLines={5}
                                        onChangeText={this.onMessageTextChange}
                                        placeholder={'message details'}
                                        underlineColorAndroid={'transparent'}
                                        value={this.state.messageText}
                                        style={{width: '100%', paddingTop: 30, paddingBottom: 30}}/>
                                </View>
                            </ScrollView>
                            <View style={styles.buttonRow}>
                                <TouchableHighlight style={styles.addButton} onPress={this.sendMessage}>
                                    <Text style={styles.text}>Send Message</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.cancelButton}
                                    onPress={() => {
                                        this.setState({isModalVisible: false, messageText: ''});
                                    }}>
                                    <Text style={styles.text}>Cancel</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
                <Modal animationType={'slide'}
                    transparent={false}
                    visible={this.state.openModal === 'NEW_TEAM'}>
                    <TeamEditor/>
                </Modal>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const user = state.login.user;
    const profile = state.profile;
    const currentUser = User.create(Object.assign({}, user, profile));
    const teams = state.teams.teams;
    const teamMembers = state.teams.teamMembers || {};
    return {teams, currentUser, teamMembers};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTeams);
