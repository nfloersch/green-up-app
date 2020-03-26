// @flow
import React from "react";
import { Alert, StyleSheet, ScrollView, Text, View, Image, SafeAreaView } from "react-native";
import MemberIcon from "../../components/member-icon";
import * as status from "../../constants/team-member-statuses";
import { defaultStyles } from "../../styles/default-styles";
import * as constants from "../../styles/constants";
import { ButtonBar } from "../button-bar/button-bar";
import { defaultGravatar } from "../../libs/avatars";

const myStyles = {
    statusBar: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#FFE",
        marginBottom: 10,
        marginTop: 5,
        padding: 10,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderColor: "#AAA"
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

    const getButtons = (_team: Object, _teamMember: Object, closeMembersModal: () => void): Array<Object> => {
        switch (_teamMember.memberStatus) {
            case status.REQUEST_TO_JOIN :
                return [
                    { text: "Ignore", onClick: removeThisTeamMember },
                    {
                        text: "Add",
                        onClick: addAnotherTeamMember
                    },
                    { text: "Close", onClick: closeMembersModal }
                ];
            case status.ACCEPTED :
                return [
                    { text: "Remove", onClick: removeThisTeamMember },
                    {
                        text: "Close",
                        onClick: closeMembersModal
                    }
                ];
            case status.INVITED :
                return [
                    { text: "Revoke Invitation", onClick: unInvite },
                    {
                        text: "Close",
                        onClick: closeMembersModal
                    }
                ];
            default :
                return [{ text: "Close", onClick: closeMembersModal }];

        }
    };

    const getStatus = (_teamMember: Object): React$Element<any> => {
        switch (_teamMember.memberStatus) {
            case status.OWNER :
                return (
                    <View style={ styles.statusBar }>
                        <MemberIcon memberStatus={ status.OWNER }/>
                        <View>
                            <Text style={ styles.statusBarText }>
                                {
                                    `${ _teamMember.displayName && _teamMember.displayName.trim() || _teamMember.email } is  the owner of this team`
                                }
                            </Text>
                        </View>
                    </View>
                );
            case status.REQUEST_TO_JOIN :
                return (
                    <View style={ styles.statusBar }>
                        <MemberIcon
                            memberStatus={ status.REQUEST_TO_JOIN }
                            isOwner={ _teamMember.memberStatus === status.OWNER }
                        />
                        <View>
                            <Text style={ styles.statusBarText }>
                                {
                                    `${ _teamMember.displayName && _teamMember.displayName.trim() || _teamMember.email } wants to join this team`
                                }
                            </Text>
                        </View>
                    </View>
                );
            case status.ACCEPTED :
                return (
                    <View style={ styles.statusBar }>
                        <MemberIcon memberStatus={ status.ACCEPTED }/>
                        <View>
                            <Text style={ styles.statusBarText }>
                                {
                                    `${ _teamMember.displayName && _teamMember.displayName.trim() || _teamMember.email } is a member of this team.`
                                }
                            </Text>
                        </View>
                    </View>
                );
            case status.INVITED :
                return (
                    <View style={ styles.statusBar }>
                        <MemberIcon memberStatus={ status.INVITED }/>
                        <View>
                            <Text style={ styles.statusBarText }>
                                {
                                    `${ _teamMember.displayName && _teamMember.displayName.trim() || _teamMember.email } has not yet accepted the invitation`
                                }
                            </Text>
                        </View>
                    </View>
                );

            default :
                return (
                    <View style={ styles.statusBar }>
                        <MemberIcon memberStatus={ status.NOT_INVITED }/>
                        <View>
                            <Text style={ styles.statusBarText }>
                                {
                                    `${ _teamMember.displayName && _teamMember.displayName.trim() || _teamMember.email || "This person" } is not a member of this team`
                                }
                            </Text>
                        </View>
                    </View>
                );
        }
    };

    return (
        <SafeAreaView style={ [styles.container, { backgroundColor: constants.colorBackgroundDark }] }>
            <ButtonBar buttonConfigs={ getButtons(team, teamMember, closeModal) }/>
            <ScrollView
                style={ { padding: 0, margin: 0 } }
                automaticallyAdjustContentInsets={ false }
                scrollEventThrottle={ 200 }
                keyboardShouldPersistTaps={ "always" }
            >

                { getStatus(teamMember) }

                <View style={ styles.profileHeader }>
                    <Image
                        style={ { width: 50, height: 50 } }
                        source={ { uri: teamMember.photoURL || defaultGravatar } }
                    />
                    <Text style={ [styles.profileName, styles.heading] }>
                        { `${ teamMember.displayName && teamMember.displayName.trim() || teamMember.email || "" }` }
                    </Text>
                </View>

                <View style={ { marginTop: 10 } }>
                    <Text style={ styles.label }>{ teamMember.bio || "" }</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


export default TeamMemberDetails;