/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import * as actions from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
    button: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 10,
        color: '#000',
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 10
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%'
    },
    headerButton: {
        // flex: 1,
        width: 32
    },
    message: {
        fontSize: 20,
        textAlign: 'left',
        margin: 15,
        color: 'red'
    },
    messageRead: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#555'
    },
    inputStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 2,
        color: '#262626',
        fontSize: 18,
        fontWeight: '200',
        height: 40,
        width: '100%',
        textAlign: 'left',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        borderStyle: 'solid'
    }
});

class Messages extends Component {
    static propTypes = {
        actions: PropTypes.object,
        messages: PropTypes.object,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Message Board'
    };

    constructor(props) {
        super(props);
        this.toMessageDetail = this.toMessageDetail.bind(this);
        this.toSendMessage = this.toSendMessage.bind(this);
    }

    toSendMessage() {
        return () => {
            this.props.navigation.navigate('SendMessage');
        };
    }

    toMessageDetail(messageId) {
        const myMessage = this.props.messages[messageId];
        return () => {
            this.props.actions.readMessage(myMessage);
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
                        <View>
                            <Text style={!messages[key].read ? styles.message : styles.messageRead}>
                                {messages[key].text}
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            )
        );
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={() => {
                    this.props.navigation.navigate('NewMessage');
                }}>
                    <Text style={styles.button}>New Message</Text>
                </TouchableHighlight>
                {myMessages.length > 0 ? myMessages : (<Text>Sorry, no messages </Text>)}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {messages: state.messages.messages};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
