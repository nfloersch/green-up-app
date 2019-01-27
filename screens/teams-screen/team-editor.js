// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TabNavigator, TabBarBottom} from 'react-navigation';
import * as colors from '../../styles/constants';
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
            return 'TeamInvitationDetails';
        }
        return 'NewTeam';
    };

    render() {
        const {status} = this.props.navigation.state.params || '';
        const TeamEditorNav = TabNavigator({
            TeamInvitationDetails: {
                screen: TeamEditorMembers
            },
            TeamEditorMap: {
                screen: TeamEditorMap
            },
            TeamDetails: {
                screen: TeamEditorDetails,
                header: null
            }
        }, {
            tabBarComponent: TabBarBottom,
            tabBarPosition: 'bottom',
            animationEnabled: true,
            swipeEnabled: false,
            tabBarOptions: {
                activeTintColor: colors.buttonColor,
                inactiveTintColor: colors.tabIconDefault,
                labelStyle: {
                    fontSize: 10
                },
                style: {
                    backgroundColor: colors.tabBarBackground
                }
            },
            initialRouteName: this.setDefault(status)
        });
        return (
            <TeamEditorNav screenProps={{stacknav: this.props.navigation}}/>
        );
    }
}
