/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
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
    messages: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    messageRow: {
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#678',
        width: '100%',
        padding: 4,
        marginTop: 10
    },
    buttonRow: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        marginTop: 10
    },
    addButton: {
        width: '49%',
        backgroundColor: '#0F0',
        justifyContent: 'center',
        padding: 10,
        marginRight: 3
    },
    cancelButton: {
        width: '49%',
        backgroundColor: '#F00',
        justifyContent: 'center',
        padding: 10,
        marginLeft: 3
    },
    text: {
        color: '#FFF',
        textAlign: 'center'
    }
});
class SendMessage extends Component {
    static propTypes = {
        actions: PropTypes.object,
        messages: PropTypes.array,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Send Message'
    };
    constructor(props) {
        super(props);
        this.changeTitle = this.changeTitle.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.cancelMessage = this.cancelMessage.bind(this);
        this.state = {
            id: 346,
            title: '',
            message: ''
        };
    }

    changeTitle(title) {
        this.setState({title: title});
    }

    addMessage(text) {
        this.setState({message: text});
    }

    sendMessage() {
        let change = this.state.id;
        return () => {
            this.props.messages.push({_id: change.toString(), message: this.state.title});
            this.setState({id: change += 1});
            this.props.navigation.navigate('MessageSummaries');
        };
    }

    cancelMessage() {
        return () => {
            this.props.navigation.navigate('MessageSummaries');
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.messageRow}>
                    <Text style={{fontSize: 18}}>Message Title: </Text>
                    <TextInput
                        keyBoardType={'default'}
                        placeholder={'title'}
                        onChangeText={this.changeTitle}
                        style={{width: '65%'}}
                        underlineColorAndroid={'transparent'}
                    />
                </View>
                <View style={styles.messageRow}>
                    <TextInput
                        keyBoardType={'default'}
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={this.addMessage}
                        placeholder={'message details'}
                        style={{width: '100%'}}
                    />
                </View>
                <View style={styles.buttonRow}>
                    <TouchableHighlight style={styles.addButton} onPress={this.sendMessage()}>
                        <Text style={styles.text}>Add Message</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.cancelButton} onPress={this.cancelMessage()}>
                        <Text style={styles.text}>Cancel</Text>
                    </TouchableHighlight>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);
