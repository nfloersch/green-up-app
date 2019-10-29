// @flow
import React, { useState } from "react";
import { StyleSheet, FlatList, Image, Modal, Text, ScrollView, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import MemberIcon from "../../components/member-icon";
import { defaultStyles } from "../../styles/default-styles";
import InviteContacts from "../invite-contacts";
import InviteForm from "../invite-form";
import TeamMemberDetails from "../../components/team-member-details";
import { partial } from "ramda";
import { bindActionCreators } from "redux";
import * as actionCreators from "../../action-creators/team-action-creators";

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

const MemberItem = ({ item }: MemberPropsType): React$Element<any> => (
    <TouchableOpacity
        key={ item.key }
        onPress={ item.toDetail }
        style={ styles.row }
    >
        <View style={ [styles.member, { flex: 1, flexDirection: "row", justifyContent: "space-between" }] }>
            <View style={ { flex: 1, flexDirection: "row", justifyContent: "flex-start" } }>
                <Image
                    style={ { width: 50, height: 50, marginRight: 10 } }
                    source={ { uri: item.photoURL } }
                />
                <Text style={ [styles.memberEmail, {
                    flex: 1,
                    paddingTop: 12,
                    alignItems: "stretch"
                }] }>{ item.displayName && item.displayName.trim() || item.email || "" }</Text>
            </View>
            <MemberIcon
                memberStatus={ item.memberStatus }
                style={ { paddingTop: 10, height: 50, width: 50 } }
                isOwner={ true }/>
        </View>
    </TouchableOpacity>
);


type PropsType = {
    actions: Object,
    invitations: Object,
    members: Object,
    requests: Object,
    team: Object
};

const TeamEditorMembers = ({ actions, team, members, requests, invitations }: PropsType): React$Element<any> => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    //
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

    const memberButtons = [].concat([], Object.values(requests), Object.values(members), Object.values(invitations))
        .map((member: Object, i: number): Object => ({
            key: i.toString(),
            ...member,
            toDetail: toMemberDetails(team, member)
        }));

    return (
        <View style={ styles.frame }>
            <View style={ styles.buttonBarHeader }>
                <View style={ styles.buttonBar }>
                    <View style={ styles.buttonBarButton }>
                        <TouchableOpacity
                            style={ styles.headerButton }
                            onPress={ inviteForm(team) }>
                            <Text style={ styles.headerButtonText }>
                                { "Invite A Friend" }
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.buttonBarButton }>
                        <TouchableOpacity
                            style={ styles.headerButton }
                            onPress={ inviteContacts(team) }>
                            <Text style={ styles.headerButtonText }>
                                { "From Contacts" }
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView style={ styles.scroll }>
                <View style={ styles.infoBlockContainer }>
                    <FlatList
                        data={ memberButtons }
                        renderItem={ ({ item }: Object): React$Element<any> => (<MemberItem item={ item }/>) }
                    />
                </View>
            </ScrollView>
            <Modal
                animationType={ "slide" }
                onRequestClose={ (): string => ("this function is required. Who knows why?") }
                transparent={ false }
                visible={ isModalVisible }>
                <View>
                    { modalContent }
                </View>
            </Modal>
        </View>
    );
};


TeamEditorMembers.navigationOptions = {
    title: "Team Members",
    tabBarLabel: "Members"
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
export default connect(mapStateToProps, mapDispatchToProps)(TeamEditorMembers);
