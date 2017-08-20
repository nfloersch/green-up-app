/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StackNavigator} from 'react-navigation';
import TrashMap from './trash-map';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import DrawerToggle from '../../components/drawer-toggle';

export default class TrashTracker extends Component {
    static propTypes = {
        actions: PropTypes.object,
        messages: PropTypes.array,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        drawerLabel: 'Trash Tracker',
        drawerIcon: () => (<MaterialCommunityIcons name='map-marker' size={24} color='green'/>)
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        var TrashTrackerNav = StackNavigator({
            TrashMap: {
                screen: TrashMap,
                navigationOptions: () => ({headerRight: <DrawerToggle navigation={this.props.navigation}/>})
            }
        });
        return (<TrashTrackerNav/>);
    }
}
