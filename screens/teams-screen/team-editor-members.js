/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Image, Text, ScrollView, TouchableOpacity, View, Platform} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import {getMemberIcon} from '../../libs/member-icons';
import Colors from '../../constants/Colors';
import * as actions from './actions';
import {defaultStyles} from '../../styles/default-styles';

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


class TeamEditorMembers extends Component {
    static propTypes = {
        actions: PropTypes.object,
        teamMembers: PropTypes.object,
        teams: PropTypes.object,
        selectedTeam: PropTypes.object,
        screenProps: PropTypes.object
    };

    static navigationOptions = {
        title: 'Team Members',
        tabBarLabel: 'Members',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({focused}) => (
            <Ionicons
                name={Platform.OS === 'ios' ? `ios-contacts${focused ? '' : '-outline'}` : 'md-contacts'}
                size={24}
                color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />)
    };

    constructor(props) {
        super(props);
    }

    inviteContacts = () => {
        this.props.screenProps.stacknav.navigate('InviteContacts');
    };

    inviteForm = () => {
        this.props.screenProps.stacknav.navigate('InviteForm');
    };

    getStatusText = status => {
        switch (status) {
            case 'ACCEPTED':
                return 'is on this team';
            case 'OWNER':
                return 'owns this team';
            case 'INVITED':
                return 'has been invited';
            case 'NOT_INVITED':
                return 'has not been invited';
            case 'REQUEST_TO_JOIN':
                return 'is asking to join this team';
            default:
                return '';
        }
    };

    _toMemberDetails(teamId: string, membershipId: string) {
        return () => {
            this.props.screenProps.stacknav.navigate('TeamMemberDetails', {teamId, membershipId});
        };
    }


    render() {
        const teamId = this.props.selectedTeam.id;
        const members = this.props.teamMembers[teamId] || {};
        const memberButtons = Object.keys(members).map(membershipId => (
            <TouchableOpacity
                key={members[membershipId].uid || members[membershipId].email}
                onPress={this._toMemberDetails(teamId, membershipId)}
                style={styles.row}
            >
                <View style={styles.member}>
                    <Image
                        style={{width: 50, height: 50, marginRight: 10}}
                        source={{uri: members[membershipId].photoURL}}
                    />
                    <Text style={styles.memberEmail}>{members[membershipId].email}</Text>
                    {getMemberIcon(members[membershipId].memberStatus, {}, true)}
                </View>
            </TouchableOpacity>
        ));

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
                    {memberButtons}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => (
    {
        teams: state.teams.teams,
        selectedTeam: state.teams.selectedTeam,
        teamMembers: state.teams.teamMembers
    });


const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(actions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(TeamEditorMembers);
