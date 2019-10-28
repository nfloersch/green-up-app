// @flow
import React from "react";
import { Alert, StyleSheet, ScrollView, Text, View, Image, TouchableHighlight } from "react-native";
import MemberIcon from "../../components/member-icon";
import * as status from "../../constants/team-member-statuses";
import { defaultStyles } from "../../styles/default-styles";

const myStyles = {
    statusBar: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#FFE",
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#FDFDFE",
        width: "100%"
    },
    statusBarText: { fontSize: 12, textAlign: "left" }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type PropsType = {
    addTeamMember: () => void,
    closeModal: () => void,
    team?: Object,
    revokeInvitation: () => void,
    removeTeamMember: () => void,
    teamMember: Object
};


const TeamMemberDetails = ({ addTeamMember, closeModal, team, revokeInvitation, removeTeamMember, teamMember }: PropsType): React$Element<any> => {

    const addAnotherTeamMember = () => {
        closeModal();
        addTeamMember();
    };

    const unInvite = () => {
        Alert.alert(
            "DANGER!",
            "Are you sure you want to revoke this invitation?",
            [
                {
                    text: "No", onPress: () => {
                        closeModal();
                    }, style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        closeModal();
                        revokeInvitation();
                    }
                }
            ],
            { cancelable: true }
        );
    };

    const removeThisTeamMember = () => {
        Alert.alert(
            "DANGER!",
            "Are you sure you want to remove this team member?",
            [
                {
                    text: "No", onPress: () => {
                    }, style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        closeModal();
                        removeTeamMember();
                    }
                }
            ],
            { cancelable: true }
        );

    };


    const getButtons = (_team: Object, _teamMember: Object, closeMembersModal: () => void): React$Element<any> => {
        switch (_teamMember.memberStatus) {
            case status.REQUEST_TO_JOIN :
                return (
                    <View style={ [styles.buttonBarHeaderModal, { backgroundColor: "#EEE", marginTop: 10 }] }>
                        <View style={ styles.buttonBar }>
                            <View style={ styles.buttonBarButton }>
                                <TouchableHighlight
                                    style={ styles.headerButton }
                                    onPress={ removeThisTeamMember }>
                                    <Text style={ styles.headerButtonText }>{ "Ignore" }</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={ styles.buttonBarButton }>
                                <TouchableHighlight
                                    style={ styles.headerButton }
                                    onPress={ () => {
                                        addAnotherTeamMember();
                                    } }>
                                    <Text style={ styles.headerButtonText }>{ "Add" }</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={ styles.buttonBarButton }>
                                <TouchableHighlight
                                    style={ styles.headerButton }
                                    onPress={ closeMembersModal }
                                >
                                    <Text style={ styles.headerButtonText }>{ "Close" }</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                );
            case status.ACCEPTED :
                return (
                    <View style={ [styles.buttonBarHeaderModal, { backgroundColor: "#EEE", marginTop: 10 }] }>
                        <View style={ styles.buttonBar }>
                            <View style={ styles.buttonBarButton }>
                                <TouchableHighlight
                                    style={ styles.headerButton }
                                    onPress={ removeThisTeamMember }
                                >
                                    <Text style={ styles.headerButtonText }>{ "Remove" }</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={ styles.buttonBarButton }>
                                <TouchableHighlight
                                    style={ styles.headerButton }
                                    onPress={ closeMembersModal }
                                >
                                    <Text style={ styles.headerButtonText }>{ "Close" }</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                );
            case status.INVITED :
                return (
                    <View style={ [styles.buttonBarHeaderModal, { backgroundColor: "#EEE", marginTop: 10 }] }>
                        <View style={ styles.buttonBar }>
                            <View style={ styles.buttonBarButton }>
                                <TouchableHighlight
                                    style={ styles.headerButton }
                                    onPress={ unInvite }
                                >
                                    <Text style={ styles.headerButtonText }>{ "Revoke Invitation" }</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={ styles.buttonBarButton }>
                                <TouchableHighlight
                                    style={ styles.headerButton }
                                    onPress={ closeMembersModal }
                                >
                                    <Text style={ styles.headerButtonText }>{ "Close" }</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                );
            default :
                return (
                    <View style={ [styles.singleButtonHeader, { backgroundColor: "#EEE", marginTop: 10 }] }>
                        <View style={ styles.buttonBarButton }>
                            <TouchableHighlight
                                style={ styles.headerButton }
                                onPress={ closeMembersModal }
                            >
                                <Text style={ styles.headerButtonText }>{ "Close" }</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                );
        }
    };

    const getStatus = (_teamMember: Object): React$Element<any> => {
        switch (_teamMember.memberStatus) {
            case status.OWNER :
                return (
                    <View style={ styles.statusBar }>
                        <MemberIcon memberStatus={ status.OWNER }/>
                        <Text style={ styles.statusBarText }>
                            { `${ _teamMember.displayName && _teamMember.displayName.trim() || _teamMember.email }` } is
                            the owner of this team
                        </Text>
                    </View>
                );
            case status.REQUEST_TO_JOIN :
                return (
                    <View style={ styles.statusBar }>
                        <MemberIcon
                            memberStatus={ status.REQUEST_TO_JOIN }
                            isOwner={ _teamMember.memberStatus === status.OWNER }
                        />
                        <Text style={ styles.statusBarText }>
                            { _teamMember.displayName && _teamMember.displayName.trim() || _teamMember.email } wants
                            to
                            join this team
                        </Text>
                    </View>
                );
            case status.ACCEPTED :
                return (
                    <View style={ styles.statusBar }>
                        <MemberIcon memberStatus={ status.ACCEPTED }/>
                        <Text style={ styles.statusBarText }>
                            { _teamMember.displayName && _teamMember.displayName.trim() || _teamMember.email } is a
                            member of this team.
                        </Text>
                    </View>
                );
            case status.INVITED :
                return (
                    <View style={ styles.statusBar }>
                        <MemberIcon memberStatus={ status.INVITED }/>
                        <Text style={ styles.statusBarText }>
                            { `${ _teamMember.displayName && _teamMember.displayName.trim() || _teamMember.email } has not yet accepted the invitation` }
                        </Text>
                    </View>
                );

            default :
                return (
                    <View style={ styles.statusBar }>
                        <MemberIcon memberStatus={ status.NOT_INVITED }/>
                        <Text style={ styles.statusBarText }>
                            { _teamMember.displayName && _teamMember.displayName.trim() || _teamMember.email || "This person" } is
                            not a member of this
                            team
                        </Text>
                    </View>
                );
        }
    };

    return (
        <View style={ [styles.frame, { paddingTop: 30 }] }>
            { getButtons(team, teamMember, closeModal) }
            <ScrollView style={ styles.scroll }>
                <View style={ styles.infoBlockContainer }>
                    <View style={ styles.profileHeader }>
                        <Image
                            style={ { width: 50, height: 50 } }
                            source={ { uri: teamMember.photoURL } }
                        />
                        <Text style={ [styles.profileName, styles.heading] }>
                            { `${ teamMember.displayName && teamMember.displayName.trim() || teamMember.email || "" }` }
                        </Text>
                    </View>
                    <View>
                        { getStatus(teamMember) }
                    </View>
                    <View style={ { marginTop: 10 } }>
                        <Text
                            style={ styles.labelDark }>{ `About ${ teamMember.displayName && teamMember.displayName.trim() || "" }: ` }</Text>
                        <Text style={ { marginTop: 5 } }>{ teamMember.bio || "" }</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};


export default TeamMemberDetails;