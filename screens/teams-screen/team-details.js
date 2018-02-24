/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, ScrollView, View, TouchableHighlight} from 'react-native';
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
    },
    bannerText: {textAlign: 'center', marginTop: 5, marginBottom: 5}
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class TeamDetails extends Component {
    static propTypes = {
        actions: PropTypes.object,
        currentUser: PropTypes.object,
        selectedTeam: PropTypes.object,
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
        this.state = {hasAsked: false};
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.selectedTeam) !== JSON.stringify(this.props.selectedTeam)) {
            this.setState({hasAsked: false});
        }
    }

    _acceptInvitation() {

    }

    _leaveTeam() {
    }

    _askToJoin() {
        this.setState({hasAsked: true}, () => {
            this.props.actions.askToJoinTeam(this.props.selectedTeam, this.props.currentUser);
        });
    }

    render() {
        const {currentUser, selectedTeam} = this.props;
        const memberStatus = () => {
            const membership = selectedTeam.members.find(member => member.uid === currentUser.uid || member.email === currentUser.email);
            switch (true) {
                case selectedTeam.owner.uid === currentUser.uid :
                    return (<Text style={styles.bannerText}>{'You own this team'}</Text>);
                case membership && membership.memberStatus === teamMemberStatuses.INVITED:
                    return (
                        <TouchableHighlight onPress={this._acceptInvitation}>
                            <Text style={styles.bannerText}>
                                {'Accept Invitation'}
                            </Text>
                        </TouchableHighlight>
                    );
                case membership && membership.memberStatus === teamMemberStatuses.ACCEPTED :
                    return (
                        <TouchableHighlight onPress={this._leaveTeam}>
                            <Text style={styles.bannerText}>
                                {'You are already a member'}
                            </Text>
                        </TouchableHighlight>
                    );
                case this.state.hasAsked || (membership && membership.memberStatus === teamMemberStatuses.REQUEST_TO_JOIN) :
                    return (
                        <Text style={styles.bannerText}>
                            {'Waiting on the Team Manager to approve your request'}
                        </Text>
                    );
                default :
                    return (
                        <TouchableHighlight onPress={this._askToJoin}>
                            <Text style={styles.bannerText}>
                                {'Ask to join this group'}
                            </Text>
                        </TouchableHighlight>
                    );
            }
        };
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={[styles.heading2, styles.teamTitle]}>
                    {selectedTeam.name}
                </Text>
                <View style={styles.memberStatusBanner}>
                    {memberStatus()}
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
    selectedTeam: state.teams.selectedTeam,
    currentUser: state.login.user
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(TeamDetails);
