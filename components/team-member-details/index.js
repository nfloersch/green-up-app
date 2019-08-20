// @flow
import React, { Component } from "react";
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

type Props = {
    addTeamMember: 90 => void,
    closeModal: () => void,
    team?: Object,
    revokeInvitation: () => void,
    removeTeamMember: () => void,
    teamMember: Object,
    teams?: Object,
    updateTeamMember: () => void,
};


export default class TeamMemberDetails extends Component<Props> {

    constructor(props) {
        super(props);
        this._updateTeamMember = this._updateTeamMember.bind(this);
        this._removeTeamMember = this._removeTeamMember.bind(this);
        this._addTeamMember = this._addTeamMember.bind(this);
        this._revokeInvitation = this._revokeInvitation.bind(this);
        this._cancel = this._cancel.bind(this);
    }

    _updateTeamMember(newStatus) {
        return () => {
            Alert.alert("foo");
            this.props.closeModal();
            this.props.updateTeamMember(newStatus);
        };
    }

    _addTeamMember() {
        this.props.closeModal();
        this.props.addTeamMember();
    }

    _revokeInvitation() {
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
                        this.props.closeModal();
                        this.props.revokeInvitation();
                    }
                }
            ],
            { cancelable: true }
        );
    }


    _removeTeamMember() {
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
                        this.props.closeModal();
                        this.props.removeTeamMember();
                    }
                }
            ],
            { cancelable: true }
        );

    }

    _cancel() {
        Alert.alert("foo");
        this.props.closeModal();
    }

    render() {
        const { team, teamMember, closeModal } = this.props;

        const getButtons = (_team: Object, _teamMember: Object, _closeModal: () => void) => {
            switch (_teamMember.memberStatus) {
                case status.REQUEST_TO_JOIN :
                    return (
                        <View style={ [styles.buttonBarHeaderModal, { backgroundColor: "#EEE", marginTop: 10 }] }>
                            <View style={ styles.buttonBar }>
                                <View style={ styles.buttonBarButton }>
                                    <TouchableHighlight
                                        style={ styles.headerButton }
                                        onPress={ this._removeTeamMember }>
                                        <Text style={ styles.headerButtonText }>{ "Ignore" }</Text>
                                    </TouchableHighlight>
                                </View>
                                <View style={ styles.buttonBarButton }>
                                    <TouchableHighlight
                                        style={ styles.headerButton }
                                        onPress={ () => {
                                            this._addTeamMember();
                                        } }>
                                        <Text style={ styles.headerButtonText }>{ "Add" }</Text>
                                    </TouchableHighlight>
                                </View>
                                <View style={ styles.buttonBarButton }>
                                    <TouchableHighlight
                                        style={ styles.headerButton }
                                        onPress={ _closeModal }
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
                                        onPress={ this._removeTeamMember }
                                    >
                                        <Text style={ styles.headerButtonText }>{ "Remove" }</Text>
                                    </TouchableHighlight>
                                </View>
                                <View style={ styles.buttonBarButton }>
                                    <TouchableHighlight
                                        style={ styles.headerButton }
                                        onPress={ _closeModal }
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
                                        onPress={ this._revokeInvitation }
                                    >
                                        <Text style={ styles.headerButtonText }>{ "Revoke Invitation" }</Text>
                                    </TouchableHighlight>
                                </View>
                                <View style={ styles.buttonBarButton }>
                                    <TouchableHighlight
                                        style={ styles.headerButton }
                                        onPress={ _closeModal }
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
                                    onPress={ _closeModal }
                                >
                                    <Text style={ styles.headerButtonText }>{ "Close" }</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    );
            }
        };

        function getStatus(_teamMember: Object) {
            switch (_teamMember.memberStatus) {
                case status.OWNER :
                    return (
                        <View style={ styles.statusBar }>
                            <MemberIcon status={ status.OWNER }/>
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
        }

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
    }
}
