/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';

import * as actions from './actions';
import Message from '../../models/message';
import {defaultStyles} from '../../styles/default-styles';

const myStyles = {};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

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
        this.changeText = this.changeText.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.cancelMessage = this.cancelMessage.bind(this);
        this.state = {
            title: '',
            text: ''
        };
    }

    changeTitle(title) {
        this.setState({title: title});
    }

    changeText(text) {
        this.setState({text: text});
    }

    sendMessage() {
        const message = Message.create(this.state);
        this.props.actions.sendMessage(message);
        this.props.navigation.navigate('MessageSummaries');
    }

    cancelMessage() {
        this.props.navigation.navigate('MessageSummaries');
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
                        value={this.state.title}
                        underlineColorAndroid={'transparent'}
                    />
                </View>
                <View style={styles.messageRow}>
                    <TextInput
                        keyBoardType={'default'}
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={this.changeText}
                        placeholder={'message details'}
                        value={this.state.text}
                        style={{width: '100%'}}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title='Send Message'
                        onPress={this.sendMessage}/>
                </View>
                <View style={styles.button}>
                    <Button
                        title='Cancel'
                        onPress={this.cancelMessage}/>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const currentUser = state.login.user;
    const teams = state.teams.teams;
    const selectedTeam = state.teams.selectedTeam;
    return {selectedTeam, teams, currentUser};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);
