/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
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
        teamMembers: PropTypes.object
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
        const member = this.props.teamMembers[teamId][membershipId];
        const avatar = (member || {}).photoURL;


        function getButtons(teamMember: Object) {
            switch (teamMember.memberStatus) {
                case status.OWNER :
                    return (<View><Text style={styles.alertInfo}>You own this team</Text></View>);
                case status.REQUEST_TO_JOIN :
                    return (
                        <View>
                            <Text style={styles.alertInfo}>{teamMember.displayName || teamMember.email} wants to join your team</Text>
                            <View>
                              <Text>
                                {`About ${member.displayName || ''}: `}
                                  {member.bio || ''}
                              </Text>
                                <Button onPress={this._removeTeamMember(teamId, membershipId)} title={'Ignore'}/>
                                <Button onPress={() => {
                                    this._updateTeamMember(teamId, member)(status.ACCEPTED);
                                }} title={'Add To This Team'}/>
                            </View>
                        </View>
                    );
                case status.ACCEPTED :
                    return (
                        <View>
                            <Text style={{textAlign:'center'}}>{teamMember.displayName || teamMember.email} is a member of your team.</Text>
                            <View>
                                <Button onPress={this._removeTeamMember(teamId, member)} title={'Remove from Team'}/>
                            </View>
                        </View>
                    );
                case status.INVITED :
                    return (
                        <View>
                            <Text>
                                {`${teamMember.displayName || teamMember.email} has been invited to your team, but has yet to accept.`}
                            </Text>
                            <View style={styles.button}>
                                <Button onPress={this._revokeInvitation(teamId, membershipId)}
                                        title={'Revoke Invitation'}/>
                            </View>
                        </View>
                    );
                default :
                    return (<Text>{teamMember.displayName || teamMember.email} is not a member of your team</Text>);
            }
        }

        return (
            <View style={styles.container}>
                {
                    (Boolean(member)) &&

                    (
                        <View>
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
                              {getButtons.bind(this)(member)}
                            </View>
                        </View>
                    )
                }
            </View>
        );
    }
}

const mapStateToProps = state => {
    const teamMembers = state.teams.teamMembers || {};
    return {teamMembers};
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamMemberDetails);
