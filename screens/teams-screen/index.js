/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StackNavigator} from 'react-navigation';
import MyTeams from './my-teams';
import TeamDetails from './team-details';
import TeamEditor from './team-editor';
import TeamInvitationDetails from './team-invitation-details';
import TeamSearch from './team-search';
import InviteForm from './invite-form';
import InviteContacts from './invite-contacts';
import MessageTeam from './message-team';

export default class Teams extends Component {
    static propTypes = {
        actions: PropTypes.object,
        MyTeams: PropTypes.array,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'My Teams'
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        const TeamsNav = StackNavigator({
            MyTeams: {
                screen: MyTeams
            },
            TeamDetails: {
                screen: TeamDetails
            },
            TeamInvitationDetails: {
                screen: TeamInvitationDetails
            },
            TeamEditor: {
                screen: TeamEditor
            },
            TeamSearch: {
                screen: TeamSearch
            },
            MessageTeam: {
                screen: MessageTeam
            },
            InviteForm: {
                screen: InviteForm
            },
            InviteContacts: {
                screen: InviteContacts
            }
        });
        return (<TeamsNav/>);
    }
}
