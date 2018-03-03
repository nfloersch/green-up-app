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
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from './actions';
import {TeamMember} from '../../models/team-member';
// import withErrorHandler from '../../components/with-error-handler';
import {defaultStyles} from '../../styles/default-styles';
import * as validators from '../../libs/validators';

const myStyles = {};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

function _inviteToTeam() {
    const teamMembers = this.state.contacts
        .filter(c => c.isSelected)
        .map(contact => TeamMember.create(Object.assign({}, contact, {
            displayName: `${contact.firstName} ${contact.lastName}`,
            memberStatus: TeamMember.memberStatuses.INVITED
        })));
    this.props.navigator.navigate.goBack();
    this.props.actions.inviteContacts(this.props.selectedTeam, this.props.currentUser, teamMembers);
}

class InviteContacts extends Component {
    static propTypes = {
        actions: PropTypes.object,
        contacts: PropTypes.arrayOf(PropTypes.object),
        currentUser: PropTypes.object,
        navigator: PropTypes.object,
        selectedTeam: PropTypes.object,
        teamMembers: PropTypes.object
    };

    static navigationOptions = {
        title: 'Invite Contacts'
    };

    constructor(props) {
        super(props);
        this.toggleContact = this.toggleContact.bind(this);
        this.inviteToTeam = _inviteToTeam.bind(this);
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
        const myContacts = this.state.contacts
            .filter(contact => validators.email(contact.email) && !validators.isInTeam(this.props.teamMembers[this.props.selectedTeam.id], contact.email))
            .sort((a, b) => {
                switch (true) {
                    case(a.firstName < b.firstName):
                        return -1;
                    case(a.firstName > b.firstName):
                        return 1;
                    case(a.lastName < b.lastName):
                        return -1;
                    case(a.lastName > b.lastName):
                        return 1;
                    default:
                        return 0;
                }
            }).map(
                (contact, i) => (
                    <CheckBox
                        checked={contact.isSelected}
                        key={i}
                        label={`${contact.firstName} ${contact.lastName}`}
                        onChange={this.toggleContact(contact)}
                    />
                )
            );

        return (
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps='never'>
                    {myContacts}
                    <Button
                        onPress={this.inviteToTeam}
                        title='Invite to team'
                    />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const selectedTeam = state.teams.selectedTeam;
    const currentUser = state.login.user;
    const teamMembers = state.teams.teamMembers;
    const contacts = state.teams.contacts;
    return {teamMembers, currentUser, selectedTeam, contacts};
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteContacts);
