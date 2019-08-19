// @flow
import React, { Component } from "react";
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

import * as actions from "./actions";
import TeamMember from "../../models/team-member";
import { defaultStyles } from "../../styles/default-styles";
import User from "../../models/user";
import { removeNulls } from "../../libs/remove-nulls";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

function _onChangeEmail(value) {
    this.setState({ email: (value || "").trim() });
}

function _changeInvitee(key) {
    return (value) => {
        this.setState({ [key]: value });
    };
}

function _inviteToTeam() {
    const displayName = `${this.state.firstName} ${this.state.lastName}`;
    const teamMember = TeamMember.create(Object.assign({}, this.state, {
        displayName,
        memberStatus: TeamMember.memberStatuses.INVITED
    }));
    const teamMembers = this.props.teamMembers[this.props.selectedTeam.id];
    const emailIsInvalid = !isValidEmail(this.state.email) || isInTeam(teamMembers, this.state.email);

    if (emailIsInvalid) {
        Alert.alert("Please enter a valid email address");
    } else {
        this.props.actions.inviteContacts(this.props.selectedTeam, this.props.currentUser, [teamMember]);
        this.setState({ firstName: "", lastName: "", email: "" });
    }
}


type Props = {
    actions: Object,
    currentUser: Object,
    closeModal: () => void,
    selectedTeam: Object,
    teamMembers: Object
};

class InviteForm extends Component<Props> {

    static navigationOptions = {
        title: "Invite Team Members"
    };

    constructor(props) {
        super(props);
        this.inviteToTeam = _inviteToTeam.bind(this);
        this.changeInvitee = _changeInvitee.bind(this);
        this.onChangeEmail = _onChangeEmail.bind(this);
        this.state = { firstName: "", lastName: "", email: "" };
    }


    render() {
        const teamMembers = this.props.teamMembers[this.props.selectedTeam.id];
        return (

            <View style={ [styles.frame, { paddingTop: 30 }] }>
                <View style={ [styles.singleButtonHeader, { backgroundColor: "#EEE", marginTop: 10 }] }>
                    <View style={ styles.buttonBar }>

                        <View style={ styles.buttonBarButton }>
                            <TouchableHighlight
                                style={ styles.headerButton }
                                onPress={ this.inviteToTeam }
                            >
                                <Text style={ styles.headerButtonText }>{"Invite to Team"}</Text>
                            </TouchableHighlight>
                        </View>


                        <View style={ styles.buttonBarButton }>
                            <TouchableHighlight
                                style={ styles.headerButton }
                                onPress={ this.props.closeModal }
                            >
                                <Text style={ styles.headerButtonText }>{"Close"}</Text>
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
                            <Text style={ styles.labelDark }>
                                Invitee&apos;s Email
                            </Text>
                            <TextInput
                                autoCapitalize="none"
                                style={ styles.textInput }
                                placeholder="john@example.com"
                                value={ this.state.email || "" }
                                onChangeText={ this.onChangeEmail }
                                underlineColorAndroid={ "transparent" }
                            />
                            <Text>{isInTeam(teamMembers, this.state.email) ? "That person is already on the team" : " "}</Text>
                            <Text style={ styles.labelDark }>
                                First Name
                            </Text>
                            <TextInput
                                style={ styles.textInput }
                                value={ this.state.firstName }
                                onChangeText={ this.changeInvitee("firstName") }
                                placeholder="First"
                                underlineColorAndroid={ "transparent" }
                            />
                            <Text style={ styles.labelDark }>
                                Last Name
                            </Text>
                            <TextInput
                                style={ styles.textInput }
                                value={ this.state.lastName }
                                onChangeText={ this.changeInvitee("lastName") }
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
    }
}

const mapStateToProps = (state) => {
    const selectedTeam = state.teams.selectedTeam;
    const currentUser = User.create({ ...state.login.user, ...removeNulls(state.profile) });
    const teamMembers = state.teams.teamMembers;
    return { teamMembers, currentUser, selectedTeam };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(InviteForm);
