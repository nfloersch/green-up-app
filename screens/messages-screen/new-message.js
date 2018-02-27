/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TextInput, TouchableHighlight,
				View, Picker, Button} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as messageActions from './actions';
import {Message} from '../../models/message';
import {defaultStyles} from '../../styles/default-styles';

const myStyles = {
		messageInput: {
			height: 300
		}
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class NewMessage extends Component {
    static propTypes = {
        actions: PropTypes.object,
        messages: PropTypes.array,
        navigation: PropTypes.object,
        selectedTeam: PropTypes.object,
        teams: PropTypes.array
    };

    static navigationOptions = {
        title: 'Send A Message'
    };

    constructor(props) {
        super(props);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeText = this.changeText.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.cancelMessage = this.cancelMessage.bind(this);
        this.state = {
            selectedTeam: props.selectedTeam || (props.teams[0] || {}).id,
            title: '',
            text: ''
        };
    }

    changeTitle(title) {
        this.setState({title: title});
    }

    changeText(text) {
        this.setState({text});
    }

    sendMessage() {
        const teamId = this.props.selectedTeam || this.state.selectedTeam;
        const team = this.props.teams.find(_team => teamId === _team.id);
        const recipients = team.members;
        const message = Message.create(this.state);
        this.props.actions.sendMessage(message, recipients);
        this.props.navigation.goBack();
    }

    cancelMessage() {
        this.props.navigation.goBack();
    }

    render() {

        const TeamPicker = (
            <View>
                <Text style={styles.label}>Select Team to Message:</Text>
                <Picker
										style={styles.button}
										itemStyle={{height: 45}}
                    selectedValue={this.state.selectedTeam || ((this.props.teams || [])[0] || {}).id}
                    onValueChange={(itemValue) => this.setState({selectedTeam: itemValue})}>
                    {(this.props.teams || []).map(team => (
                        <Picker.Item key={team.id} label={team.name} value={team.id}/>))}
                </Picker>
            </View>
        );


        return (
            <View style={styles.container}>
                {!this.props.selectedTeam ? TeamPicker : null}
                <View>
                    <TextInput
                        keyBoardType={'default'}
                        multiline={true}
                        numberOfLines={20}
                        onChangeText={this.changeText}
                        placeholder={'message details'}
                        value={this.state.text}
												style={[styles.textInput, styles.messageInput]}
                    />
                </View>
                <View style={styles.button}>
                    <Button
												onPress={this.sendMessage}
												title='Send Message' />
								</View>
								<TouchableHighlight onPress={this.cancelMessage}>
										<Text>Cancel</Text>
								</TouchableHighlight>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const currentUser = state.login.user;
    const teams = (Object.keys(state.teams.teams || {}))
        .filter(
            key => {
                const memberIds = ((state.teams.teams[key].members || []).map(member => member.uid));
                return memberIds.indexOf((currentUser || {}).uid) !== -1;
            }
        ).map(key => state.teams.teams[key]);
    const selectedTeam = state.teams.selectedTeam;
    return {selectedTeam, teams, currentUser};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(messageActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
