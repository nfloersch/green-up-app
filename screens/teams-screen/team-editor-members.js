	/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, ScrollView, TouchableHighlight, View, Platform, Alert} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';

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
        teams: PropTypes.object,
        selectedTeam: PropTypes.object,
        screenProps: PropTypes.object
    };

    static navigationOptions = {
        title: 'Team Members',
        tabBarLabel: 'Members',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({tintColor}) => (<FontAwesome name='users' size={24} color='blue'/>)
    };

    constructor(props) {
        super(props);
        this.inviteContacts = this.inviteContacts.bind(this);
        this.inviteForm = this.inviteForm.bind(this);
        this.getIconColor = this.getIconColor.bind(this);
        this._toMemberDetails = this._toMemberDetails.bind(this);
    }

    inviteContacts() {
        this.props.screenProps.stacknav.navigate('InviteContacts');
    }

    inviteForm() {
        this.props.screenProps.stacknav.navigate('InviteForm');
    }

    getIconColor(status) {
        switch (status) {
            case 'ACCEPTED':
                return {
                    color: 'green'
                };
            case 'OWNER':
                return {
                    color: 'blue'
                };
            case 'INVITED':
                return {
                    color: 'orange'
                };
            case 'NOT_INVITED':
                return {
                    color: 'red'
                };
            case 'REQUEST_TO_JOIN':
                return {
                    color: 'purple'
                };
            default:
                return {
                    color: 'black'
                };
        }
    }

    _toMemberDetails(member: Object, team: Object) {
        return () => {
            this.props.screenProps.stacknav.navigate('TeamMemberDetails', {team, member});
        };
    }


    render() {
        const icons = {
            [memberStatus.REQUEST_TO_JOIN]: Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-plus',
            [memberStatus.ACCEPTED]: Platform.OS === 'ios' ? 'ios-checkmark-circle-outline' : 'md-checkmark',
            [memberStatus.INVITED]: Platform.OS === 'ios' ? 'ios-mail-outline' : 'md-mail',
            [memberStatus.OWNER]: Platform.OS === 'ios' ? 'ios-star-outline' : 'md-star'
        };

        const members = (this.props.selectedTeam.members || []).map(member => (
            <View key={member.uid || member.email} style={styles.item}>
                <TouchableHighlight onPress={this._toMemberDetails(member, this.props.selectedTeam)}>
                    <View style={styles.member}>
                        <Ionicons
                            name={icons[member.memberStatus] ||
                            (Platform.OS === 'ios' ? 'ios-help-outline' : 'md-help')}
                            size={30}
                            style={this.getIconColor(member.memberStatus)}/>
                        <Text style={styles.memberEmail}>{member.email}</Text>
                    </View>
                </TouchableHighlight>
                <Text style={styles.memberName}>
                    {(`${member.displayName}`).trim()}
                </Text>
            </View>

        ));

        return (
            <View style={styles.container}>
                <View>
                    <Button onPress={this.inviteContacts} title='Invite Contacts'/>
                    <Button onPress={this.inviteForm} title='Invite to Team'/>
                </View>
                <View>
                    <ScrollView>
                        {members}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        teams: state.teams.teams,
        selectedTeam: state.teams.selectedTeam
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamEditorMembers);
