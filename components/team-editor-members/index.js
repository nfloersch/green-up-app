// @flow
import React, {Component} from 'react';
import {StyleSheet, FlatList, Image, Modal, Text, ScrollView, TouchableOpacity, View, Platform} from 'react-native';
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import {getMemberIcon} from '../../libs/member-icons';
import * as colors from '../../styles/constants';
import {defaultStyles} from '../../styles/default-styles';
import InviteContacts from '../invite-contacts';
import InviteForm from '../invite-form';
import TeamMemberDetails from '../../components/team-member-details';


const myStyles = {
    member: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
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
        borderBottomColor: '#888',
        marginBottom: 0,
        backgroundColor: '#EEE'
    }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);


type MProps = { item: Object }

class MemberItem extends Component<MProps> {

    render() {
        const item = this.props.item;
        return (
            <TouchableOpacity
                key={item.key}
                onPress={item.toDetail}
                style={styles.row}
            >
                <View style={[styles.member, {flex: 1, flexDirection: 'row', justifyContent: 'space-between'}]}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <Image
                            style={{width: 50, height: 50, marginRight: 10}}
                            source={{uri: item.photoURL}}
                        />
                        <Text style={[styles.memberEmail, {
                            flex: 1,
                            paddingTop: 12,
                            alignItems: 'stretch'
                        }]}>{item.displayName && item.displayName.trim() || item.email || ''}</Text>
                    </View>
                    {getMemberIcon(item.memberStatus, {paddingTop: 10, height: 50, width: 50}, true)}
                </View>
            </TouchableOpacity>
        );
    }
}


type Props = {
    members: Object,
    team: Object,
    selectedTeam: Object,
    screenProps: Object
};

type State = {
    isModalVisible: boolean,
    modalContent: Object
}

class TeamEditorMembers extends Component<Props, State> {

    static navigationOptions = {
        title: 'Team Members',
        tabBarLabel: 'Members',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({focused}) => (
            <Ionicons
                name={Platform.OS === 'ios' ? `ios-contacts${focused ? '' : ''}` : 'md-contacts'}
                size={24}
                color={focused ? colors.tabIconSelected : colors.tabIconDefault}
            />)
    };

    constructor(props) {
        super(props);
        this.state = {isModalVisible: false, modalContent: InviteForm};
    }

    closeModal = () => {
        this.setState({isModalVisible: false});
    };

    inviteContacts = (team: Object) => () => {
        this.setState({isModalVisible: true, modalContent: <InviteContacts closeModal={this.closeModal} team={team}/>});
    };

    inviteForm = (team: Object) => () => {
        this.setState({isModalVisible: true, modalContent: <InviteForm closeModal={this.closeModal} team={team}/>});
    };

    toMemberDetails = (team: Object, member: Object) => {
        const closeModal = this.closeModal;
        return () => {
            this.setState(
                {
                    isModalVisible: true,
                    modalContent: (
                        <TeamMemberDetails
                            closeModal={closeModal}
                            teamMember={member}
                        />
                    )
                });
        };
    };

    render() {
        const {team, members} = this.props;
        const memberButtons = Object.values(members)
            .map(member => ({
                key: member.uid || member.email,
                ...member,
                toDetail: this.toMemberDetails(team, member)
            }));

        return (
            <View style={styles.frame}>
                <View style={styles.buttonBarHeader}>
                    <View style={styles.buttonBar}>
                        <View style={styles.buttonBarButton}>
                            <TouchableOpacity
                                style={styles.headerButton}
                                onPress={this.inviteForm}>
                                <Text style={styles.headerButtonText}>
                                    {'Invite A Friend'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonBarButton}>
                            <TouchableOpacity
                                style={styles.headerButton}
                                onPress={this.inviteContacts}>
                                <Text style={styles.headerButtonText}>
                                    {'From Contacts'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.scroll}>
                    <View style={styles.infoBlockContainer}>
                        <FlatList data={memberButtons} renderItem={({item}) => (<MemberItem item={item}/>)}/>
                    </View>
                </ScrollView>
                <Modal
                    animationType={'slide'}
                    onRequestClose={() => {}}
                    transparent={false}
                    visible={this.state.isModalVisible}>
                    <View>
                        {this.state.modalContent}
                    </View>
                </Modal>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const team = state.teams.selectedTeam || {};
    const members = (state.teams.teamMembers || {})[team.id];
    return ({team, members});
};

export default connect(mapStateToProps)(TeamEditorMembers);
