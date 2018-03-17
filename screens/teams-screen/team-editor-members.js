/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, ScrollView, TouchableHighlight, View, Platform} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import {getMemberIcon} from '../../libs/member-icons';
import Colors from '../../constants/Colors';
import * as actions from './actions';
import * as memberStatus from '../../constants/team-member-statuses';
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
        marginBottom: 10
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
            <Ionicons name={Platform.OS === 'ios' ? `ios-contacts${focused ? '' : '-outline'}` : 'md-contacts'}
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
            <View key={members[membershipId].uid || members[membershipId].email} style={styles.item}>
                <TouchableHighlight onPress={this._toMemberDetails(teamId, membershipId)}>
                    <View style={styles.member}>
                        {getMemberIcon(members[membershipId].memberStatus)}
                        <Text style={styles.memberEmail}>{members[membershipId].email}</Text>
                    </View>
                </TouchableHighlight>
                <Text style={styles.memberName}>
                    {(`${members[membershipId].displayName} ${this.getStatusText(members[membershipId].memberStatus)}`).trim()}
                </Text>
            </View>

        ));

        return (
            <View style={styles.frame}>
                <View style={styles.buttonBarHeader}>
                    <View style={styles.buttonBar}>
                        <View style={styles.buttonBarButton}>
                            <TouchableHighlight
                                style={styles.button}
                                onPress={this.inviteForm}>
                                <Text style={styles.headerButton}>
                                    {'Invite A Friend'}
                                </Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.buttonBarButton}>
                            <TouchableHighlight
                                style={styles.button}
                                onPress={this.inviteContacts}>
                                <Text style={styles.headerButton}>
                                    {'From Contacts'}
                                </Text>
                            </TouchableHighlight>
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
