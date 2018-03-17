/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    KeyboardAvoidingView,
    Picker, Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as messageActions from './actions';
import {Message} from '../../models/message';
import {defaultStyles} from '../../styles/default-styles';
import * as messageTypes from '../../constants/message-types';
import * as teamStatus from '../../constants/team-member-statuses';

const myStyles = {};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class NewMessage extends Component {
    static propTypes = {
        actions: PropTypes.object,
        currentUser: PropTypes.object,
        myTeams: PropTypes.array,
        navigation: PropTypes.object,
        selectedTeamId: PropTypes.string,
        teamMembers: PropTypes.object,
        teams: PropTypes.object
    };

    static navigationOptions = {
        title: 'Send A Message'
    };

    constructor(props) {
        super(props);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeText = this.changeText.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.cancelMessage = this.cancelMessage.bind(this);
        this.state = {
            selectedTeamId: props.navigation.selectedTeamId || props.selectedTeamId || (props.myTeams[0] || {}).id,
            title: '',
            text: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        const nextTeamId = nextProps.navigation.selectedTeamId || nextProps.selectedTeamId;
        if (Boolean(nextTeamId) && nextTeamId !== this.state.selectedTeamId) {
            this.setState({
                selectedTeamId: nextTeamId,
                title: '',
                text: ''
            });
        }
    }

    changeTitle(title) {
        this.setState({title: title});
    }

    changeText(text) {
        this.setState({text});
    }

    sendMessage() {
        const teamId = this.props.selectedTeamId || this.state.selectedTeamId;
        const recipients = Object.values(this.props.teamMembers[teamId] || []);
        const message = Message.create(
            {
                ...this.state,
                type: messageTypes.TEAM_MESSAGE,
                sender: this.props.currentUser,
                teamId
            }
        );
        this.props.actions.sendMessage(message, recipients);
        this.props.navigation.goBack();
    }

    cancelMessage() {
        this.props.navigation.goBack();
    }

    render() {
        const user = this.props.currentUser || {};
        const selectedTeamId = (this.props.navigation.state.params || {}).selectedTeamId;
        const membershipId = (user.email || '').toLowerCase().replace(/\./g, ':').trim();
        const canSendMessage = (teamId: string) => [teamStatus.OWNER, teamStatus.ACCEPTED].indexOf(((this.props.teamMembers[teamId] || {})[membershipId] || {}).memberStatus) > -1;
        const teamName = ((this.props.myTeams || []).find(team => team.id === selectedTeamId) || {}).name || '';
        const items = (this.props.myTeams || []).filter(team => canSendMessage(team.id))
            .map(team => (
                <Picker.Item key={team.id} label={team.name} value={team.id}/>)
            );
        const teamValue = this.state.selectedTeamId || selectedTeamId || ((this.props.myTeams || [])[0] || {}).id;
        return (
            <View style={styles.frame}>
                <View style={styles.buttonBarHeader}>
                    <View style={styles.buttonBar}>
                        <View style={styles.buttonBarButton}>
                            <TouchableHighlight style={styles.button} onPress={this.sendMessage}>
                                <Text style={styles.headerButton}>{'Send Message'}</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.buttonBarButton}>
                            <TouchableHighlight style={styles.button} onPress={this.cancelMessage}>
                                <Text style={styles.headerButton}>{'Cancel'}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <KeyboardAvoidingView
                    style={defaultStyles.frame}
                    behavior='padding'
                >
                    <ScrollView style={styles.container}>
                        {
                            !selectedTeamId ? (
                                <View style={{marginBottom: 5}}>
                                    <Text style={styles.label}>Select Team to Message:</Text>
                                    <Picker
                                        style={styles.button}
                                        itemStyle={{height: 45}}
                                        selectedValue={teamValue}
                                        onValueChange={(itemValue) => this.setState({selectedTeamId: itemValue})}>
                                        {items}
                                    </Picker>
                                </View>
                            ) : (
                                <View style={{marginBottom: 5}}>
                                    <Text style={styles.label}>Send a Message To</Text>
                                    <Text style={styles.largeText}>{teamName}</Text>
                                </View>
                            )
                        }
                        <View>
                            <TextInput
                                keyBoardType={'default'}
                                multiline={true}
                                textAlignVertical='top'
                                numberOfLines={20}
                                onChangeText={this.changeText}
                                placeholder={'Message details'}
                                value={this.state.text}
                                style={styles.textArea}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                        {
                            Platform.OS === 'ios'
                                ? (<View style={defaultStyles.padForIOSKeyboardBig}/>)
                                : null
                        }
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const currentUser = state.login.user;
    const myTeams = Object.keys((state.profile || {}).teams)
        .map(key => state.teams.teams[key]) // match id's to their teams
        .filter(team => Boolean(team)); // remove deleted teams, just in case
    const teams = state.teams.teams;
    const teamMembers = state.teams.teamMembers;
    return {teams, myTeams, teamMembers, currentUser};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(messageActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
