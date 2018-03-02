/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, ScrollView, View, Button} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import {defaultStyles} from '../../styles/default-styles';
import * as teamMemberStatuses from '../../constants/team-member-statuses';

const myStyles = {
    teamTitle: {
        backgroundColor: 'darkseagreen',
        paddingTop: 10,
        paddingBottom: 10
    },
    dataBlock: {
        marginTop: 10,
        marginBottom: 10
    },
    memberStatusBanner: {
        paddingTop: 5,
        paddingBottom: 5
    }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class TeamDetails extends Component {
    static propTypes = {
        actions: PropTypes.object,
        currentUser: PropTypes.object,
        invitations: PropTypes.object,
        selectedTeam: PropTypes.object,
        teamMembers: PropTypes.object,
        teams: PropTypes.object
    };

    static navigationOptions = {
        title: 'Team Details'
    };

    constructor(props) {
        super(props);
        this._askToJoin = this._askToJoin.bind(this);
        this._leaveTeam = this._leaveTeam.bind(this);
        this._acceptInvitation = this._acceptInvitation.bind(this);
        this._declineInvitation = this._declineInvitation.bind(this);
        this.state = {hasAsked: false};
    }

    componentWillReceiveProps(nextProps: Object) {
        if (JSON.stringify(nextProps.selectedTeam) !== JSON.stringify(this.props.selectedTeam)) {
            this.setState({hasAsked: false});
        }
    }


    _declineInvitation(teamId: string, membershipId: string) {
        return () => this.props.actions.revokeInvitation(teamId, membershipId);
    }

    _acceptInvitation(teamId: string, user: Object) {
        return () => this.props.actions.acceptInvitation(teamId, user);
    }

    _leaveTeam(teamId: string, user: Object) {
        return () => this.props.actions.leaveTeam(teamId, user);
    }

    _askToJoin(teamId: string, user: Object) {
        return () => {
            this.setState({hasAsked: true}, () => {
                this.props.actions.askToJoinTeam(teamId, user);
            });
        };
    }

    render() {
        const {currentUser, selectedTeam} = this.props;
        const getMemberStatus = () => {
            const memberKey = currentUser.email.toLowerCase().replace(/\./g, ':');
            const membership = ((this.props.teamMembers || {})[selectedTeam.id] || {})[memberKey];
            const hasInvitation = Boolean(this.props.invitations[selectedTeam.id]);
            const memberStatus = (membership && membership.memberStatus) || (hasInvitation && teamMemberStatuses.INVITED);
            switch (true) {
                case memberStatus === teamMemberStatuses.INVITED:
                    return (
                        <View>
                            <Button
                                style={styles.button}
                                onPress={this._acceptInvitation(selectedTeam.id, currentUser)}
                                title='Accept Invitation'/>
                            <Button
                                style={styles.button}
                                onPress={this._declineInvitation(selectedTeam.id, currentUser.email)}
                                title={'Decline Invitation'}/>
                        </View>
                    );
                case selectedTeam.owner.uid === currentUser.uid :
                    return (<Text style={styles.alertInfo}>{'You own this team'}</Text>);
                case memberStatus === teamMemberStatuses.ACCEPTED :
                    return (
                        <View>
                            <Text style={styles.alertDanger}>
                                {'You are already a member'}
                            </Text>
                            <Button
                                style={styles.button}
                                onPress={this._leaveTeam(selectedTeam.id, currentUser)}
                                title='Leave Team'/>
                        </View>
                    );
                case this.state.hasAsked || (memberStatus === teamMemberStatuses.REQUEST_TO_JOIN) :
                    return (
                        <Text style={styles.alertInfo}>
                            {'Waiting on the Team Manager to approve your request'}
                        </Text>
                    );
                default :
                    return (
                        <Button
                            style={styles.button}
                            onPress={this._askToJoin(selectedTeam.id, currentUser)}
                            title='Ask to join this group'/>
                    );
            }
        };
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={[styles.heading2, styles.teamTitle]}>
                    {selectedTeam.name}
                </Text>
                <View style={styles.memberStatusBanner}>
                    {getMemberStatus()}
                </View>
                <View style={{alignSelf: 'flex-start'}}>
                    <Text style={styles.dataBlock}>
                        <Text style={styles.label}>{'Where: '}</Text>
                        <Text style={styles.data}>{selectedTeam.location}, {selectedTeam.town}</Text>
                    </Text>
                    <Text style={styles.dataBlock}>
                        <Text style={styles.label}>{'Start: '}</Text>
                        <Text style={styles.data}>{selectedTeam.start}</Text>
                    </Text>
                    <Text style={styles.dataBlock}>
                        <Text style={styles.label}>{'Ends: '}</Text>
                        <Text style={styles.data}>{selectedTeam.end}</Text>
                    </Text>
                    <Text style={styles.dataBlock}>
                        <Text style={styles.label}>{'Notes: '}</Text>
                        <Text>{selectedTeam.notes}</Text>
                    </Text>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => ({
    invitations: state.teams.invitations || {},
    teams: state.teams.teams,
    selectedTeam: state.teams.selectedTeam,
    currentUser: state.login.user,
    teamMembers: state.teams.teamMembers
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(TeamDetails);
