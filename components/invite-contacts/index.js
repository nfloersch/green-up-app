// @flow
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView, TouchableOpacity
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../action-creators/team-action-creators";
import TeamMember from "../../models/team-member";
import { defaultStyles } from "../../styles/default-styles";
import { isValidEmail, isInTeam } from "../../libs/validators";
import * as R from "ramda";
import * as constants from "../../styles/constants";
import { ButtonBar } from "../button-bar/button-bar";
import { ListView, Button } from "@shoutem/ui";
import { FontAwesome } from "@expo/vector-icons";

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

    const [selectedContacts, setSelectedContacts] = useState([]);

    useEffect(() => {
        actions.retrieveContacts();
    }, []);

    const isSelected = email => selectedContacts.includes(email);

    function inviteToTeam() {
        const _teamMembers = contacts
            .filter((contact: ContactType): boolean => isSelected(contact.email))
            .map((contact: ContactType): TeamMemberType => TeamMember.create(Object.assign({}, contact, {
                displayName: `${ contact.firstName || "" } ${ contact.lastName || "" }`,
                memberStatus: TeamMember.memberStatuses.INVITED
            })));
        closeModal();
        actions.inviteContacts(selectedTeam, currentUser, _teamMembers);
    }


    const toggleContact = (email: ?string = ""): (()=>void) => () => {
        const newContacts = isSelected(email)
            ? R.filter((_email: string): boolean => (_email !== email))(selectedContacts)
            : selectedContacts.concat(email);
        // $FlowFixMe - not sure why this is an error.
        setSelectedContacts(newContacts);
    };


    const filterSortContacts = myContacts => myContacts
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
        });


    const renderRow = (contact: ContactType): React$Element<any> => (
        <TouchableOpacity
            onPress={ toggleContact(contact.email) }>
            <View style={ {
                flex: 1,
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "#AAA",
                padding: 20
            } }>
                <View style={ { width: 40, alignItems: "center", justifyContent: "center" } }>
                    <FontAwesome size={ 30 } name={ isSelected(contact.email) ? "envelope" : "plus-square" }/>
                </View>
                <Text style={ { fontSize: 20, marginLeft: 10 } }>{ getDisplayName(contact) }</Text>
            </View>
        </TouchableOpacity>
    );


    const headerButtons = [{ text: "Invite to Team", onClick: inviteToTeam }, { text: "Close", onClick: closeModal }];


    return (
        <SafeAreaView style={ [styles.container, { backgroundColor: constants.colorBackgroundDark }] }>
            <ButtonBar buttonConfigs={ headerButtons }/>
            <View style={ {
                flex: 1,
                backgroundColor: constants.colorBackgroundLight
            } }>
                <ListView
                    contentContainerStyle={ { backgroundColor: constants.colorBackgroundLight } }
                    data={ filterSortContacts(contacts) }
                    renderRow={ renderRow }
                />
            </View>
        </SafeAreaView>
    );
};


InviteContacts.navigationOptions = {
    title: "Invite Contacts",
    headerStyle: {
        backgroundColor: constants.colorBackgroundDark
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        fontFamily: "Rubik-Regular",
        fontWeight: "bold",
        fontSize: 20,
        color: constants.colorHeaderText
    },
    headerBackTitleStyle: {
        fontFamily: "Rubik-Regular",
        fontWeight: "bold",
        fontSize: 20,
        color: constants.colorHeaderText
    }
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
