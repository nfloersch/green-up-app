// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TabNavigator} from 'react-navigation';
import TeamEditorDetails from './team-editor-details';
import TeamEditorMap from './team-editor-map';
import TeamEditorMembers from './team-editor-members';
import {FontAwesome} from '@expo/vector-icons';

export default class TeamEditor extends Component {
    static propTypes = {
        actions: PropTypes.object,
        MyTeams: PropTypes.array,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        drawerLabel: 'Team Editor',
        drawerIcon: ({tintColor}) => (<FontAwesome name='users' size={24} color='green'/>)
    };

    constructor(props) {
        super(props);
        this.state = {
            currentMessageId: null
        };
    }

    componentDidMount() {}

    render() {
        var TeamEditorNav = TabNavigator({
            TeamDetails: {
                screen: TeamEditorDetails
            },
            TeamInvitationDetails: {
                screen: TeamEditorMembers
            },
            TeamEditorMap: {
                screen: TeamEditorMap
            }
        });
        return (<TeamEditorNav screenProps={{
            stacknav: this.props.navigation
        }}/>);
    }
}
