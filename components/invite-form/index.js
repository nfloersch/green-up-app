// @flow
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    SafeAreaView,
    ScrollView
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isValidEmail, isInTeam } from "../../libs/validators";
import * as actionCreators from "../../action-creators/team-action-creators";
import TeamMember from "../../models/team-member";
import { defaultStyles } from "../../styles/default-styles";
import User from "../../models/user";
import { removeNulls } from "../../libs/remove-nulls";
import { ButtonBar } from "../button-bar/button-bar";
import { View, Text, TextInput } from "@shoutem/ui";
import * as constants from "../../styles/constants";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type PropsType = {
    actions: Object,
    currentUser: Object,
    closeModal: () => void,
    selectedTeam: TeamType,
    teamMembers: Object
};

const InviteForm = ({ actions, currentUser, closeModal, selectedTeam, teamMembers }: PropsType): React$Element<View> => {


    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


    const inviteToTeam = () => {
        const displayName = `${ firstName } ${ lastName }`;
        const teamMember = TeamMember.create({
            firstName,
            lastName,
            email,
            displayName,
            memberStatus: TeamMember.memberStatuses.INVITED
        });
        const myTeamMembers = teamMembers[selectedTeam.id];
        const emailIsInvalid = !isValidEmail(email) || isInTeam(myTeamMembers, email);

        if (emailIsInvalid) {
            Alert.alert("Please enter a valid email address");
        } else {
            actions.inviteContacts(selectedTeam, currentUser, [teamMember]);
            setFirstName("");
            setLastName("");
            setEmail("");
        }
    };

    const myTeamMembers = teamMembers[selectedTeam.id];
    const headerButtons = [{ text: "Invite to Team", onClick: inviteToTeam }, { text: "Close", onClick: closeModal }];
    return (
        <SafeAreaView style={ [styles.container, { backgroundColor: constants.colorBackgroundDark }] }>
            <ButtonBar buttonConfigs={ headerButtons }/>
            <ScrollView
                style={ [styles.scroll, { padding: 20 }] }
                automaticallyAdjustContentInsets={ false }
                scrollEventThrottle={ 200 }
                keyboardShouldPersistTaps={ "always" }
            >
                <View style={ styles.formControl }>
                    <Text style={ styles.label }>{ "Invitee's Email" }</Text>
                    <TextInput
                        autoCapitalize="none"
                        style={ styles.textInput }
                        placeholder="john@example.com"
                        value={ email || "" }
                        onChangeText={ setEmail }
                        underlineColorAndroid={ "transparent" }
                    />
                    <Text>{ isInTeam(myTeamMembers, email) ? "That person is already on the team" : " " }</Text>
                </View>
                <View style={ styles.formControl }>
                    <Text style={ styles.label }>{ "First Name" }</Text>
                    <TextInput
                        style={ styles.textInput }
                        value={ firstName }
                        onChangeText={ setFirstName }
                        placeholder="First"
                        underlineColorAndroid={ "transparent" }
                    />
                </View>
                <View style={ styles.formControl }>

                    <Text style={ styles.label }>{ "Last Name" }</Text>
                    <TextInput
                        style={ styles.textInput }
                        value={ lastName }
                        onChangeText={ setLastName }
                        placeholder="Last"
                        underlineColorAndroid={ "transparent" }
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


const mapStateToProps = (state: Object): Object => {
    const selectedTeam = state.teams.selectedTeam;
    const currentUser = User.create({ ...state.login.user, ...removeNulls(state.profile) });
    const teamMembers = state.teams.teamMembers;
    return { teamMembers, currentUser, selectedTeam };
};

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(InviteForm);
