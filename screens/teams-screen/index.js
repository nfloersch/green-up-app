// @flow
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import MemberIcon from "../../components/member-icon";
import {
    FlatList,
    ImageBackground,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableHighlight,
    Modal,
    View,
    Platform
} from "react-native";
import NewTeam from "./new-team";
import TeamMember from "../../models/team-member";
import * as actions from "./actions";
import User from "../../models/user";
import { defaultStyles } from "../../styles/default-styles";
import { removeNulls } from "../../libs/remove-nulls";
import TeamSearch from "../../components/team-search";

const myStyles = {
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 70,
        alignItems: "stretch",
        marginBottom: 10
    },
    icon: {
        width: 50,
        paddingTop: 0
    },
    iconButton: {
        width: 50,
        padding: 10,
        height: 70
    },
    teamName: {
        flex: 4
    }
};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class TeamItem extends Component<{ item: Object }> {

    render() {
        const item = this.props.item || {};
        return (
            <View key={ item.key } style={ [styles.buttonRow] }>
                <TouchableHighlight
                    style={ [styles.altButton, {
                        height: 60,
                        marginRight: 1,
                        padding: 10,
                        flex: 1,
                        alignItems: "flex-start"
                    }] }
                    onPress={ item.goToTeam }
                >
                    <View style={ {
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    } }>
                        {item.toTeamIcon}
                        <Text style={ [styles.altButtonText] }>{item.name}</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={ [styles.altButton, styles.iconButton, {
                        height: 60,
                        marginLeft: 1,
                        marginRight: 1 }] }
                    onPress={ item.goToMessage }
                >
                    <View style={ {
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    } }>
                        <Ionicons
                            style={ { color: "#007AFF" } }
                            name={ (Platform.OS === "ios" ? "ios-chatbubbles" : "md-chatboxes") }
                            size={ 30 }
                        />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={ [styles.altButton, styles.iconButton, {
                        height: 60,
                        marginLeft: 1 }] }
                    onPress={ item.shareTeamDetails }
                >
                    <View style={ {
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    } }>
                        <Ionicons
                            style={ { color: "#007AFF" } }
                            name={ Platform.OS === "ios" ? "ios-share" : "md-share" }
                            size={ 30 }
                        />
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

type Props = {
    actions: Object,
    user: Object,
    handleError: any => any,
    invitations: Object,
    navigation: Object,
    teamMembers: Object,
    teams: Object,
    teamStati: Object,
    toTeamDetails: any => any
};

class TeamsScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.toTeamDetail = this.toTeamDetail.bind(this);
        this.toTeamSearch = this.toTeamSearch.bind(this);
        this.toNewTeamEditor = this.toNewTeamEditor.bind(this);
        this.state = { selectedTeamId: null, isModalVisible: false, messageText: "" };
    }

    static navigationOptions = {
        title: "My Teams",
        tabBarLabel: "Teams"
    };

    toTeamSearch(): void {
        this.setState({ openModal: "TEAM_SEARCH" });
    }

    toTeamDetail(team: Object, status: string): () => void {

        return () => {

            const _nextScreen = {
                [TeamMember.memberStatuses.INVITED]: "TeamDetails",
                [TeamMember.memberStatuses.OWNER]: "TeamEditor",
                [TeamMember.memberStatuses.NOT_INVITED]: "TeamDetails",
                [TeamMember.memberStatuses.ACCEPTED]: "TeamDetails"
            };

            this.props.actions.selectTeam(team);
            this.props.navigation.navigate(_nextScreen[status] || "TeamDetails", { status });
        };
    }

    toNewTeamEditor() {
        this.setState({ openModal: "NEW_TEAM" });
    }

    toTeamIcon = (teamKey: string, isInvited: boolean) => {
        const memberList = (this.props.teamMembers || {})[teamKey] || {};
        const status = (memberList[this.props.user.uid] || {}).memberStatus;
        // TODO : replace this hack.
        switch (true) {
            case isInvited: // We should check in the team invites here, not rely on the argument.
                return (<MemberIcon memberStatus={ TeamMember.memberStatuses.INVITED } />);
            case Boolean(status) : // This is okay
                return (<MemberIcon memberStatus={ status } />);
            default: // we should actually check to see if the user has requested to join
                return (<MemberIcon memberStatuss={ TeamMember.memberStatuses.REQUEST_TO_JOIN } />);
        }
    };

    shareTeamDetails = (team) => () => {
        const where = team.location ? `\nWhere : ${team.location}\n` : "";
        const date = team.date ? `When: ${team.date}\n` : "";
        const start = team.start ? `Start Time: ${team.start}\n` : "";
        const end = team.end ? `End Time: ${team.end}\n` : "";
        const owner = team.owner.displayName ? `Team Captain: ${team.owner.displayName}\n` : "";
        const town = team.town ? `Town: ${team.town}\n` : "";
        const notes = team.notes ? `Good to know: ${team.notes}\n` : "";
        const message = `Join my team "${team.name}" for Green Up Day!\n \
                ${where}${town}${date}${start}${end}${notes}${owner}`;
        const title = `I just joined ${team.name} for Green Up Day`;
        // const url = ''; // TODO: Add team deep link once that's implemented
        Share.share(
            {
                // content
                message: message,
                title: title
                // url: url // iOS only
            }, {
                // options
                dialogTitle: "Share Your Green Up Team Details", // Android Only
                subject: title, // iOS only
                tintColor: "green" // iOS only
            });
    };

    render() {
        const _closeModal = () => this.setState({ openModal: "none" });
        const { teams, teamStati, user } = this.props;
        const teamKeys = Object.keys((user.teams || {}));
        const invitedKeys = (Object.keys(this.props.invitations || {})).filter(key => teamKeys.indexOf(key) === -1);
        const invitedTeams = invitedKeys.filter(key => Boolean(teams[key])) // avoid null exceptions if team was deleted
            .map(key => ({
                key,
                toTeamIcon: this.toTeamIcon(key, true),
                ...(teams[key] || {}),
                goToTeam: this.toTeamDetail(teams[key], teamStati[key]),
                goToMessage: () => this.props.navigation.navigate("NewMessage", { selectedTeamId: key }),
                shareTeamDetails: this.shareTeamDetails(teams[key])
            }));

        const myTeams = teamKeys.filter(key => Boolean(teams[key])) // avoid null exceptions if team was deleted
            .map(key => ({
                key,
                toTeamIcon: this.toTeamIcon(key),
                ...(teams[key] || {}),
                goToTeam: this.toTeamDetail(teams[key], teamStati[key]),
                goToMessage: () => this.props.navigation.navigate("NewMessage", { selectedTeamId: key }),
                shareTeamDetails: this.shareTeamDetails(teams[key])
            })).concat(invitedTeams);

        return (
            <View style={ styles.frame }>
                <View style={ styles.buttonBarHeader }>
                    <View style={ styles.buttonBar }>
                        <View style={ styles.buttonBarButton }>
                            <TouchableHighlight
                                style={ styles.headerButton }
                                onPress={ this.toTeamSearch }>
                                <Text style={ styles.headerButtonText }>{"Search Teams"}</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={ styles.buttonBarButton }>
                            <TouchableHighlight
                                style={ styles.headerButton }
                                onPress={ this.toNewTeamEditor }>
                                <Text style={ styles.headerButtonText }>{"New Team"}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={ styles.frame }>
                    {myTeams.length === 0
                        ? (
                            <View style={ { flex: 1, justifyContent: "center" } }>
                                <View
                                    style={ {
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                        paddingTop: 20,
                                        paddingBottom: 20,
                                        backgroundColor: "rgba(255,255,255, 0.85)"
                                    } }>
                                    <Text
                                        style={ [styles.textDark] }>
                                        {"Green Up Day is all about community and teamwork."}
                                    </Text>
                                    <Text
                                        style={ [styles.textDark] }>
                                        {"Search for teams in your area, or create a new one and invite some friends."}
                                    </Text>
                                </View>
                            </View>
                        )
                        : (
                            <ScrollView style={ styles.scroll }>
                                <FlatList
                                    data={ myTeams }
                                    renderItem={ ({ item }) => (<TeamItem item={ item }/>) }
                                    style={ { paddingLeft: 10, paddingBottom: 10, paddingRight: 10 } }
                                />
                                <View style={ { height: 60 } } />
                            </ScrollView>
                        )
                    }
                </View>
                <Modal
                    animationType={ "slide" }
                    transparent={ false }
                    visible={ this.state.openModal === "TEAM_SEARCH" }
                    onRequestClose={ () => {
                    } }>
                    <TeamSearch closeModal={ _closeModal } navigation={ this.props.navigation }/>
                </Modal>
                <Modal
                    animationType={ "slide" }
                    transparent={ false }
                    visible={ this.state.openModal === "NEW_TEAM" }
                    onRequestClose={ () => {
                    } }>
                    <NewTeam closeModal={ _closeModal }/>
                </Modal>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const getStatus = (team: Object, invitations: Object, user: Object): string => {
        switch (true) {
            case team && team.owner && team.owner.uid === user.uid :
                return TeamMember.memberStatuses.OWNER;
            case team :
                return TeamMember.memberStatuses.ACCEPTED;

            case Boolean(Object.values(invitations).find(invite => invite.teamMember.uid === user.uid)) :
                // Match invitations on team and email
                // case Boolean(Object.entries(invitations).find(entry => entry[1].team.id == team.id && entry[1].teamMember.email === user.email)) :
                return TeamMember.memberStatuses.INVITED;
            default:
                return TeamMember.memberStatuses.NOT_INVITED;
        }
    };
    const invitations = state.teams.myInvitations || {};
    const user = User.create({ ...state.login.user, ...removeNulls(state.profile) });
    const teams = state.teams.teams || {};
    const teamMembers = state.teams.teamMembers || {};
    const teamStati = Object.entries(teams).reduce((obj, entry) => ({
        ...obj,
        [entry[0]]: getStatus(entry[1], invitations, user)
    }), {});
    return { teams, user, teamMembers, invitations, teamStati };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsScreen);
