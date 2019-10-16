// @flow
import React, { Component } from "react";
import { Alert, StyleSheet, ScrollView, Text, View, Image, TouchableHighlight } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MemberIcon from "../../components/member-icon";
import * as actionCreators from "./actions";
import TeamMember from "../../models/team-member";
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
type Props = {
    actions: {
        updateTeamMember: (teamId: string, _member: Object, newStatus: string) => void,
        removeTeamMember: (teamId: string, user: Object) => void,
        deleteMessage: (currentUserId: string, id: string) => void,
        revokeInvitation: (teamId: string, membershipId: string) => void
    },
    messages: Object,
    navigation: Object,
    profile: Object,
    teamMembers: Object,
    teams: Object,
    currentUserId: string
};

class TeamMemberDetails extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = Object.assign({}, props.profile);
    }


    componentWillReceiveProps(nextProps: Object) {
        const { membershipId, teamId } = nextProps.navigation.state.params;
        const member = (nextProps.teamMembers[teamId] || {})[membershipId];
        if (!member) {
            nextProps.navigation.goBack();
        }
        if (JSON.stringify(nextProps.profile) !== JSON.stringify(this.props.profile)) {
            this.setState(nextProps.profile);
        }
    }

    static navigationOptions = {
        title: "User Profile"
    };

    render() {
        const { teamMembers, navigation, teams, actions, currentUserId, messages } = this.props;
        const { membershipId, teamId } = navigation.state.params;
        const member = (teamMembers[teamId] || {})[membershipId] || {};
        const avatar = (member || {}).photoURL;
        const isOwner = ((teams[teamId] || {}).owner || {}).uid === currentUserId;

        const updateTeamMember = (newStatus: Object) => () => {
            const messageIds = Object.keys(messages).filter(id => messages[id].teamId === teamId && messages[id].type === "REQUEST_TO_JOIN" && messages[id].sender.uid === member.uid);
            messageIds.map(id => actions.deleteMessage(currentUserId, id));
            const _member = TeamMember.create(Object.assign({}, member, (newStatus ? { memberStatus: newStatus } : {})));
            navigation.goBack();
            actions.updateTeamMember(teamId, _member, newStatus);
        };

        const revokeInvitation = () => {
            Alert.alert(
                "DANGER!",
                "Are you sure you want to revoke this invitation?",
                [
                    {
                        text: "No", onPress: () => {
                        }, style: "cancel"
                    },
                    {
                        text: "Yes", onPress: () => {
                            navigation.goBack();
                            actions.revokeInvitation(teamId, membershipId);
                        }
                    }
                ],
                { cancelable: true }
            );

        };

        const removeTeamMember = () => {
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
                            const messageIds = Object.keys(messages).filter(id => messages[id].teamId === teamId && messages[id].type === "REQUEST_TO_JOIN" && messages[id].sender.uid === member.uid);
                            messageIds.map(id => actions.deleteMessage(currentUserId, id));
                            navigation.goBack();
                            return actions.removeTeamMember(teamId, member);
                        }
                    }
                ],
                { cancelable: true }
            );

        };

        // const cancel = () => {
        //     this.setState(this.props.profile, () => {
        //         navigation.goBack();
        //     });
        // };

        const getButtons = (teamMember: Object = {}) => {
            switch (teamMember.memberStatus) {
                case status.OWNER :
                    return null;
                case status.REQUEST_TO_JOIN :
                    return (
                        <View style={ styles.buttonBarHeader }>
                            <View style={ styles.buttonBar }>
                                <View style={ styles.buttonBarButton }>
                                    <TouchableHighlight
                                        style={ styles.headerButton }
                                        onPress={ removeTeamMember }>
                                        <Text style={ styles.headerButtonText }>{ "Ignore" }</Text>
                                    </TouchableHighlight>
                                </View>
                                <View style={ styles.buttonBarButton }>
                                    <TouchableHighlight
                                        style={ styles.headerButton }
                                        onPress={ updateTeamMember(status.ACCEPTED) }>
                                        <Text style={ styles.headerButtonText }>{ "Add to Team" }</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    );
                case status.ACCEPTED :
                    return (
                        <View style={ styles.singleButtonHeader }>
                            <TouchableHighlight
                                style={ styles.headerButton }
                                onPress={ removeTeamMember }
                            >
                                <Text style={ styles.headerButtonText }>{ "Remove from Team" }</Text>
                            </TouchableHighlight>
                        </View>
                    );
                case status.INVITED :
                    return (
                        <View style={ styles.singleButtonHeader }>
                            <TouchableHighlight
                                style={ styles.headerButton }
                                onPress={ revokeInvitation }
                            >
                                <Text style={ styles.headerButtonText }>{ "Revoke Invitation" }</Text>
                            </TouchableHighlight>
                        </View>
                    );
                default :
                    return null;
            }
        };

        function getStatus(teamMember: Object = {}, _isOwner: boolean) {
            switch (teamMember.memberStatus) {
                case status.OWNER :
                    return (
                        <View style={ styles.statusBar }>
                            <MemberIcon memberStatus={ status.OWNER }/>
                            <Text style={ styles.statusBarText }>
                                { `${ teamMember.displayName && teamMember.displayName.trim() || teamMember.email }` } is
                                the owner of this team
                            </Text>
                        </View>
                    );
                case status.REQUEST_TO_JOIN :
                    return (
                        <View style={ styles.statusBar }>
                            <MemberIcon memberStatus={ status.REQUEST_TO_JOIN } isOwner={ _isOwner }/>
                            <Text style={ styles.statusBarText }>
                                { teamMember.displayName && teamMember.displayName.trim() || teamMember.email } wants to
                                join this team
                            </Text>
                        </View>
                    );
                case status.ACCEPTED :
                    return (
                        <View style={ styles.statusBar }>
                            <MemberIcon memberStatus={ status.ACCEPTED }/>
                            <Text style={ styles.statusBarText }>
                                { teamMember.displayName && teamMember.displayName.trim() || teamMember.email } is a
                                member of this team.
                            </Text>
                        </View>
                    );
                case status.INVITED :
                    return (
                        <View style={ styles.statusBar }>
                            <MemberIcon memberStatus={ status.INVITED }/>
                            <Text style={ styles.statusBarText }>
                                { `${ teamMember.displayName && teamMember.displayName.trim() || teamMember.email } has not yet accepted the invitation` }
                            </Text>
                        </View>
                    );
                default :
                    return (
                        <View style={ styles.statusBar }>
                            <MemberIcon memberStatus={ status.NOT_INVITED }/>
                            <Text style={ styles.statusBarText }>
                                { teamMember.displayName && teamMember.displayName.trim() || teamMember.email || "This person" } is
                                not a member of this
                                team
                            </Text>
                        </View>);
            }
        }

        return (
            <View style={ styles.frame }>
                { isOwner ? getButtons.bind(this)(member) : (<View style={ { height: 10 } }/>) }
                <ScrollView style={ styles.scroll }>
                    <View style={ styles.infoBlockContainer }>
                        <View style={ styles.profileHeader }>
                            <Image
                                style={ { width: 50, height: 50 } }
                                source={ { uri: avatar } }
                            />
                            <Text style={ [styles.profileName, styles.heading] }>
                                { `${ member.displayName && member.displayName.trim() || member.email || "" }` }
                            </Text>
                        </View>
                        <View>
                            { getStatus.bind(this)(member, isOwner) }
                        </View>
                        <View style={ { marginTop: 10 } }>
                            <Text
                                style={ styles.labelDark }>{ `About ${ member.displayName && member.displayName.trim() || "" }: ` }</Text>
                            <Text
                                style={ { marginTop: 5 } }>{ member.bio || "This person has not completed a bio :-(" }</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>

        );
    }
}

const mapStateToProps = state => {
    const messages = state.messages.messages || {};
    const teamMembers = state.teams.teamMembers || {};
    const teams = state.teams.teams || {};
    const currentUserId = state.login.user.uid;
    return { messages, teamMembers, teams, currentUserId };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamMemberDetails);
