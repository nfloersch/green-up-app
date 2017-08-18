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
import {TeamMember} from '../../models/team-member';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as teamActions from './team-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


function currentUserIsTeamOwner(team, currentUser) {
    const teamUID = team && team.owner && team.owner.uid;
    const userUID = currentUser && currentUser.uid;
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
        teams: PropTypes.object,
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
        this.sendMessge = this.sendMessage.bind(this);
        this.toNewTeamEditor = this.toNewTeamEditor.bind(this);
        this.state={selectedTeam: null, message: '', isModalVisible:false};
    }

    toTeamSearch() {
        this.props.navigation.navigate('TeamSearch');
    }

    sendMessage(){
        const team = this.props.teams[this.state.selectedTeam];
        this.props.actions.sendTeamMessage(team, this.state.message);
    };

    toTeamDetail(key: string) {
        let nextScreen = 'TeamDetails';
        const team = (this.props.teams || {})[key];
        const status = (team.members || []).find(member => member.uid === this.props.currentUser.uid);

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
        const status = (team.members || []).find(member => member.uid === this.props.currentUser.uid);
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
                    let memberIds = ((teams[key].members || []).map(member => member.uid));
                    return memberIds.indexOf(this.props.currentUser.uid) !== -1;
                }
            );
        const myTeams = _myTeams.map(key => (
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
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({message: '', selectedTeam: null});
                    }}
                >
                    <View style={{marginTop: 22}}>
                        <View>
                            <Text>Hello World!</Text>

                            <TouchableHighlight onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>

                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    const currentUser = state.loginReducer.user;
    const teams = state.teamReducers.teams;
    return {teams, currentUser};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(teamActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSummaries);
