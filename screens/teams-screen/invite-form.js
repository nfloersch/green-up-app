/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {email, isInTeam} from '../../libs/validators';

import * as actions from './actions';
import {TeamMember} from '../../models/team-member';
// import withErrorHandler from '../../components/with-error-handler';
import {defaultStyles} from '../../styles/default-styles';

const myStyles = {};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

function _changeInvitee(key) {
    return (value) => {
        this.setState({[key]: value});
    };
}

function _inviteToTeam() {
    const displayName = `${this.state.firstName} ${this.state.lastName}`;
    const teamMember = TeamMember.create(Object.assign({}, this.state, {
        displayName,
        memberStatus: TeamMember.memberStatuses.INVITED
    }));
    this.props.actions.inviteContacts(this.props.selectedTeam, this.props.currentUser, [teamMember]);
    this.setState({firstName: '', lastName: '', email: ''});
}

class InviteForm extends Component {
    static propTypes = {
        actions: PropTypes.object,
        currentUser: PropTypes.object,
        selectedTeam: PropTypes.object,
        teamMembers: PropTypes.object
    };

    static navigationOptions = {
        title: 'Invite Team Members'
    };

    constructor(props) {
        super(props);
        this.inviteToTeam = _inviteToTeam.bind(this);
        this.changeInvitee = _changeInvitee.bind(this);
        this.state = {firstName: '', lastName: '', email: ''};
    }


    render() {
        const teamMembers = this.props.teamMembers[this.props.selectedTeam.id];
        const emailIsInvalid = !email(this.state.email) || isInTeam(teamMembers, this.state.email);
        return (
            <View style={styles.container}>
                <Text style={styles.label}>
                    Invitee&apos;s Email
                </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='john@example.com'
                    value={this.state.email}
                    onChangeText={this.changeInvitee('email')}
                />
                <Text>{ isInTeam(teamMembers, this.state.email) ? 'That person is already on the team' : ' '}</Text>
                <Text style={styles.label}>
                    First Name
                </Text>
                <TextInput
                    style={styles.textInput}
                    value={this.state.firstName}
                    onChangeText={this.changeInvitee('firstName')}
                    placeholder='First'
                />
                <Text style={styles.label}>
                    Last Name
                </Text>
                <TextInput
                    style={styles.textInput}
                    value={this.state.lastName}
                    onChangeText={this.changeInvitee('lastName')}
                    placeholder='Last'
                />
                <View style={styles.button}>
                <Button
                    disabled={emailIsInvalid}
                    onPress={this.inviteToTeam}
                    title='Invite to Team'/>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const selectedTeam = state.teams.selectedTeam;
    const currentUser = state.login.user;
    const teamMembers = state.teams.teamMembers;
    return {teamMembers, currentUser, selectedTeam};
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteForm);
