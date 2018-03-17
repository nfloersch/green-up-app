// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    StyleSheet,
    View,
    ScrollView,
    TouchableHighlight,
    Text,
    CheckBox,
    Platform
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import IOSCheckBox from 'react-native-checkbox';

import * as actions from './actions';
import {TeamMember} from '../../models/team-member';
// import withErrorHandler from '../../components/with-error-handler';
import {defaultStyles} from '../../styles/default-styles';
import * as validators from '../../libs/validators';

const myStyles = {};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);


function getDisplayName(contact) {
    return (contact.firstName || contact.lastName)
        ? (`${contact.firstName} ${contact.lastName}`).trim()
        : (contact.email);
}

function _inviteToTeam() {
    const teamMembers = this.state.contacts
        .filter(contact => this.state.selectedContacts.indexOf(contact.email) > -1)
        .map(contact => TeamMember.create(Object.assign({}, contact, {
            displayName: `${contact.firstName} ${contact.lastName}`,
            memberStatus: TeamMember.memberStatuses.INVITED
        })));
    this.props.navigation.goBack();
    this.props.actions.inviteContacts(this.props.selectedTeam, this.props.currentUser, teamMembers);
}

class InviteContacts extends Component {
    static propTypes = {
        actions: PropTypes.object,
        contacts: PropTypes.arrayOf(PropTypes.object),
        currentUser: PropTypes.object,
        navigation: PropTypes.object,
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
            contacts: [], selectedContacts: []
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

    toggleContact(email) {
        return () => {
            const emails = this.state.selectedContacts || [];
            const newContacts = (emails.indexOf(email) > -1) ? emails.filter(_email => _email !== email) : emails.concat(email);
            this.setState({selectedContacts: newContacts});
        };
    }

    render() {
        const selected = this.state.selectedContacts || [];
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
                (contact) => (
                    (Platform.OS === 'ios')
                        ? (
                            <View key={contact.email}>
                                <IOSCheckBox
                                    checked={(selected.indexOf(contact.email) > -1)}
                                    label={getDisplayName(contact)}
                                    onChange={this.toggleContact(contact.email)}
                                />
                            </View>
                        )
                        : (<TouchableHighlight key={contact.email} onPress={this.toggleContact(contact.email)}>
                            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                                <CheckBox value={(selected.indexOf(contact.email) > -1)}/>
                                <Text style={{fontSize: 20, marginLeft: 10}}>{getDisplayName(contact)}</Text>
                            </View>
                        </TouchableHighlight>)
                )
            );

        return (
            <View style={styles.frame}>
                <View style={styles.singleButtonHeader}>
                    <TouchableHighlight
                        style={styles.singleButtonHeaderHighlight}
                        onPress={this.inviteToTeam}
                    >
                        <Text style={styles.headerButton}>
                            {'Invite to Team'}</Text>
                    </TouchableHighlight>
                </View>
                <ScrollView
                    style={styles.scroll}
                    keyboardShouldPersistTaps='never'>
                    {myContacts}
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
