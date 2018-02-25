/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableHighlight, View, Button, ScrollView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from './actions';
import {defaultStyles} from '../../styles/default-styles';

const myStyles = {
    message: {
        marginBottom: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: '#888',
        borderStyle: 'solid'
    },
    read: {
        backgroundColor: '#EFEFEF'
    },
    unread: {
        borderTopColor: 'green',
        borderTopWidth: 3
    },
    newMsg: {
        fontWeight: 'bold'
    },
    oldMsg: {}
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class Messages extends Component {
    static propTypes = {
        actions: PropTypes.object,
        currentUser: PropTypes.object,
        messages: PropTypes.object,
        navigation: PropTypes.object,
        userHasTeams: PropTypes.bool,
        teamsLoaded: PropTypes.bool,
        messagesLoaded: PropTypes.bool
    };

    static navigationOptions = {
        title: 'Message Board',
        tabBarLabel: 'Messages'
    };

    constructor(props) {
        super(props);
        this.toMessageDetail = this.toMessageDetail.bind(this);
        this.toSendMessage = this.toSendMessage.bind(this);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.teamsLoaded === true && nextProps.userHasTeams !== true) {
            this.props.navigation.navigate('Teams');
        }
    }

    toSendMessage() {
        return () => {
            this.props.navigation.navigate('SendMessage');
        };
    }

    toMessageDetail(messageId) {
        const myMessage = this.props.messages[messageId];
        const userId = this.props.currentUser.uid;
        return () => {
            // mark message as read
            this.props.actions.readMessage(myMessage, userId);

            // navigate to details screen
            this.props.navigation.navigate('MessageDetails', {messageId});
        };
    }

    render() {
        const messages = this.props.messages;
        const messageKeys = Object.keys(messages || {});
        const sortedKeys = messageKeys.sort((key1, key2) => messages[key2].created.valueOf() - messages[key1].created.valueOf());
        const myMessages = sortedKeys.map(key =>
            (
                <View key={key}>
                    <TouchableHighlight onPress={this.toMessageDetail(key)}>
                        <View style={[styles.message,
                            messages[key].read ?
                                styles.read : styles.unread]}>
                            <Text style={messages[key].read ?
                                styles.oldMsg : styles.newMsg}>
                                {messages[key].text.length > 80 ?
                                    `${messages[key].text.slice(0, 80)}...` :
                                    messages[key].text}
                            </Text>
                            <Text style={{fontSize: 10, textAlign: 'right'}}>{messages[key].sender.email}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            )
        );


        return (
            <ScrollView style={styles.container}>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate('NewMessage');
                    }}
                    title='New Message'
                />
                {myMessages.length > 0 ? myMessages : (<Text>Sorry, no messages </Text>)}
            </ScrollView>

        );
    }
}

const mapStateToProps = (state) => {
    const currentUser = state.login.user;
    return {messages: state.messages.messages, currentUser};

};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);