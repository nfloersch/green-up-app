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
import {messageTypes} from '../../constants/message-types';
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
        switch (myMessage.type) {
            case messageTypes.INVITATION :
                return () => {
                    this.props.actions.readMessage(myMessage, userId);
                    this.props.actions.selectTeamById(myMessage.teamId);
                    this.props.navigation.navigate('TeamDetails');
                };

            default :
                return () => {
                    // mark message as read
                    this.props.actions.readMessage(myMessage, userId);

                    // navigate to details screen
                    this.props.navigation.navigate('MessageDetails', {messageId});
                };
        }
    }

    render() {
        if (this.props.teamsLoaded && this.props.messagesLoaded) {
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

            return this.props.userHasTeams ? (
                <ScrollView style={styles.container}>
                    <Button
                        onPress={() => {
                            this.props.navigation.navigate('NewMessage');
                        }}
                        title='New Message'
                    />
                    <View>
                        {myMessages.length > 0 ? myMessages : (<Text>Sorry, no messages </Text>)}
                    </View>
                </ScrollView>
            ) : (
                <View style={styles.container}>
                    <Text style={defaultStyles.heading2}>Whoops, you're lonely in here.
                        It seems like you don't have any teams to send messages to. Start your own team or join an
                        existing one.
                    </Text>
                    <Button
                        onPress={() => {
                            this.props.navigation.navigate('Teams');
                        }}
                        title='Go to my teams'
                    />
                </View>
            );
        }

        return (
            <View>
                <Text>Running around, gathering data... please wait</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        messages: state.messages.messages,
        currentUser: state.login.user,
        userHasTeams: Object.values(state.teams.teams)
            .filter(team => typeof team.members.find(member => member.uid === state.login.user.uid) !== 'undefined')
            .length > 0,
        teamsLoaded: state.messages.teamsLoaded,
        messagesLoaded: state.messages.loaded
    };
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);