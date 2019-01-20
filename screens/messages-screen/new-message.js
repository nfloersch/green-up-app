/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
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
import User from '../../models/user';
import * as actions from './actions';
import Message from '../../models/message';
import {defaultStyles} from '../../styles/default-styles';
import * as messageTypes from '../../constants/message-types';
import {removeNulls} from '../../libs/remove-nulls';

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
            selectedTeamId: props.navigation.selectedTeamId || props.selectedTeamId,
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

    sendMessage(teamId, message) {
        const {navigation, actions, currentUser} = this.props; // eslint-disable-line no-shadow
        const _message = Message.create(
            {
                text: message,
                type: messageTypes.TEAM_MESSAGE,
                sender: currentUser,
                teamId
            }
        );
        actions.sendTeamMessage(teamId, _message);
        navigation.goBack();
    }

    cancelMessage() {
        this.props.navigation.goBack();
    }

    render() {
        const {myTeams, navigation} = this.props;
        const selectedTeamId = (navigation.state.params || {}).selectedTeamId || ((myTeams || []).length === 1 && (myTeams[0] || {}).id) || null;
        const teamName = ((myTeams || []).find(team => team.id === selectedTeamId) || {}).name || '';
        const items = (myTeams || [])
            .map(team => (
                <Picker.Item key={team.id} label={team.name} value={team.id}/>)
            );
        const teamValue = selectedTeamId || this.state.selectedTeamId || ({myTeams}[0] || {}).id;
        return (
            <View style={styles.frame}>
                <View style={styles.buttonBarHeader}>
                    <View style={styles.buttonBar}>
                        <TouchableHighlight
                            style={styles.headerButton}
                            onPress={() => this.sendMessage(teamValue, this.state.text)}>
                            <Text style={styles.headerButtonText}>{'Send Message'}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.headerButton} onPress={this.cancelMessage}>
                            <Text style={styles.headerButtonText}>{'Cancel'}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <KeyboardAvoidingView
                    style={defaultStyles.frame}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <ScrollView style={styles.scroll}>
                        <View style={styles.infoBlockContainer}>
                            {
                                !selectedTeamId ? (
                                    <View style={{marginBottom: 5}}>
                                        <Text style={styles.labelDark}>Select Team to Message:</Text>
                                        <Picker
                                            style={styles.picker}
                                            selectedValue={teamValue}
                                            onValueChange={(itemValue) => this.setState({selectedTeamId: itemValue})}>
                                            {items}
                                        </Picker>
                                    </View>
                                ) : (
                                    <View style={{marginBottom: 5}}>
                                        <Text style={styles.labelDark}>{'Send a Message To'}</Text>
                                        <Text style={styles.largeText}>{teamName}</Text>
                                    </View>
                                )
                            }
                            <TextInput
                                keyBoardType={'default'}
                                multiline={true}
                                textAlignVertical='top'
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
    const currentUser = User.create({...state.login.user, ...removeNulls(state.profile)});
    const myTeams = Object.keys((state.profile || {}).teams)
        .map(key => state.teams.teams[key]) // match id's to their teams
        .filter(team => Boolean(team)); // remove deleted teams, just in case
    const teams = state.teams.teams;
    const teamMembers = state.teams.teamMembers;
    return {teams, myTeams, teamMembers, currentUser};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
