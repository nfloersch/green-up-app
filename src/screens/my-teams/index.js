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
import TeamSearch from "./team-search";
import InviteForm from './invite-form';
import InviteContacts from './invite-contacts';
import MessageTeam from './message-team';
import DrawerToggle from '../../components/drawer-toggle';
import {FontAwesome} from '@expo/vector-icons';

export default class Teams extends Component {
    static propTypes = {
        actions: PropTypes.object,
        MyTeams: PropTypes.array,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        drawerLabel: 'My Teams',
        drawerIcon: ({tintColor}) => (<FontAwesome name='users' size={24} color='green'/>)
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        var TeamsNav = StackNavigator({
            MyTeams: {
                screen: MyTeams,
                navigationOptions: () => ({headerRight: <DrawerToggle navigation={this.props.navigation}/>})
            },
            TeamDetails: {
                screen: TeamDetails,
                navigationOptions: () => ({headerRight: <DrawerToggle navigation={this.props.navigation}/>})
            },
            TeamInvitationDetails: {
                screen: TeamInvitationDetails,
                navigationOptions: () => ({headerRight: <DrawerToggle navigation={this.props.navigation}/>})
            },
            TeamEditor: {
                screen: TeamEditor,
                navigationOptions: () => ({headerRight: <DrawerToggle navigation={this.props.navigation}/>})
            },
            TeamSearch: {
                screen: TeamSearch,
                navigationOptions: () => ({headerRight: <DrawerToggle navigation={this.props.navigation}/>})
            },
            MessageTeam: {
                screen: MessageTeam,
                navigationOptions: () => ({headerRight: <DrawerToggle navigation={this.props.navigation}/>})
            },
            InviteForm: {
                screen: InviteForm,
                navigationOptions: () => ({headerRight: <DrawerToggle navigation={this.props.navigation}/>})
            },
            InviteContacts: {
                screen: InviteContacts,
                navigationOptions: () => ({headerRight: <DrawerToggle navigation={this.props.navigation}/>})
            }
        });
        return (<TeamsNav/>);
    }
}
