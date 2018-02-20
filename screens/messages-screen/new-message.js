/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Message} from '../../models/message';
import {StyleSheet, Text, TextInput, TouchableHighlight, View, Picker} from 'react-native';
import * as messageActions from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
    column: {
        borderWidth: 1,
        borderColor: '#678',
        padding: 3,
        width: '100%'
    },
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
            <View style={styles.column}>
                <Text style={styles.label}>Team :</Text>
                <Picker
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
                <View style={styles.messageRow}>
                    <TextInput
                        keyBoardType={'default'}
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={this.changeText}
                        placeholder={'message details'}
                        value={this.state.text}
                        style={{width: '100%', height: 75}}
                    />
                </View>
                <View style={styles.buttonRow}>
                    <TouchableHighlight style={styles.addButton} onPress={this.sendMessage}>
                        <Text style={styles.text}>Send Message</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.cancelButton} onPress={this.cancelMessage}>
                        <Text style={styles.text}>Cancel</Text>
                    </TouchableHighlight>
                </View>
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
