// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TabNavigator} from 'react-navigation';

import TeamEditorDetails from './team-editor-details';
import TeamEditorMap from './team-editor-map';
import TeamEditorMembers from './team-editor-members';

export default class TeamEditor extends Component {
    static propTypes = {
        actions: PropTypes.object,
        MyTeams: PropTypes.array,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Team Editor'
    };

    constructor(props) {
        super(props);
        this.state = {
            currentMessageId: null
        };
    }

    setDefault = status => {
      if (status === 'OWNER') {
        return 'TeamInvitationDetails'
      } else {
        return 'TeamDetails'
      }
    }

    render() {
        const { status } = this.props.navigation.state.params || '';
        const TeamEditorNav = TabNavigator({
            TeamDetails: {
                screen: TeamEditorDetails,
                header: null
            },
            TeamInvitationDetails: {
                screen: TeamEditorMembers
            },
            TeamEditorMap: {
                screen: TeamEditorMap
            }
        }, {
            tabBarOptions: {
                showIcon: true
            },
            animationEnabled: true,
            initialRouteName: this.setDefault(status)
        });
        return (
            <TeamEditorNav screenProps={{stacknav: this.props.navigation}}/>
        );
    }
}
