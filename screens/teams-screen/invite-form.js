/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import * as actions from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {TeamMember} from '../../models/team-member';
// import withErrorHandler from '../../components/with-error-handler';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%'
    },
    text: {
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
        alignSelf: 'center',
        width: '96%'
    },
    textInput: {
        fontSize: 18,
        textAlign: 'left',
        height: 28,
        borderWidth: 1,
        borderColor: 'grey',
        width: '96%',
        alignSelf: 'center',
        padding: 2

    },
    teams: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});

function _changeInvitee(key) {
    return (value) => {
        this.setState({[key]: value});
    };
}

function _inviteToTeam() {
    const teamMember = TeamMember.create(Object.assign({}, this.state, {status: TeamMember.memberStatuses.INVITED}));
    this.props.actions.inviteContacts(this.props.selectedTeam, this.props.currentUser, [teamMember]);
    this.setState({firstName: '', lastName: '', email: '', phone: ''});
}


class InviteForm extends Component {
    static propTypes = {
        actions: PropTypes.object,
        teams: PropTypes.object,
        selectedTeam: PropTypes.object,
        currentUser: PropTypes.object
    };

    static navigationOptions = {
        title: 'Invite Team Members'
    };

    constructor(props) {
        super(props);
        this.inviteToTeam = _inviteToTeam.bind(this);
        this.changeInvitee = _changeInvitee.bind(this);
        this.state = {firstName: '', lastName: '', email: '', phone: ''};
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Invitee&apos;s Email
                </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='john@example.com'
                    value={this.state.email}
                    onChangeText={this.changeInvitee('email')}
                />
                <Text style={styles.text}>
                    First Name
                </Text>
                <TextInput
                    style={styles.textInput}
                    value={this.state.firstName}
                    onChangeText={this.changeInvitee('firstName')}
                    placeholder='First'
                />
                <Text style={styles.text}>
                    Last Name
                </Text>
                <TextInput
                    style={styles.textInput}
                    value={this.state.lastName}
                    onChangeText={this.changeInvitee('lastName')}
                    placeholder='Last'
                />
                <Text style={styles.text}>
                    Phone (optional)
                </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='555-555-5555'
                    value={this.state.phone}
                    onChangeText={this.changeInvitee('phone')}
                />
                <Button
                    onPress={this.inviteToTeam}
                    title='Invite to Team'/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const selectedTeam = state.teams.selectedTeam;
    const currentUser = state.login.user;
    const teams = state.teams.teams;
    return {teams, currentUser, selectedTeam};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteForm);
