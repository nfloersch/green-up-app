/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as messageActions from './messageActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
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
    messages: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
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

class MessageSummaries extends Component {
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
        this.toMessageDetail = this.toMessageDetail.bind(this);
        this.toSendMessage = this.toSendMessage.bind(this);
    }

    toSendMessage() {
        return () => {
            this.props.navigation.navigate('SendMessage');
        };
    }

    toMessageDetail(messageId) {
        return () => {
            this.props.navigation.navigate('MessageDetails');
        };
    }
    render() {
        const myMessages = (this.props.messages || []).map(message => (
            <TouchableHighlight key={message._id} onPress={this.toMessageDetail(message._id)}>
                <View>
                    <Text style={styles.title}>{message.title}</Text>
                </View>
            </TouchableHighlight>
        ));
        return (
            <View style={styles.container}>
                <Text>Message Summaries Screen</Text>
                {myMessages}
                <Button onPress={this.toSendMessage()} title={'create message'} />
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {messages: state.messageReducer.session.user.messages};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(messageActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageSummaries);
