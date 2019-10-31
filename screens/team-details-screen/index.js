// @flow
import React from "react";
import { Image, StyleSheet, Text, ScrollView, View, TouchableHighlight, Alert, SafeAreaView } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../action-creators/team-action-creators";
import { defaultStyles } from "../../styles/default-styles";
import * as teamMemberStatuses from "../../constants/team-member-statuses";
import User from "../../models/user";
import MemberIcon from "../../components/member-icon";
import TownItem from "../../components/town-item";
import MiniMap from "../../components/mini-map";

const myStyles = {
    memberStatusBanner: {
        paddingTop: 5,
        paddingBottom: 5
    },
    teamMember: {
        height: 30,
        marginTop: 15
    }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type PropsType = {
    actions: {
        removeTeamRequest: (string, UserType) => void,
        leaveTeam: (string, UserType) => void,
        acceptInvitation: (string, UserType) => void,
        revokeInvitation: (string, string) => void,
        askToJoinTeam: (TeamType, UserType) => void
    },
    currentUser: Object,
    invitations: Object,
    locations: Array<Object>,
    navigation: Object,
    selectedTeam: Object,
    teamMembers: Object,
    teams: Object,
    town: Object,
    otherCleanAreas: Array<Object>
};

const TeamDetailsScreen = ({ actions, currentUser, invitations, locations, navigation, selectedTeam, teamMembers, town }: PropsType): React$Element<any> => {

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
        navigation.goBack();
        actions.removeTeamRequest(teamId, user);
    };

    const askToJoin = (team: Object, user: Object) => {
        actions.askToJoinTeam(team, user);
    };

    const toMemberDetails = (teamId: string, membershipId: string) => {
        navigation.navigate("TeamMemberDetails", { teamId, membershipId });
    };

    const memberKey = currentUser.uid;

    const hasInvitation = Boolean(invitations[selectedTeam.id]);

    const teamMemberList = (
        <View style={ { width: "100%" } }>
            <Text style={ [styles.textDark, { textAlign: "center" }] }>
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
            case (teamMembers[memberKey] || {}).memberStatus === teamMemberStatuses.OWNER :
                return teamMemberStatuses.OWNER;
            case (teamMembers[memberKey] || {}).memberStatus === teamMemberStatuses.ACCEPTED :
                return teamMemberStatuses.ACCEPTED;
            case hasInvitation:
                return teamMemberStatuses.INVITED;
            case ((currentUser.teams || {})[selectedTeam.id] || {}).isMember === false :
                return teamMemberStatuses.REQUEST_TO_JOIN;
            default:
                return teamMemberStatuses.NOT_INVITED;
        }
    };

    const memberStatus = getTeamMemberStatus();

    const isTeamMember = memberStatus === teamMemberStatuses.OWNER || memberStatus === teamMemberStatuses.ACCEPTED;

    const getStatusButtons = (): ?React$Element<any> => {
        switch (true) {
            case memberStatus === teamMemberStatuses.INVITED:
                return (
                    <View style={ styles.buttonBarHeader }>
                        <View style={ styles.buttonBar }>
                            <View style={ styles.buttonBarButton }>
                                <TouchableHighlight
                                    style={ styles.headerButton }
                                    onPress={ () => {
                                        acceptInvitation(selectedTeam.id, currentUser);
                                    } }>
                                    <Text style={ styles.headerButtonText }>
                                        { "Accept Invitation" }
                                    </Text>
                                </TouchableHighlight>
                            </View>
                            <View style={ styles.buttonBarButton }>
                                <TouchableHighlight
                                    style={ styles.headerButton }
                                    onPress={ () => {
                                        declineInvitation(selectedTeam.id, currentUser.email);
                                    } }>
                                    <Text style={ styles.headerButtonText }>
                                        { "Decline Invitation" }
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                );
            case selectedTeam.owner.uid === currentUser.uid :
                return null;
            case memberStatus === teamMemberStatuses.ACCEPTED :
                return (
                    <View style={ styles.singleButtonHeader }>
                        <TouchableHighlight
                            style={ styles.headerButton }
                            onPress={ () => {
                                leaveTeam(selectedTeam.id, currentUser);
                            } }>
                            <Text style={ styles.headerButtonText }>
                                { "Leave Team" }
                            </Text>
                        </TouchableHighlight>
                    </View>
                );
            case memberStatus === teamMemberStatuses.REQUEST_TO_JOIN :
                return (
                    <View style={ styles.singleButtonHeader }>
                        <TouchableHighlight
                            style={ styles.headerButton }
                            onPress={ () => {
                                removeRequest(selectedTeam.id, currentUser);
                            } }>
                            <Text style={ styles.headerButtonText }>
                                { "Remove Request" }
                            </Text>
                        </TouchableHighlight>
                    </View>
                );
            default :
                return (
                    <View style={ styles.singleButtonHeader }>
                        <TouchableHighlight
                            style={ styles.headerButton }
                            onPress={ () => {
                                askToJoin(selectedTeam, currentUser);
                            } }>
                            <Text style={ styles.headerButtonText }>{ "Ask to join this team" }</Text>
                        </TouchableHighlight>
                    </View>
                );
        }
    };

    const getMemberStatus = (): ?React$Element<any> => {
        switch (true) {
            case memberStatus === teamMemberStatuses.INVITED:
                return (
                    <View style={ styles.statusBar }>
                        <MemberIcon memberStatus={ teamMemberStatuses.INVITED }/>
                        <Text style={ styles.statusMessage }>
                            { "You have been invited to this team" }
                        </Text>
                    </View>
                );
            case selectedTeam.owner.uid === currentUser.uid :
                return (
                    <View style={ styles.statusBar }>
                        <MemberIcon memberStatus={ teamMemberStatuses.OWNER }/>
                        <Text style={ styles.statusMessage }>
                            { "You are the owner of this team" }
                        </Text>
                    </View>
                );
            case memberStatus === teamMemberStatuses.ACCEPTED :
                return (
                    <View style={ styles.statusBar }>
                        <MemberIcon memberStatus={ teamMemberStatuses.ACCEPTED }/>
                        <Text style={ styles.statusMessage }>
                            { "You are a member of this team." }
                        </Text>
                    </View>);
            case memberStatus === teamMemberStatuses.REQUEST_TO_JOIN :
                return (
                    <View style={ styles.statusBar }>
                        <MemberIcon memberStatus={ teamMemberStatuses.REQUEST_TO_JOIN }/>
                        <Text style={ styles.statusMessage }>
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
            { getStatusButtons() }
            <ScrollView style={ styles.scroll }>
                <View style={ styles.infoBlockContainer }>
                    { getMemberStatus() }
                    <View style={ styles.block }>
                        <Text style={ [styles.textDark, { textAlign: "center" }] }>
                            { selectedTeam.name }
                        </Text>
                        <View style={ { width: "100%" } }>
                            <Text style={ styles.dataBlock }>
                                <Text style={ styles.labelDark }>{ "Owner: " }</Text>
                                <Text style={ styles.dataDark }>{ selectedTeam.owner.displayName }</Text>
                            </Text>
                            <Text style={ styles.dataBlock }>
                                <Text style={ styles.labelDark }>{ "Where: " }</Text>
                                <Text
                                    style={ styles.dataDark }>{ `${ selectedTeam.location || "" }${ !selectedTeam.location || !selectedTeam.town ? "" : ", " }${ selectedTeam.town || "" }` }</Text>
                            </Text>
                            <Text style={ styles.dataBlock }>
                                <Text style={ styles.labelDark }>{ "Date: " }</Text>
                                <Text style={ styles.dataDark }>{ selectedTeam.date }</Text>
                            </Text>
                            <Text style={ styles.dataBlock }>
                                <Text style={ styles.labelDark }>{ "Starts: " }</Text>
                                <Text style={ styles.dataDark }>{ selectedTeam.start }</Text>
                            </Text>
                            <Text style={ styles.dataBlock }>
                                <Text style={ styles.labelDark }>{ "Ends: " }</Text>
                                <Text style={ styles.dataDark }>{ selectedTeam.end }</Text>
                            </Text>
                            { !selectedTeam.notes ? null
                                : <Text style={ styles.dataBlock }>
                                    <Text style={ styles.labelDark }>{ "Description: " }</Text>
                                    <Text>{ selectedTeam.notes }</Text>
                                </Text>
                            }
                        </View>
                    </View>
                    <View style={ [styles.block, { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.2)" }] }>
                        <Text style={ [styles.textDark, { textAlign: "center" }] }>
                            { "Clean Up Location" }
                        </Text>

                        {
                            (locations || []).length > 0
                                ? (<MiniMap pins={ selectedTeam.locations }/>)
                                : (<Text style={ [styles.textDark, { fontSize: 14, textAlign: "left" }] }>
                                    { "The team owner has yet to designate a clean up location." }
                                </Text>)
                        }
                    </View>
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
                </View>
                <View style={ defaultStyles.padForIOSKeyboard }/>
            </ScrollView>
        </SafeAreaView>
    );
};


const mapStateToProps = (state: Object): Object => {
    const selectedTownName = ((state.teams.selectedTeam || {}).town || "").toLowerCase();
    const town = Object
        .values((state.towns.townData || {}))
        .find((_town: Object): boolean => (_town.name || "").toLowerCase() === selectedTownName);
    return ({
        locations: state.teams.locations,
        invitations: state.teams.myInvitations || {},
        selectedTeam: state.teams.selectedTeam,
        currentUser: User.create({ ...state.login.user, ...state.profile }),
        teamMembers: state.teams.teamMembers,
        town
    });
};

TeamDetailsScreen.navigationOptions = { title: "Team Details" };


const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailsScreen);
