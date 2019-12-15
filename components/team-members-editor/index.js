// @flow
import React, { useState } from "react";
import {
    StyleSheet,
    Image,
    Modal,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView
} from "react-native";
import { connect } from "react-redux";
import MemberIcon from "../../components/member-icon";
import { defaultStyles } from "../../styles/default-styles";
import InviteContacts from "../invite-contacts";
import InviteForm from "../invite-form";
import TeamMemberDetails from "../../components/team-member-details";
import { partial } from "ramda";
import { bindActionCreators } from "redux";
import * as actionCreators from "../../action-creators/team-action-creators";
import * as constants from "../../styles/constants";
import ButtonBar from "../button-bar/";
import { SimpleLineIcons } from "@expo/vector-icons";
import { ListView } from "@shoutem/ui";
import { getGravatar } from "../../models/user";

const myStyles = {
    member: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    memberEmail: {
        marginLeft: 10,
        lineHeight: 25
    },
    memberName: {
        marginLeft: 35,
        paddingBottom: 5,
        fontSize: 10,
        lineHeight: 10
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: "#888",
        marginBottom: 0,
        backgroundColor: "#EEE"
    }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type MemberPropsType = { item: Object };

type PropsType = {
    actions: Object,
    invitations: Object,
    members: Object,
    requests: Object,
    team: Object
};


const MemberItem = ({ item }: MemberPropsType): React$Element<any> => {
    return (
        <TouchableOpacity key={ item.id } onPress={ item.toDetail }>
            <View style={ {
                flex: 1,
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "#AAA"
            } }>
                <View style={ {
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 40,
                    maxWidth: 40,
                    marginLeft: 10
                } }>
                    <MemberIcon
                        memberStatus={ item.memberStatus }
                        isOwner={ item.isOwner }/>
                </View>
                <Image
                    style={ { width: 80, height: 80 } }
                    source={ { uri: (item.photoURL || getGravatar(item.email)) } }
                />
                <View style={ {
                    flex: 1,
                    flexDirection: "column",
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center"
                } }>
                    <Text style={ {
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#111",
                        fontSize: 16,
                        fontFamily: "Rubik-Regular"
                    } }>
                        { item.displayName && item.displayName.trim() || item.email || "" }
                    </Text>
                </View>
                <View>
                    <View style={ { flex: 1, justifyContent: "center", marginLeft: 20, marginRight: 10 } }>
                        <SimpleLineIcons
                            name={ "arrow-right" }
                            size={ 20 }
                            color="#333"
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const TeamMembersEditor = ({ actions, team, members, requests, invitations }: PropsType): React$Element<any> => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(<Text>FOO</Text>);

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const inviteContacts = (myTeam: Object): (any => any) => () => {
        setIsModalVisible(true);
        setModalContent(<InviteContacts closeModal={ closeModal } team={ myTeam }/>);
    };

    const inviteForm = (myTeam: Object): (any=>any) => () => {
        setIsModalVisible(true);
        setModalContent(<InviteForm closeModal={ closeModal } team={ myTeam }/>);
    };

    const toMemberDetails = (myTeam: Object, member: Object): (any => any) => {
        const removeTeamMember = partial(actions.removeTeamMember, [myTeam.id, member]);
        const revokeInvitation = partial(actions.revokeInvitation, [myTeam.id, member.email]);
        const updateTeamMember = partial(actions.updateTeamMember, [myTeam.id, member]);
        const addTeamMember = partial(actions.addTeamMember, [myTeam.id, member]);
        return () => {
            setModalContent(
                <TeamMemberDetails
                    closeModal={ closeModal }
                    addTeamMember={ addTeamMember }
                    removeTeamMember={ removeTeamMember }
                    revokeInvitation={ revokeInvitation }
                    updateTeamMember={ updateTeamMember }
                    teamMember={ member }
                />
            );
            setIsModalVisible(true);
        };
    };

    const memberRowData = [].concat([], Object.values(requests), Object.values(members), Object.values(invitations))
        .map((member: Object, i: number): Object => ({
            key: i.toString(),
            ...member,
            isOwner: (team.owner || {}).uid === member.id,
            toDetail: toMemberDetails(team, member)
        }));
    const headerButtons = [
        { text: "Invite A Friend", onClick: inviteForm(team) },
        { text: "Add From Contacts", onClick: inviteContacts(team) }
    ];


    return (
        <SafeAreaView style={ styles.frame }>
            <ButtonBar buttonConfigs={ headerButtons }/>
            <View style={ {
                flex: 1,
                backgroundColor: constants.colorBackgroundLight
            } }>
                <ListView
                    data={ memberRowData }
                    renderRow={ item => (<MemberItem item={ item }/>) }
                />
            </View>
            <Modal
                animationType={ "slide" }
                onRequestClose={ (): string => ("this function is required. Who knows why?") }
                transparent={ false }
                visible={ isModalVisible }>
                { modalContent }
            </Modal>
        </SafeAreaView>
    );
};


TeamMembersEditor.navigationOptions = {
    title: "Team Members",
    tabBarLabel: "Members",
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
    const team = state.teams.selectedTeam || {};
    const members = (state.teams.teamMembers || {})[team.id] || {};
    const requests = (state.teams.teamRequests || {})[team.id] || {};
    const invitations = (state.teams.invitations || {})[team.id] || {};
    return ({ team, members, requests, invitations });
};

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({ actions: bindActionCreators(actionCreators, dispatch) });

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(TeamMembersEditor);
