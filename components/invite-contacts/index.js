// @flow
import React, { useState, useEffect } from "react";
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
import * as actionCreators from "../../action-creators/team-action-creators";
import TeamMember from "../../models/team-member";
import { defaultStyles } from "../../styles/default-styles";
import { isValidEmail, isInTeam } from "../../libs/validators";
import * as R from "ramda";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

function getDisplayName(contact: ContactType): string {
    return (contact.firstName || contact.lastName)
        ? (`${ contact.firstName || "" } ${ contact.lastName || "" } (${ contact.email || "" })`).trim()
        : (contact.email || "");
}

type PropsType = {
    actions: { retrieveContacts: any => void, inviteContacts: (TeamType, UserType, Array<TeamMemberType>) => void },
    closeModal: any => void,
    contacts: Array<Object>,
    currentUser: Object,
    selectedTeam: Object,
    teamMembers: Object
};

const InviteContacts = ({ actions, closeModal, contacts, currentUser, selectedTeam, teamMembers }: PropsType): React$Element<View> => {

    const [myContacts, setMyContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);

    useEffect(() => {
        setMyContacts(contacts || []);
    }, [contacts]);


    useEffect(() => {
        actions.retrieveContacts();
    }, []);


    function inviteToTeam() {
        const _teamMembers = myContacts
            .filter((contact: ContactType): boolean => selectedContacts.indexOf(contact.email) > -1)
            .map((contact: ContactType): TeamMemberType => TeamMember.create(Object.assign({}, contact, {
                displayName: `${ contact.firstName || "" } ${ contact.lastName || "" }`,
                memberStatus: TeamMember.memberStatuses.INVITED
            })));
        closeModal();
        actions.inviteContacts(selectedTeam, currentUser, _teamMembers);
    }


    const toggleContact = (email: ?string = ""): (()=>void) => () => {
        const hasContact = selectedContacts.indexOf(email) > -1;
        const newContacts = hasContact
            ? R.filter((_email: string): boolean => (_email !== email))(selectedContacts)
            : selectedContacts.concat(email);
        // $FlowFixMe - not sure why this is an error.
        setSelectedContacts(newContacts);
    };


    const _myContacts = myContacts
        .filter((contact: ContactType): boolean => isValidEmail(contact.email || "") && !isInTeam(teamMembers[selectedTeam.id], contact.email))
        .sort((a: ContactType, b: ContactType): number => {
            const bDisplay = (`${ b.firstName || "" }${ b.lastName || "" }${ b.email || "" }`).toLowerCase();
            const aDisplay = (`${ a.firstName || "" }${ a.lastName || "" }${ a.email || "" }`).toLowerCase();
            switch (true) {
                case(aDisplay < bDisplay):
                    return -1;
                case(aDisplay > bDisplay):
                    return 1;
                default:
                    return 0;
            }
        })
        .map((contact: ContactType, i: number): React$Element<any> => (Platform.OS === "ios")
            ? (
                <View key={ i }>
                    <IOSCheckBox
                        checked={ (selectedContacts.indexOf(contact.email) > -1) }
                        label={ getDisplayName(contact) }
                        onChange={ toggleContact(contact.email) }
                    />
                </View>
            )
            : (
                <TouchableHighlight key={ i } onPress={ toggleContact(contact.email) }>
                    <View style={ { flex: 1, flexDirection: "row", marginTop: 10 } }>
                        <CheckBox value={ (selectedContacts.indexOf(contact.email) > -1) }/>
                        <Text style={ { fontSize: 20, marginLeft: 10 } }>{ getDisplayName(contact) }</Text>
                    </View>
                </TouchableHighlight>
            )
        );

    return (
        <View style={ [styles.frame, { paddingTop: 30 }] }>
            <View style={ [styles.buttonBarHeader, { backgroundColor: "#EEE", marginTop: 10 }] }>
                <View style={ styles.buttonBar }>

                    <View style={ styles.buttonBarButton }>
                        <TouchableHighlight
                            style={ styles.headerButton }
                            onPress={ inviteToTeam }
                        >
                            <Text style={ styles.headerButtonText }>
                                { "Invite to Team" }</Text>
                        </TouchableHighlight>
                    </View>

                    <View style={ styles.buttonBarButton }>
                        <TouchableHighlight
                            style={ styles.headerButton }
                            onPress={ closeModal }
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
                    { _myContacts }
                </View>
            </ScrollView>
        </View>
    );
};


InviteContacts.navigationOptions = {
    title: "Invite Contacts"
};

const mapStateToProps = (state: Object): Object => {
    const selectedTeam = state.teams.selectedTeam;
    const currentUser = state.login.user;
    const teamMembers = state.teams.teamMembers;
    const contacts = state.teams.contacts;
    return { teamMembers, currentUser, selectedTeam, contacts };
};

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(InviteContacts);
