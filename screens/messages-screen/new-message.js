/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet, Text, TextInput, TouchableHighlight,
    View, Picker, Button
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as messageActions from './actions';
import {Message} from '../../models/message';
import {defaultStyles} from '../../styles/default-styles';
import * as messageTypes from '../../constants/message-types';

const myStyles = {};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class NewMessage extends Component {
    static propTypes = {
        actions: PropTypes.object,
        currentUser: PropTypes.object,
        myTeams: PropTypes.array,
        navigation: PropTypes.object,
        selectedTeamId: PropTypes.object,
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

        const TeamPicker = (
            <View>
                <Text style={styles.label}>Select Team to Message:</Text>
                <Picker
                    style={styles.button}
                    itemStyle={{height: 45}}
                    selectedValue={this.state.selectedTeamId || ((this.props.myTeams || [])[0] || {}).id}
                    onValueChange={(itemValue) => this.setState({selectedTeamId: itemValue})}>
                    {(this.props.myTeams || []).map(team => (
                        <Picker.Item key={team.id} label={team.name} value={team.id}/>))}
                </Picker>
            </View>
        );


        return (
            <View style={styles.container}>
                {!this.props.selectedTeamId ? TeamPicker : null}
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
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        onPress={this.sendMessage}
                        title='Send Message'/>
                </View>
                <View style={styles.button}>
                    <Button
                        onPress={this.cancelMessage}
                        title='Cancel'/>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const currentUser = state.login.user;
    const myTeams = Object.keys((state.profile || {}).teams).map(key => state.teams.teams[key]);
    const teams = state.teams.teams;
    const teamMembers = state.teams.teamMembers;
    const selectedTeamId = state.teams.selectedTeam;
    return {selectedTeamId, teams, myTeams, teamMembers, currentUser};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(messageActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
