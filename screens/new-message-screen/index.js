// @flow

import React, { Component } from "react";
import {
    KeyboardAvoidingView,
    Picker, Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import User from "../../models/user";
import * as actionCreators from "./actions";
import Message from "../../models/message";
import { defaultStyles } from "../../styles/default-styles";
import * as messageTypes from "../../constants/message-types";
import { removeNulls } from "../../libs/remove-nulls";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type Props = {
    actions: { sendTeamMessage: (teamId: string, _message: string) => void },
    currentUser: Object,
    myTeams: Array<Object>,
    navigation: Object,
    selectedTeamId: string,
    teamMembers: Object,
    teams: Object
};

class NewMessageScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            selectedTeamId: props.navigation.selectedTeamId || props.selectedTeamId,
            title: "",
            text: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        const nextTeamId = nextProps.navigation.selectedTeamId || nextProps.selectedTeamId;
        if (Boolean(nextTeamId) && nextTeamId !== this.state.selectedTeamId) {
            this.setState({
                selectedTeamId: nextTeamId,
                title: "",
                text: ""
            });
        }
    }

    static navigationOptions = {
        title: "Send A Message"
    };

    render() {
        const { myTeams, navigation, currentUser, actions } = this.props;

        const changeText = (text) => {
            this.setState({ text });
        };

        const sendMessage = (teamId, message) => {
            const _message = Message.create(
                {
                    text: message,
                    type: messageTypes.TEAM_MESSAGE,
                    sender: currentUser,
                    teamId
                }
            );
            actions.sendTeamMessage(teamId, _message);
            navigation.goBack();
        };

        const cancelMessage = () => {
            navigation.goBack();
        };


        const selectedTeamId = (navigation.state.params || {}).selectedTeamId || ((myTeams || []).length === 1 && (myTeams[0] || {}).id) || null;
        const teamName = ((myTeams || []).find(team => team.id === selectedTeamId) || {}).name || "";
        const items = (myTeams || [])
            .map(team => (
                <Picker.Item key={ team.id } label={ team.name } value={ team.id }/>)
            );
        const teamValue = selectedTeamId || this.state.selectedTeamId || ((myTeams || [])[0] || {}).id;
        return (
            <View style={ styles.frame }>
                <View style={ styles.buttonBarHeader }>
                    <View style={ styles.buttonBar }>
                        <TouchableHighlight
                            style={ styles.headerButton }
                            onPress={ () => sendMessage(teamValue, this.state.text) }>
                            <Text style={ styles.headerButtonText }>{ "Send Message" }</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={ styles.headerButton } onPress={ cancelMessage }>
                            <Text style={ styles.headerButtonText }>{ "Cancel" }</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <KeyboardAvoidingView
                    style={ defaultStyles.frame }
                    behavior={ Platform.OS === "ios" ? "padding" : null }
                >
                    <ScrollView style={ styles.scroll }>
                        <View style={ styles.infoBlockContainer }>
                            {
                                !selectedTeamId ? (
                                    <View style={ { marginBottom: 5 } }>
                                        <Text style={ styles.labelDark }>Select Team to Message:</Text>
                                        <Picker
                                            style={ styles.picker }
                                            selectedValue={ teamValue }
                                            onValueChange={ (itemValue) => this.setState({ selectedTeamId: itemValue }) }>
                                            { items }
                                        </Picker>
                                    </View>
                                ) : (
                                    <View style={ { marginBottom: 5 } }>
                                        <Text style={ styles.labelDark }>{ "Send a Message To" }</Text>
                                        <Text style={ styles.largeText }>{ teamName }</Text>
                                    </View>
                                )
                            }
                            <TextInput
                                keyBoardType={ "default" }
                                multiline={ true }
                                textAlignVertical="top"
                                onChangeText={ changeText }
                                placeholder={ "Message details" }
                                value={ this.state.text }
                                style={ styles.textArea }
                                underlineColorAndroid={ "transparent" }
                            />
                        </View>
                        {
                            Platform.OS === "ios"
                                ? (<View style={ defaultStyles.padForIOSKeyboardBig }/>)
                                : null
                        }
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const currentUser = User.create({ ...state.login.user, ...removeNulls(state.profile) });
    const myTeams = Object.keys((state.profile || {}).teams)
        .map(key => state.teams.teams[key]) // match id's to their teams
        .filter(team => Boolean(team)); // remove deleted teams, just in case
    const teams = state.teams.teams;
    const teamMembers = state.teams.teamMembers;
    return { teams, myTeams, teamMembers, currentUser };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageScreen);
