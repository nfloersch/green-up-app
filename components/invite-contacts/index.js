// @flow
import React, { Component } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableHighlight,
    Text,
    CheckBox,
    Platform
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import IOSCheckBox from "react-native-checkbox";
import * as actions from "./actions";
import TeamMember from "../../models/team-member";
import { defaultStyles } from "../../styles/default-styles";
import { isValidEmail, isInTeam } from "../../libs/validators";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

function getDisplayName(contact) {
    return (contact.firstName || contact.lastName)
        ? (`${ contact.firstName } ${ contact.lastName } (${ contact.email })`).trim()
        : (contact.email);
}

function _inviteToTeam() {
    const teamMembers = this.state.contacts
        .filter(contact => this.state.selectedContacts.indexOf(contact.email) > -1)
        .map(contact => TeamMember.create(Object.assign({}, contact, {
            displayName: `${ contact.firstName } ${ contact.lastName }`,
            memberStatus: TeamMember.memberStatuses.INVITED
        })));
    this.props.closeModal();
    this.props.actions.inviteContacts(this.props.selectedTeam, this.props.currentUser, teamMembers);
}

type Props = {
    actions: { retrieveContacts: any => any },
    closeModal: any => void,
    contacts: Array<Object>,
    currentUser: Object,
    navigation: Object,
    selectedTeam: Object,
    teamMembers: Object
};

class InviteContacts extends Component<Props> {

    constructor(props) {
        super(props);
        this.toggleContact = this.toggleContact.bind(this);
        this.inviteToTeam = _inviteToTeam.bind(this);
        this.state = {
            contacts: [], selectedContacts: []
        };
    }

    // TODO: Refactor this deprecated lifecycle
    componentWillMount() {
        this.setState({
            contacts: this.props.contacts || []
        });
    }

    componentDidMount() {
        this.props.actions.retrieveContacts();
    }

    // TODO: Refactor this deprecated lifecycle
    componentWillReceiveProps(nextProps) {
        this.setState({
            contacts: nextProps.contacts || []
        });
    }

    static navigationOptions = {
        title: "Invite Contacts"
    };


    toggleContact(email) {
        return () => {
            const emails = this.state.selectedContacts || [];
            const newContacts = (emails.indexOf(email) > -1) ? emails.filter(_email => _email !== email) : emails.concat(email);
            this.setState({ selectedContacts: newContacts });
        };
    }

    render() {
        const selected = this.state.selectedContacts || [];
        const myContacts = this.state.contacts
            .filter(contact => isValidEmail(contact.email) && !isInTeam(this.props.teamMembers[this.props.selectedTeam.id], contact.email))
            .sort((a, b) => {
                const bDisplay = (`${ b.firstName }${ b.lastName }${ b.email }`).toLowerCase();
                const aDisplay = (`${ a.firstName }${ a.lastName }${ a.email }`).toLowerCase();
                switch (true) {
                    case(aDisplay < bDisplay):
                        return -1;
                    case(aDisplay > bDisplay):
                        return 1;
                    default:
                        return 0;
                }
            }).map(
                (contact, i) => (
                    (Platform.OS === "ios")
                        ? (
                            <View key={ i }>
                                <IOSCheckBox
                                    checked={ (selected.indexOf(contact.email) > -1) }
                                    label={ getDisplayName(contact) }
                                    onChange={ this.toggleContact(contact.email) }
                                />
                            </View>
                        )
                        : (<TouchableHighlight key={ i } onPress={ this.toggleContact(contact.email) }>
                            <View style={ { flex: 1, flexDirection: "row", marginTop: 10 } }>
                                <CheckBox value={ (selected.indexOf(contact.email) > -1) }/>
                                <Text style={ { fontSize: 20, marginLeft: 10 } }>{ getDisplayName(contact) }</Text>
                            </View>
                        </TouchableHighlight>)
                )
            );

        return (
            <View style={ [styles.frame, { paddingTop: 30 }] }>
                <View style={ [styles.buttonBarHeader, { backgroundColor: "#EEE", marginTop: 10 }] }>
                    <View style={ styles.buttonBar }>

                        <View style={ styles.buttonBarButton }>
                            <TouchableHighlight
                                style={ styles.headerButton }
                                onPress={ this.inviteToTeam }
                            >
                                <Text style={ styles.headerButtonText }>
                                    { "Invite to Team" }</Text>
                            </TouchableHighlight>
                        </View>

                        <View style={ styles.buttonBarButton }>
                            <TouchableHighlight
                                style={ styles.headerButton }
                                onPress={ this.props.closeModal }
                            >
                                <Text style={ styles.headerButtonText }>{ "Close" }</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>

                <ScrollView
                    style={ styles.scroll }
                    keyboardShouldPersistTaps="never">
                    <View style={ styles.infoBlockContainer }>
                        { myContacts }
                    </View>
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
    return { teamMembers, currentUser, selectedTeam, contacts };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteContacts);
