// @flow
import React, { useState } from "react";
import {
    Alert,
    TouchableHighlight,
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isValidEmail, isInTeam } from "../../libs/validators";
import * as actionCreators from "../../action-creators/team-action-creators";
import TeamMember from "../../models/team-member";
import { defaultStyles } from "../../styles/default-styles";
import User from "../../models/user";
import { removeNulls } from "../../libs/remove-nulls";

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
    return (

        <View style={ [styles.frame, { paddingTop: 30 }] }>
            <View style={ [styles.singleButtonHeader, { backgroundColor: "#EEE", marginTop: 10 }] }>
                <View style={ styles.buttonBar }>

                    <View style={ styles.buttonBarButton }>
                        <TouchableHighlight
                            style={ styles.headerButton }
                            onPress={ inviteToTeam }
                        >
                            <Text style={ styles.headerButtonText }>{ "Invite to Team" }</Text>
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

            <KeyboardAvoidingView
                style={ styles.frame }
                behavior={ Platform.OS === "ios" ? "padding" : null }
            >
                <ScrollView style={ styles.scroll }>
                    <View style={ styles.infoBlockContainer }>
                        <Text style={ styles.labelDark }>{ "Invitee's Email" }</Text>
                        <TextInput
                            autoCapitalize="none"
                            style={ styles.textInput }
                            placeholder="john@example.com"
                            value={ email || "" }
                            onChangeText={ setEmail }
                            underlineColorAndroid={ "transparent" }
                        />
                        <Text>{ isInTeam(myTeamMembers, email) ? "That person is already on the team" : " " }</Text>
                        <Text style={ styles.labelDark }>{ "First Name" }</Text>
                        <TextInput
                            style={ styles.textInput }
                            value={ firstName }
                            onChangeText={ setFirstName }
                            placeholder="First"
                            underlineColorAndroid={ "transparent" }
                        />
                        <Text style={ styles.labelDark }>{ "Last Name" }</Text>
                        <TextInput
                            style={ styles.textInput }
                            value={ lastName }
                            onChangeText={ setLastName }
                            placeholder="Last"
                            underlineColorAndroid={ "transparent" }
                        />
                    </View>
                    {
                        Platform.OS === "ios"
                            ? (<View style={ defaultStyles.padForIOSKeyboard }/>)
                            : null
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

InviteForm.navigationOptions = {
    title: "Invite Team Members"
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
