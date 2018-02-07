// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    StyleSheet,
    Text,
    TouchableHighlight,
    ScrollView,
    Modal,
    View,
    TextInput
} from 'react-native';
import {Message} from '../../models/message';

import {TeamMember} from '../../models/team-member';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as actions from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import withErrorHandler from '../../components/with-error-handler';

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
        teams: PropTypes.array,
        toTeamDetails: PropTypes.func
    };

    static navigationOptions = {
        title: 'Teams',
        mode: 'modal',
        header: null
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
            this.setState({messageText: '', selectedTeamId, isModalVisible: true});
        };
    }

    sendMessage() {
        const team = this.props.teams[this.state.selectedTeamId];
        const myMessage = Message.create({
            text: this.state.messageText,
            sender: this.props.currentUser,
            teamId: this.state.selectedTeamId,
            type: Message.messageTypes.TEAM_MESSAGE
        });

        this.setState({sendingMessage: true}, () => {
            this.props.actions.sendTeamMessage(team, myMessage)
                .then(
                    this.setState({messagetext: '', isModalVisible: false})
                )
                .catch((error) => {
                    this.props.handleError(error);
                });
        });
    }

    onMessageTextChange(messageText) {
        this.setState({messageText});
    }

    toTeamDetail(key: string) {
        let nextScreen = 'TeamDetails';
        const team = (this.props.teams || {})[key];
        const status = (team.members || []).find(
            member => member.uid === (this.props.currentUser || {}).uid
        );

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
        return () => {
            this.props.actions.selectTeam(key);
            this.props.navigation.navigate(nextScreen);
        };
    }

    toNewTeamEditor() {
        this.props.actions.selectTeam();
        this.props.navigation.navigate('TeamEditor');
    }

    toTeamIcon(team: Object) {
        const status = (team.members || []).find(member => member.uid === (this.props.currentUser || {}).uid);
        switch (true) {
            case status === TeamMember.memberStatuses.INVITED:
                return 'contact-mail';
            case currentUserIsTeamOwner(team, this.props.currentUser):
                return 'pencil-box';
            default:
                return 'arrow-right-thick';
        }
    }

    render() {
        const teams = this.props.teams;

        const _myTeams = (Object.keys(teams || {}))
            .filter(
                key => {
                    const memberIds = ((teams[key].members || []).map(member => member.uid));
                    return memberIds.indexOf((this.props.currentUser || {}).uid) !== -1;
                }
            );

        const myTeams = _myTeams.map(key => (
            <TouchableHighlight key={key} onPress={this.toTeamDetail(key)}>
                <View style={styles.row}>
                    <TouchableHighlight onPress={this.openTeamMessageModal(key)}>
                        <MaterialCommunityIcons name='message-text-outline' size={50}/>
                    </TouchableHighlight>
                    <Text style={styles.teams}>{teams[key].name}</Text>
                    <MaterialCommunityIcons name={this.toTeamIcon(teams[key])} size={50}/>
                </View>
            </TouchableHighlight>
        ));
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1}}>
                    <Text>{'My Teams'}</Text>
                    <View style={styles.row}>
                        <Button onPress={this.toTeamSearch} title='Search Teams'/>
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
            </View>
        );
    }
}

function mapStateToProps(state) {
    const currentUser = state.login.user;
    const teams = Object.values(state.teams.teams);
    return {teams, currentUser};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(MyTeams));
