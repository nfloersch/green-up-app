/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StackNavigator} from 'react-navigation';
import MessageSummaries from './message-summaries';
import MessageDetails from './messge-details';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import DrawerToggle from '../../components/drawer-toggle';

export default class Messages extends Component {
    static propTypes = {
        actions: PropTypes.object,
        messages: PropTypes.array,
        navigation: PropTypes.obßject
    };

    static navigationOptions = {
        drawerLabel: 'Messages',
        drawerIcon: () => (<MaterialCommunityIcons name='message-alert' size={24} color='blue'/>)
    };

    constructor(props) {
        super(props);
        this._addMessage = this
            ._addMessage
            .bind(this);
        this.state = {
            isDetailView: false,
            currentMessageId: null,
            newMessage: ''
        };

    }

    componentDidMount() {}

    _addMessage() {
        this
            .props
            .actions
            .addMessage({
                message: this.state.newMessage,
                _id: (new Date()).toISOString()
            });
        this.setState({newMessage: ''});
    }

    render() {
        var MessagesNav = StackNavigator({
            MessageSummaries: {
                screen: MessageSummaries,
                navigationOptions: () => ({headerRight: <DrawerToggle navigation={this.props.navigation}/>})
            },
            MessageDetails: {
                screen: MessageDetails,
                navigationOptions: () => ({headerRight: <DrawerToggle navigation={this.props.navigation}/>})
            }
        });
        return (<MessagesNav screenProps={{addMessage: this._addMessage}}/>);
    }
}
