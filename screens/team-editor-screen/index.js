// @flow

import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
// import * as colors from '../../styles/constants';
import TeamEditorDetails from '../../components/team-editor-details';
import TeamEditorMap from '../../components/team-editor-map';
import TeamEditorMembers from '../../components/team-editor-members';

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});

const Details = () => (
    <TeamEditorDetails/>
);
const Map = () => (
    <TeamEditorMap/>
);

const Members = () => (
   <TeamEditorMembers/>
);
export default class TeamEditorScreen extends React.Component {
    state = {
        index: 0,
        routes: [
            {key: 'first', title: 'Details'},
            {key: 'second', title: 'Members'},
            {key: 'third', title: 'Map'},
        ],
    };

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: Details,
                    second: Members,
                    third: Map
                })}
                onIndexChange={index => this.setState({index})}
                initialLayout={{width: Dimensions.get('window').width}}
            />
        );
    }
}

// export default class TeamEditorScreen extends Component {
//     static propTypes = {
//         actions: PropTypes.object,
//         MyTeams: PropTypes.array,
//         navigation: PropTypes.object
//     };
//
//     static navigationOptions = {
//         title: 'Team Editor'
//     };
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             currentMessageId: null
//         };
//     }
//
//     setDefault = status => {
//         if (status === 'OWNER') {
//             return 'TeamInvitationDetails';
//         }
//         return 'NewTeam';
//     };
//
//     render() {
//         const {status} = this.props.navigation.state.params || '';
//         const TeamEditorNav = TabNavigator({
//             TeamInvitationDetails: {
//                 screen: TeamEditorMembers
//             },
//             TeamEditorMap: {
//                 screen: TeamEditorMap
//             },
//             TeamDetails: {
//                 screen: TeamEditorDetails,
//                 header: null
//             }
//         }, {
//             tabBarComponent: TabBarBottom,
//             tabBarPosition: 'bottom',
//             animationEnabled: true,
//             swipeEnabled: false,
//             tabBarOptions: {
//                 activeTintColor: colors.buttonColor,
//                 inactiveTintColor: colors.tabIconDefault,
//                 labelStyle: {
//                     fontSize: 10
//                 },
//                 style: {
//                     backgroundColor: colors.tabBarBackground
//                 }
//             },
//             initialRouteName: this.setDefault(status)
//         });
//         return (
//             <TeamEditorNav screenProps={{stacknav: this.props.navigation}}/>
//         );
//     }
// }
