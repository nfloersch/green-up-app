// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    StyleSheet,
    View,
    ScrollView
} from 'react-native';
import CheckBox from 'react-native-checkbox';
import * as teamActions from './team-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {TeamMember} from '../../models/team-member';
import withErrorHandler from '../../components/with-error-handler';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%'
    },
    teams: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});

const inviteToTeam = Symbol();

function _inviteToTeam() {
    const teamMembers = this.props.contacts.map(contact => TeamMember.create(Object.assign({}, contact, {status: TeamMember.memberStatuses.INVITED})));
    this.props.actions.inviteContacts(this.props.teams[this.props.selectedTeamId], this.props.currentUser, teamMembers);
}

class InviteContacts extends Component {
    static propTypes = {
        actions: PropTypes.object,
        selectedTeamId: PropTypes.string,
        currentUser: PropTypes.object,
        contacts: PropTypes.arrayOf(PropTypes.object),
        teams: PropTypes.object
    };

    static navigationOptions = {
        title: 'Invite Contacts'
    };

    constructor(props) {
        super(props);
        this.toggleContact = this.toggleContact.bind(this);
        this[inviteToTeam] = _inviteToTeam.bind(this);
        this.state = {
            contacts: []
        };
    }

    componentWillMount() {
        this.setState({
            contacts: this.props.contacts || []
        });
    }

    componentDidMount() {
        this.props.actions.retrieveContacts();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            contacts: nextProps.contacts || []
        });
    }

    toggleContact(contact) {
        return () => {
            const newContact = Object.assign({}, contact, {
                isSelected: !contact.isSelected
            });
            const newContacts = this.state.contacts.filter(cntct => (cntct.email !== newContact.email)).concat(newContact);
            this.setState({contacts: newContacts});
        };
    }

    render() {

        var myContacts = this.state.contacts.sort((a, b) => {
            switch (true) {
                case(a.firstName < b.firstName):
                    return -1;
                case(a.firstName > b.firstName):
                    return 1;
                case(a.firstLastName < b.LastName):
                    return -1;
                case(a.LastName > b.LastName):
                    return 1;
                default:
                    return 0;
            }
        }).map(
            contact => (
                <CheckBox
                    checked={contact.isSelected} key={contact.email}
                    label={`${contact.firstName} ${contact.lastName}`}
                    onChange={this.toggleContact(contact)}/>
            )
        );
        return (
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps='never'>
                    {myContacts}
                    <Button onPress={this[inviteToTeam]} title='Invite to team' color='green'/>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const selectedTeamId = state.teamReducers.selectedTeam;
    const currentUser = state.loginReducer.user;
    const teams = state.teamReducers.teams;
    const contacts = state.teamReducers.contacts;
    return {teams, currentUser, selectedTeamId, contacts};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(teamActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(InviteContacts));
