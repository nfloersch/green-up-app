/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StackNavigator} from 'react-navigation';
import MessageSummaries from './message-summaries';
import MessageDetails from './message-details';
import SendMessage from './send-message';

export default class MessagesScreen extends Component {
    static propTypes = {
        actions: PropTypes.object,
        messages: PropTypes.array,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Messages'
    };

    constructor(props) {
        super(props);
        this.state = {
            currentMessageId: null
        };

    }

    componentDidMount() {}

    render() {
        const MessagesNav = StackNavigator({
            MessageSummaries: {
                screen: MessageSummaries
                // navigationOptions: () => ({headerRight: <DrawerToggle navigation={this.props.navigation}/>})
            },
            MessageDetails: {
                screen: MessageDetails
                // navigationOptions: () => ({headerRight: <DrawerToggle navigation={this.props.navigation}/>})
            },
            SendMessage: {
                screen: SendMessage
               //  navigationOptions: () => ({headerRight: <DrawerToggle navigation={this.props.navigation}/>})
            }
        });
        return (<MessagesNav/>);
    }
}
