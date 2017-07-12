/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%'
    },
    messages: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});
export default class MessageSummaries extends Component {
    static propTypes = {
        actions: PropTypes.object,
        messages: PropTypes.array
    };

    static navigationOptions = {
        drawerLabel: 'Messages',
        drawerIcon: () => (<MaterialCommunityIcons name='message-alert' size={24} color='blue'/>)
    };

    constructor(props) {
        super(props);
        this.toMessageDetail = this
            .toMessageDetail
            .bind(this);
        this._addMessage = this
            ._addMessage
            .bind(this);
    }

    componentDidMount() {}

    toMessageDetail() {}

    render() {
        var myMessages = (this.props.messages || []).map(message => (
            <TouchableHighlight key={message._id} onPress={this.toMessageDetail}>
                <View>
                    <Text style={styles.messages}>{message.message}</Text>
                </View>
            </TouchableHighlight>
        ));
        return (
            <View style={styles.container}>
                <Text>Message Summaries Screen</Text>
                {myMessages}
            </View>
        );
    }
}
