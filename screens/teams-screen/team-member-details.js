/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from './actions';
import {TeamMember} from '../../models/team-member';
import * as status from '../../constants/team-member-statuses';
import {defaultStyles} from '../../styles/default-styles';

const myStyles = {};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class TeamMemberDetails extends Component {
    static propTypes = {
        actions: PropTypes.object,
        navigation: PropTypes.object,
        profile: PropTypes.object,
        teamMembers: PropTypes.object,
        teams: PropTypes.object,
        currentUserId: PropTypes.string
    };

    static navigationOptions = {
        title: 'User Profile'
    };

    constructor(props) {
        super(props);
        this._updateTeamMember = this._updateTeamMember.bind(this);
        this._removeTeamMember = this._removeTeamMember.bind(this);
        this._cancel = this._cancel.bind(this);
        this.state = Object.assign({}, props.profile);
    }


    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.profile) !== JSON.stringify(this.props.profile)) {
            this.setState(nextProps.profile);
        }
    }

    _updateTeamMember(teamId: string, member: Object) {
        return (newStatus: Object) => {
            const _member = TeamMember.create(Object.assign({}, member, (newStatus ? {memberStatus: newStatus} : {})));
            this.props.navigation.goBack();
            this.props.actions.updateTeamMember(teamId, _member, newStatus);
        };
    }

    _revokeInvitation(teamId, membershipId) {
        return () => {
            this.props.navigation.goBack();
            this.props.actions.revokeInvitation(teamId, membershipId);
        };
    }

    _removeTeamMember(teamId: string, user: Object) {
        return () => {
            this.props.navigation.goBack();
            this.props.actions.removeTeamMember(teamId, user);
        };
    }

    _cancel() {
        this.setState(this.props.profile, () => {
            this.props.navigation.goBack();
        });
    }


    render() {
        const {membershipId, teamId} = this.props.navigation.state.params;
        const member = (this.props.teamMembers[teamId] || {})[membershipId];
        const avatar = (member || {}).photoURL;
        const isOwner = ((this.props.teams[teamId] || {}).owner || {}).uid === this.props.currentUserId;

        function getButtons(teamMember: Object = {}) {
            switch (teamMember.memberStatus) {
                case status.OWNER :
                    return null;
                case status.REQUEST_TO_JOIN :
                    return (
                        <View style={styles.buttonBarHeader}>
                            <View style={styles.buttonBar}>
                                <View style={styles.buttonBarButton}>
                                    <TouchableHighlight
                                        style={styles.headerButton}
                                        onPress={this._removeTeamMember(teamId, membershipId)}>
                                        <Text>{'Ignore'}</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        style={styles.headerButton}
                                        onPress={() => this._updateTeamMember(teamId, member)(status.ACCEPTED)}
                                    >
                                        <Text>{'Add To This Team'}</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    );
                case status.ACCEPTED :
                    return (
                        <View style={styles.singleButtonHeader}>
                            <TouchableHighlight
                                style={styles.singleButtonHeaderHighlight}
                                onPress={this._removeTeamMember(teamId, member)}
                            >
                                <Text style={styles.headerButton}>{'Remove from Team'}</Text>
                            </TouchableHighlight>
                        </View>
                    );
                case status.INVITED :
                    return (
                        <View style={styles.singleButtonHeader}>
                            <TouchableHighlight
                                style={styles.singleButtonHeaderHighlight}
                                onPress={this._revokeInvitation(teamId, membershipId)}
                            >
                                <Text style={styles.headerButton}>{'Revoke Invitation'}</Text>
                            </TouchableHighlight>
                        </View>
                    );
                default :
                    return null;
            }
        }

        function getStatus(teamMember: Object = {}) {
            switch (teamMember.memberStatus) {
                case status.OWNER :
                    return (
                        <View>
                            <Text style={styles.alertInfo}>
                                {`${teamMember.displayName || teamMember.email}`} is the owner of this team
                            </Text>
                        </View>
                    );
                case status.REQUEST_TO_JOIN :
                    return (
                        <View>
                            <Text style={styles.alertInfo}>
                                {teamMember.displayName || teamMember.email} wants to join this team
                            </Text>
                        </View>
                    );
                case status.ACCEPTED :
                    return (
                        <View>
                            <Text style={{textAlign: 'center'}}>
                                {teamMember.displayName || teamMember.email} is a member of this team.
                            </Text>
                        </View>
                    );
                case status.INVITED :
                    return (
                        <View>
                            <Text>
                                {`${teamMember.displayName || teamMember.email} has been invited to this team, but has yet to accept.`}
                            </Text>
                        </View>
                    );
                default :
                    return (<Text>{teamMember.displayName || teamMember.email} is not a member of this team</Text>);
            }
        }

        return (
            <View style={[styles.frame, {paddingLeft: 10, paddingRight: 10}]}>
                {isOwner ? getButtons.bind(this)(member) : (<View style={{height: 10}}/>)}
                <View style={styles.profileHeader}>
                    <Image
                        style={{width: 50, height: 50}}
                        source={{uri: avatar}}
                    />
                    <Text style={[styles.profileName, styles.heading]}>
                        {member.displayName || ''}
                    </Text>
                </View>
                <View>
                    {getStatus.bind(this)(member)}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const teamMembers = state.teams.teamMembers || {};
    const teams = state.teams.teams || {};
    const currentUserId = state.login.user.uid;
    return {teamMembers, teams, currentUserId};
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamMemberDetails);
