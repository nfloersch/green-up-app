/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import * as actions from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {TeamMember} from '../../models/team-member';
import * as status from '../../constants/team-member-statuses';

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 10,
        color: '#000',
        padding: 10
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%'
    },
    headerButton: {
        // flex: 1,
        width: 32
    },
    message: {
        fontSize: 20,
        textAlign: 'left',
        margin: 15,
        color: 'red'
    },
    messageRead: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#555'
    },
    inputStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 2,
        color: '#262626',
        fontSize: 18,
        fontWeight: '200',
        height: 40,
        width: '100%',
        textAlign: 'left',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    buttonRow: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        marginTop: 10
    },
    button: {
        width: '49%',
        backgroundColor: '#F00',
        justifyContent: 'center',
        padding: 10,
        marginLeft: 3
    },
    inputRow: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        margin: 10
    },
    inputRowLabel: {
        width: '20%',
        margin: 5
    },
    inputRowControl: {
        width: '75%',
        margin: 5,
        borderStyle: 'solid',
        borderColor: '#AAA',
        borderWidth: 1,
        padding: 5
    }
});


class TeamMemberDetails extends Component {
    static propTypes = {
        actions: PropTypes.object,
        currentUser: PropTypes.object,
        profile: PropTypes.object,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Person'
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

    _updateTeamMember(teamId: string, membershipId: string, member: Object) {
        return (newStatus: Object) => {
            const _member = TeamMember.create(Object.assign({}, member, (newStatus? {memberStatus: newStatus} : {})));
            this.props.actions.updateTeamMember(teamId, membershipId, _member);
        };
    }

    _removeTeamMember(team, member) {
        return () => {
            this.props.actions.removeTeamMember(team, member);
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
        const avatar = member.photoURL;

        function getButtons(teamMember: Object) {
            switch (teamMember.memberStatus) {
                case status.OWNER :
                    return (<View><Text>You own this team</Text></View>);
                case status.REQUEST_TO_JOIN :
                    return (
                        <View>
                            <Text>{teamMember.displayName || teamMember.email} wants to join your team</Text>
                            <View>
                                <Button onPress={() => {
                                    this._removeTeamMember(teamId, membershipId);
                                }} title={'Ignore'}/>
                                <Button onPress={() => {
                                    this._updateTeamMember(teamId, membershipId, teamMember)(status.ACCEPTED);
                                }} title={'Add To This Team'}/>
                            </View>
                        </View>
                    );
                case status.ACCEPTED :
                    return (
                        <View>
                            <Text>{teamMember.displayName || teamMember.email} is a member of your team</Text>
                            <View>
                                <Button onPress={() => {
                                    this.props.actions.removeTeamMember(teamId, membershipId);
                                }} title={'Remove from Team'}/>
                            </View>
                        </View>
                    );
                case status.INVITED :
                    return (
                        <View>
                            <Text>
                                {teamMember.displayName || teamMember.email} is invited to your team, but has yet to
                                accept
                            </Text>
                            <View>
                                <Button onPress={() => {
                                    this.props.actions.removeTeamMember(teamId, membershipId);
                                }} title={'Revoke Invitation'}/>
                            </View>
                        </View>
                    );
                default :
                    return (<Text>{teamMember.displayName || teamMember.email} is not a member of your team</Text>);
            }
        }

        return (
            <View style={styles.container}>
                <View>
                    <Image
                        style={{width: 50, height: 50}}
                        source={{uri: avatar}}
                    />
                    <Text style={styles.inputRowLabel}>{member.displayName || ''}</Text>
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.inputRowLabel}>{`About ${member.displayName || ''}`}</Text>
                    <Text>
                        {member.bio || ''}
                    </Text>
                </View>
                <View style={styles.buttonRow}>
                    {getButtons.bind(this)(member)}
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const currentUser = state.login.user;
    const profile = state.profile.profile;
    const teamMembers = state.teams.teamMembers || {};
    return {profile, currentUser, teamMembers};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamMemberDetails);
