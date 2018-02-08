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
        return () => {
            this.props.navigation.navigate('MessageDetails', {messageId});
        };
    }

    render() {
        const messages = this.props.messages;
        const myMessages = Object.keys(messages || {}).map(key =>
            (
                <TouchableHighlight key={key} onPress={this.toMessageDetail(key)}>
                    <View>
                        <Text style={styles.title}>{messages[key].text}</Text>
                    </View>
                </TouchableHighlight>
            )
        );
        return (
            <View style={styles.container}>
                {myMessages.length > 0 ? myMessages : (<Text>Sorry, no messages yet, </Text>)}
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

export default connect(mapStateToProps, mapDispatchToProps)(MessageSummaries);
