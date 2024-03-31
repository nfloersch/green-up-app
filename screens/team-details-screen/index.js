// @flow
import React from "react";
import { Image, StyleSheet, Text, ScrollView, View, TouchableHighlight, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "@/action-creators/team-action-creators";
import { defaultStyles } from "@/styles/default-styles";
import * as teamMemberStatuses from "@/constants/team-member-statuses";
import User from "@/models/user";
import MemberIcon from "@/components/member-icon";
import TownItem from "@/components/town-item";
import MiniMap from "@/components/mini-map";
import * as constants from "@/styles/constants";
import { Divider, Caption } from "@shoutem/ui";
import ButtonBar from "@/components/button-bar";
import * as R from "ramda";
import { Title } from "@/components/text";

const myStyles = {
    memberStatusBanner: {
        paddingTop: 5,
        paddingBottom: 5
    },
    memberStatusMessage: {
        color: "white"
    },
    membership: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    teamMember: {
        height: 30,
        marginTop: 15
    },
    text: { color: "black", fontSize: 20, fontFamily: "Rubik-Regular" }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type PropsType = {
    actions: {
        removeTeamRequest: (string, UserType) => void,
        leaveTeam: (string, UserType) => void,
        acceptInvitation: (string, UserType) => void,
        revokeInvitation: (string, string) => void,
        askToJoinTeam: (TeamType, UserType) => void,
        joinTeam: (TeamType, UserType) => void
    },
    currentUser: Object,
    invitations: Object,
    navigation: Object,
    selectedTeam: Object,
    teamMembers: Object,
    teams: Object,
    town: Object,
    otherCleanAreas: Array<Object>
};

const TeamDetailsScreen = ({ actions, currentUser, invitations, navigation, selectedTeam, teamMembers, town }: PropsType): React$Element<any> => {


    // Handle bad team reference
    if (!selectedTeam || !selectedTeam.id) {
        return (
            <SafeAreaView style={ styles.container }>
                <View style={ { flex: 1, flexDirection: "row", marginTop: 50, justifyContent: "center" } }>
                    <Text style={ { color: "white", fontSize: 18 } }>{ "Sorry we couldn't find that team" }</Text>
                </View>
            </SafeAreaView>
        );
    }


    const declineInvitation = (teamId: string, membershipId: string) => {
        actions.revokeInvitation(teamId, membershipId);
    };

    const acceptInvitation = (teamId: string, user: Object) => {
        actions.acceptInvitation(teamId, user);
    };

    const leaveTeam = (teamId: string, user: Object) => {
        Alert.alert(
            "DANGER!",
            "Are you really, really sure you want to leave this team?",
            [
                {
                    text: "No",
                    onPress: () => {
                    },
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => {
                        navigation.goBack();
                        actions.leaveTeam(teamId, user);
                    }
                }
            ],
            { cancelable: true }
        );
    };

    const removeRequest = (teamId: string, user: Object) => {
        actions.removeTeamRequest(teamId, user);
        navigation.goBack();
    };

    const askToJoin = (team: Object, user: Object) => {
        actions.askToJoinTeam(team, user);
        navigation.navigate("Home");
    };

    const joinTeam = (team: Object, user: Object) => {
        actions.joinTeam(team, user);
        navigation.navigate("Home");
    };

    const toMemberDetails = (teamId: string, membershipId: string) => {
        navigation.navigate("TeamMemberDetails", { teamId, membershipId });
    };

    const memberKey = currentUser.uid;

    const hasInvitation = Boolean(invitations[selectedTeam.id]);

    const teamMemberList = (
        <View style={ { width: "100%" } }>
            <Text style={ { fontSize: 20, color: "white", textAlign: "center", marginTop: 10 } }>
                { "Team Members" }
            </Text>
            {
                Object
                    .values(teamMembers)
                    .map((member: Object, i: number): React$Element<any> => (
                        <TouchableHighlight
                            key={ i }
                            style={ {
                                borderStyle: "solid",
                                borderWidth: 1,
                                backgroundColor: "white",
                                width: "100%",
                                height: 52,
                                marginTop: 5
                            } }
                            onPress={ () => {
                                toMemberDetails(selectedTeam.id, member.uid);
                            } }>
                            <View style={ { flex: 1, flexDirection: "row" } }>
                                <View style={ { flex: 1, flexDirection: "row" } }>
                                    <Image
                                        style={ { width: 50, height: 50, marginRight: 10 } }
                                        source={ { uri: member.photoURL } }
                                    />
                                    <Text style={ styles.teamMember }>
                                        { member.displayName || member.email }
                                    </Text>
                                </View>
                                <MemberIcon
                                    memberStatus={ member.memberStatus }
                                    style={ { marginTop: 10, marginRight: 5 } }
                                />
                            </View>
                        </TouchableHighlight>
                    ))
            }
        </View>
    );

    const getTeamMemberStatus = (): string => {
        switch (true) {
            case hasInvitation:
                return teamMemberStatuses.INVITED;
            case ((currentUser.teams || {})[selectedTeam.id] || {}).isMember === false :
                return teamMemberStatuses.REQUEST_TO_JOIN;
            case (teamMembers[memberKey] || {}).memberStatus === teamMemberStatuses.OWNER :
                return teamMemberStatuses.OWNER;
            case (teamMembers[memberKey] || {}).memberStatus === teamMemberStatuses.ACCEPTED :
                return teamMemberStatuses.ACCEPTED;
            default:
                return teamMemberStatuses.NOT_INVITED;
        }
    };

    const memberStatus = getTeamMemberStatus();

    const isTeamMember = memberStatus === teamMemberStatuses.OWNER || memberStatus === teamMemberStatuses.ACCEPTED;

    const headerButtons = () => {
        switch (true) {
            case memberStatus === teamMemberStatuses.INVITED:
                return [
                    {
                        text: "Accept Invitation",
                        onClick: () => {
                            acceptInvitation(selectedTeam.id, currentUser);
                        }
                    },
                    {
                        text: "Decline Invitation",
                        onClick: () => {
                            declineInvitation(selectedTeam.id, currentUser.email);
                        }
                    }
                ];

            case selectedTeam.owner.uid === currentUser.uid :
                return [];
            case memberStatus === teamMemberStatuses.ACCEPTED :
                return [
                    {
                        text: "Leave Team", onClick: () => {
                            leaveTeam(selectedTeam.id, currentUser);
                        }
                    }
                ];
            case memberStatus === teamMemberStatuses.REQUEST_TO_JOIN :
                return [
                    {
                        text: "Remove Request", onClick: () => {
                            removeRequest(selectedTeam.id, currentUser);
                        }
                    }
                ];

            case selectedTeam.isPublic :
                return [
                    {
                        text: "Join this team", onClick: () => {
                            joinTeam(selectedTeam, currentUser);
                        }
                    }
                ];
            default :
                return [
                    {
                        text: "Ask to join this team", onClick: () => {
                            askToJoin(selectedTeam, currentUser);
                        }
                    }
                ];
        }
    };

    const getMemberStatus = (): ?React$Element<any> => {
        switch (true) {
            case memberStatus === teamMemberStatuses.INVITED:
                return (
                    <View style={ styles.membership }>
                        <MemberIcon
                            memberStatus={ teamMemberStatuses.INVITED }
                            size={ 20 }
                            style={ { color: "white" } }
                        />
                        <Text style={ styles.memberStatusMessage }>
                            { "You have been invited to this team" }
                        </Text>
                    </View>
                );
            case selectedTeam.owner.uid === currentUser.uid :
                return (
                    <View style={ styles.membership }>
                        <MemberIcon
                            memberStatus={ teamMemberStatuses.OWNER
                            } size={ 20 }
                            style={ { color: "white" } }/>
                        <Text style={ styles.memberStatusMessage }>
                            { "You are the owner of this team" }
                        </Text>
                    </View>
                );
            case memberStatus === teamMemberStatuses.ACCEPTED :
                return (
                    <View style={ styles.membership }>
                        <MemberIcon
                            memberStatus={ teamMemberStatuses.ACCEPTED }
                            size={ 20 }
                            style={ { color: "white" } }/>
                        <Text style={ styles.memberStatusMessage }>
                            { "You are a member of this team." }
                        </Text>
                    </View>);
            case memberStatus === teamMemberStatuses.REQUEST_TO_JOIN :
                return (
                    <View style={ styles.membership }>
                        <MemberIcon
                            memberStatus={ teamMemberStatuses.REQUEST_TO_JOIN }
                            size={ 20 }
                            style={ { color: "white" } }/>
                        <Text style={ styles.memberStatusMessage }>
                            { "Waiting on owner approval" }
                        </Text>
                    </View>
                );
            default :
                return null;
        }
    };

    return (
        <SafeAreaView style={ styles.container }>
            <ButtonBar buttonConfigs={ headerButtons() }/>
            <ScrollView style={ [styles.scroll, { padding: 20 }] }>
                <Title>{selectedTeam.name}</Title>
                { getMemberStatus() }
                <Divider
                    styleName="section-header"
                    style={ { backgroundColor: "#FFFFFFAA", marginTop: 20 } }
                >
                    <Caption>{ "INFORMATION" }</Caption>
                </Divider>
                <View style={ { width: "100%", backgroundColor: "white", padding: 20 } }>
                    <Text style={ styles.dataBlock }>
                        <Text style={ styles.text }>{ "Owner: " }</Text>
                        <Text style={ styles.text }>{ selectedTeam.owner.displayName }</Text>
                    </Text>
                    <Text style={ styles.dataBlock }>
                        <Text style={ styles.text }>{ "Where: " }</Text>
                        <Text
                            style={ styles.text }>{ `${ selectedTeam.location || "" }${ !selectedTeam.location || !selectedTeam.town ? "" : ", " }${ selectedTeam.town || "" }` }</Text>
                    </Text>
                    <Text style={ styles.dataBlock }>
                        <Text style={ styles.text }>{ "Date: " }</Text>
                        <Text style={ styles.text }>{ selectedTeam.date }</Text>
                    </Text>
                    <Text style={ styles.dataBlock }>
                        <Text style={ styles.text }>{ "Starts: " }</Text>
                        <Text style={ styles.text }>{ selectedTeam.start }</Text>
                    </Text>
                    <Text style={ styles.dataBlock }>
                        <Text style={ styles.text }>{ "Ends: " }</Text>
                        <Text style={ styles.text }>{ selectedTeam.end }</Text>
                    </Text>
                    { !selectedTeam.notes ? null
                        : <Text style={ styles.dataBlock }>
                            <Text style={ styles.text }>{ "Description: " }</Text>
                            <Text>{ selectedTeam.notes }</Text>
                        </Text>
                    }
                </View>

                <Divider
                    styleName="section-header"
                    style={ { backgroundColor: "#FFFFFFAA", marginTop: 20 } }
                >
                    <Caption>   { "CLEANING LOCATION" }</Caption>
                </Divider>

                {
                    (selectedTeam.locations || []).length > 0
                        ? (<MiniMap 
                            initialLocation={ 
                                {...selectedTeam.locations[0].coordinates,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421
                                } 
                            }
                            pinsConfig={ R.map(R.merge({title: selectedTeam.name, description: "team cleaning area", color: "orange"}),selectedTeam.locations) }
                            />)
                        : (<Text style={ {
                            fontSize: 14,
                            textAlign: "left",
                            padding: 20,
                            backgroundColor: "white",
                            color: "black"
                        } }>
                            { "The team owner has yet to designate a clean up location." }
                        </Text>)
                }
                {
                    Boolean(town)
                        ? (
                            <View style={ styles.block }>
                                <TownItem item={ town }/>
                            </View>)
                        : null
                }
                <View style={ [styles.block, {
                    borderTopWidth: 1,
                    borderBottomWidth: 0,
                    borderTopColor: "rgba(255,255,255,0.2)"
                }] }>
                    { isTeamMember ? teamMemberList : null }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const mapStateToProps = (state: Object): Object => {
    const selectedTownName = ((state.teams.selectedTeam || {}).town || "").toLowerCase();
    const town = Object
        .values((state.towns.townData || {}))
        .find((_town: Object): boolean => (_town.name || "").toLowerCase() === selectedTownName);
    const selectedTeam = state.teams.selectedTeam || {};
    const teamMembers = state.teams.teamMembers[selectedTeam.id] || {};
    const currentUser = User.create({ ...state.login.user, ...state.profile });
    const invitations = state.teams.myInvitations || {};
    return ({
        invitations,
        selectedTeam,
        currentUser,
        teamMembers,
        town
    });
};

TeamDetailsScreen.navigationOptions = {
    title: "Team Details",
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


const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailsScreen);
