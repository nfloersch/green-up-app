/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, Text, ScrollView, View, TouchableHighlight, Alert} from 'react-native';
import {MapView} from 'expo';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import {defaultStyles} from '../../styles/default-styles';
import * as teamMemberStatuses from '../../constants/team-member-statuses';
import {TeamMember} from '../../models/team-member';
import {getMemberIcon} from '../../libs/member-icons';

const myStyles =
    {

        teamTitle: {
            backgroundColor: 'darkseagreen',
            paddingTop: 10,
            paddingBottom: 10
        },
        dataBlock: {
            marginTop: 10,
            marginBottom: 10,
            width: '100%'
        },
        memberStatusBanner: {
            paddingTop: 5,
            paddingBottom: 5
        },
        statusBar: {
            height: 30,
            width: '100%',
            marginBottom: 10,
            paddingLeft: 10,
            paddingRight: 10
        },
        statusMessage: {
            height: 30,
            paddingTop: 8,
            marginLeft: 10,
            fontSize: 14
        },
        teamMember: {
            height: 30,
            marginTop: 15
        }
    };

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class TeamDetails extends Component {
    static propTypes = {
        actions: PropTypes.object,
        currentUser: PropTypes.object,
        invitations: PropTypes.object,
        locations: PropTypes.array,
        navigation: PropTypes.object,
        selectedTeam: PropTypes.object,
        teamMembers: PropTypes.object,
        teams: PropTypes.object,
        otherCleanAreas: PropTypes.array
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

        const {locations} = this.props;

        const initialMapLocation = locations && locations.length > 0 ? {
            latitude: Number(locations[0].coordinates.latitude),
            longitude: Number(locations[0].coordinates.longitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        } : null;

        this.state = {
            hasAsked: false,
            initialMapLocation: initialMapLocation
        };
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
        Alert.alert(
            'DANGER!',
            'Are you really, really sure you want to leave this team?',
            [
                {
                    text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'
                },
                {
                    text: 'Yes', onPress: () => {
                        this.props.navigation.goBack();
                        return this.props.actions.leaveTeam(teamId, user);
                    }
                }
            ],
            {cancelable: true}
        );
    }

    _removeRequest(teamId: string, user: Object) {
        return () => {
            this.props.navigation.goBack();
            this.props.actions.leaveTeam(teamId, user);
        };
    }

    _askToJoin(team: Object, user: Object) {
        return () => {
            this.setState({hasAsked: true}, () => {
                this.props.actions.askToJoinTeam(team, user);
            });
        };
    }


    _toMemberDetails(teamId: string, membershipId: string) {
        return () => {
            this.props.navigation.navigate('TeamMemberDetails', {teamId, membershipId});
        };
    }

    render() {
        const {currentUser, selectedTeam} = this.props;
        const teamMembers = this.props.teamMembers[selectedTeam.id] || {};
        const memberKey = currentUser.email.toLowerCase().replace(/\./g, ':');
        const membership = ((this.props.teamMembers || {})[selectedTeam.id] || {})[memberKey];
        const hasInvitation = Boolean(this.props.invitations[selectedTeam.id]);
        const memberStatus = (membership && membership.memberStatus) || (hasInvitation && teamMemberStatuses.INVITED);
        const isTeamMember = memberStatus === teamMemberStatuses.OWNER || memberStatus === teamMemberStatuses.ACCEPTED;

        const teamMemberList = (
            <View style={{width: '100%'}}>
                <Text style={[styles.heading]}>
                    {'Team Members'}
                </Text>
                {
                    Object
                        .values(teamMembers)
                        .map((member, i) => (
                            <TouchableHighlight
                                key={i} style={{
                                    borderStyle: 'solid',
                                    borderWidth: 1,
                                    width: '100%',
                                    height: 52,
                                    marginTop: 5
                                }}
                                onPress={this._toMemberDetails(selectedTeam.id, member.email.toLowerCase().replace(/\./g, ':'))}>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Image
                                            style={{width: 50, height: 50, marginRight: 10}}
                                            source={{uri: member.photoURL}}
                                        />
                                        <Text style={styles.teamMember}>
                                            {member.displayName || member.email}
                                        </Text>
                                    </View>
                                    {getMemberIcon(member.memberStatus, {marginTop: 10, marginRight: 5})}
                                </View>
                            </TouchableHighlight>
                        ))
                }
            </View>
        );


        const getStatusButtons = () => {
            switch (true) {
                case memberStatus === teamMemberStatuses.INVITED:
                    return (
                        <View style={styles.buttonBarHeader}>
                            <View style={styles.buttonBar}>
                                <View style={styles.buttonBarButton}>
                                    <TouchableHighlight
                                        style={styles.button}
                                        onPress={this._acceptInvitation(selectedTeam.id, currentUser)}>
                                        <Text style={styles.headerButton}>
                                            {'Accept Invitation'}
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                                <View style={styles.buttonBarButton}>
                                    <TouchableHighlight
                                        style={styles.button}
                                        onPress={this._declineInvitation(selectedTeam.id, currentUser.email)}>
                                        <Text style={styles.headerButton}>
                                            {'Decline Invitation'}
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    );
                case selectedTeam.owner.uid === currentUser.uid :
                    return null;
                case memberStatus === teamMemberStatuses.ACCEPTED :
                    return (
                        <View style={styles.singleButtonHeader}>
                            <TouchableHighlight
                                style={styles.singleButtonHeaderHighlight}
                                onPress={() => this._leaveTeam(selectedTeam.id, currentUser)}>
                                <Text style={styles.headerButton}>
                                    {'Leave Team'}
                                </Text>
                            </TouchableHighlight>
                        </View>
                    );
                case this.state.hasAsked || (memberStatus === teamMemberStatuses.REQUEST_TO_JOIN) :
                    return (
                        <View style={styles.singleButtonHeader}>
                            <TouchableHighlight
                                style={styles.singleButtonHeaderHighlight}
                                onPress={this._removeRequest(selectedTeam.id, currentUser)}>
                                <Text style={styles.headerButton}>
                                    {'Remove Request'}
                                </Text>
                            </TouchableHighlight>
                        </View>
                    );
                default :
                    return (
                        <View style={styles.singleButtonHeader}>
                            <TouchableHighlight
                                style={styles.singleButtonHeaderHighlight}
                                onPress={this._askToJoin(selectedTeam, currentUser)}>
                                <Text style={styles.headerButton}>{'Ask to join this team'}</Text>
                            </TouchableHighlight>
                        </View>
                    );
            }
        };

        const getMemberStatus = () => {
            switch (true) {
                case memberStatus === teamMemberStatuses.INVITED:
                    return (
                        <View style={styles.statusBar}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                {getMemberIcon(teamMemberStatuses.INVITED)}
                                <Text style={styles.statusMessage}>
                                    {'You have been invited to this team'}
                                </Text>
                            </View>
                        </View>
                    );
                case selectedTeam.owner.uid === currentUser.uid :
                    return (
                        <View style={styles.statusBar}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                {getMemberIcon(teamMemberStatuses.OWNER)}
                                <Text style={styles.statusMessage}>
                                    {'You are the owner of this team'}
                                </Text>
                            </View>
                        </View>
                    );
                case memberStatus === teamMemberStatuses.ACCEPTED :
                    return (
                        <View style={styles.statusBar}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                {getMemberIcon(teamMemberStatuses.ACCEPTED)}
                                <Text style={styles.statusMessage}>
                                    {'You are a member of this team.'}
                                </Text>
                            </View>
                        </View>);
                case this.state.hasAsked || (memberStatus === teamMemberStatuses.REQUEST_TO_JOIN) :
                    return (
                        <View style={styles.statusBar}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                {getMemberIcon(teamMemberStatuses.REQUEST_TO_JOIN)}
                                <Text style={styles.statusMessage}>
                                    {'Waiting on the team owner to approve your request'}
                                </Text>
                            </View>
                        </View>
                    );
                default :
                    return null;
            }
        };

        const otherTeamsLocationImage = require('../../assets/images/flag.png');

        return (
            <View style={styles.frame}>
                {getStatusButtons()}
                <ScrollView style={{padding: 10, backgroundColor: '#FFF'}}>
                    {getMemberStatus()}
                    <View style={{width: '100%', marginBottom: 20}}>
                        <Text style={[styles.heading, styles.teamTitle]}>
                            {selectedTeam.name}
                        </Text>
                        <View style={{width: '100%'}}>

                            <Text style={styles.dataBlock}>
                                <Text style={styles.label}>{'Owner: '}</Text>
                                <Text style={styles.data}>{selectedTeam.owner.displayName}</Text>
                            </Text>
                            <Text style={styles.dataBlock}>
                                <Text style={styles.label}>{'Where: '}</Text>
                                <Text style={styles.data}>{`${selectedTeam.location || ''}${!selectedTeam.town || !selectedTeam.town ? '' : ','}${selectedTeam.town || ''}`}</Text>
                            </Text>
                            <Text style={styles.dataBlock}>
                                <Text style={styles.label}>{'Date: '}</Text>
                                <Text style={styles.data}>{selectedTeam.date}</Text>
                            </Text>
                            <Text style={styles.dataBlock}>
                                <Text style={styles.label}>{'Starts: '}</Text>
                                <Text style={styles.data}>{selectedTeam.start}</Text>
                            </Text>
                            <Text style={styles.dataBlock}>
                                <Text style={styles.label}>{'Ends: '}</Text>
                                <Text style={styles.data}>{selectedTeam.end}</Text>
                            </Text>
                            {!selectedTeam.notes ? null
                                : <Text style={styles.dataBlock}>
                                    <Text style={styles.label}>{'Description: '}</Text>
                                    <Text>{selectedTeam.notes}</Text>
                                </Text>
                            }
                        </View>
                    </View>
                    <View style={{width: '100%'}}>
                        <Text style={[styles.heading]}>
                            {'Clean Up Location'}
                        </Text>
                        <MapView
                            style={{height: 300, marginBottom: 20, marginTop: 5}}
                            initialRegion={this.state.initialMapLocation}
                            onPress={this._handleMapClick}>
                            {this.props.locations.length > 0 && this.props.locations.map((marker, index) => (
                                <MapView.Marker
                                    coordinate={marker.coordinates}
                                    key={index}
                                    title={marker.title || 'clean area'}/>
                            ))}
                            {this.props.otherCleanAreas.length > 0 && this.props.otherCleanAreas.map((a, i) =>
                                (<MapView.Marker
                                    key={i}
                                    coordinate={a.coordinates}
                                    image={otherTeamsLocationImage}
                                    title={a.title}
                                />))}
                        </MapView>
                    </View>
                    {isTeamMember ? teamMemberList : null}
                    <View style={defaultStyles.padForIOSKeyboard}/>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    locations: state.teams.locations,
    invitations: state.teams.invitations || {},
    teams: state.teams.teams,
    selectedTeam: state.teams.selectedTeam,
    currentUser: TeamMember.create({...state.login.user, ...state.profile}),
    teamMembers: state.teams.teamMembers,
    otherCleanAreas: Object.values(state.teams.teams)
        .filter(team => team.id !== state.teams.selectedTeam.id)
        .reduce((areas, team) => areas.concat(team.locations.map(l => Object.assign({}, {
            key: '',
            coordinates: l.coordinates,
            title: `Claiming this area for team: ${team.name}`
        }))), [])
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(TeamDetails);
