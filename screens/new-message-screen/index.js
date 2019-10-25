// @flow

import React, { useState, useEffect } from "react";
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

type PropsType = {
    actions: { sendTeamMessage: (teamId: string, message: MessageType) => void },
    currentUser: Object,
    myTeams: Array<Object>,
    navigation: Object,
    selectedTeamId?: string
};

const NewMessageScreen = ({ actions, currentUser, myTeams = [], navigation, selectedTeamId }: PropsType): React$Element<View> => {

    const [currentTeamId, setCurrentTeamId] = useState(
        navigation.selectedTeamId ||
        selectedTeamId ||
        (myTeams || []).length === 1 && (myTeams[0] || {}).id ||
        null
    );
    const [text, setText] = useState("");

    useEffect(() => {
        const newTeamId = navigation.selectedTeamId || selectedTeamId || null;
        if (newTeamId && newTeamId !== currentTeamId) {
            setCurrentTeamId(newTeamId);
            setText("");
        }
    }, [selectedTeamId, navigation]);


    const sendMessage = () => {
        const message = Message.create(
            {
                text: text,
                type: messageTypes.TEAM_MESSAGE,
                sender: currentUser,
                teamId: currentTeamId
            }
        );
        actions.sendTeamMessage(currentTeamId, message);
        navigation.goBack();
    };

    const cancelMessage = () => {
        navigation.goBack();
    };

    const items = (Array.isArray(myTeams) ? myTeams : [])
        .map(
            (team: TeamType): React$Element<any> => (
                <Picker.Item key={ team.id } label={ team.name } value={ team.id }/>
            )
        );
    return (
        <View style={ styles.frame }>
            <View style={ styles.buttonBarHeader }>
                <View style={ styles.buttonBar }>
                    <TouchableHighlight
                        style={ styles.headerButton }
                        onPress={ sendMessage }>
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
                            !currentTeamId ? (
                                <View style={ { marginBottom: 5 } }>
                                    <Text style={ styles.labelDark }>{ "Select Team to Message:" }</Text>
                                    <Picker
                                        style={ styles.picker }
                                        selectedValue={ myTeams[currentTeamId] }
                                        onValueChange={ setCurrentTeamId }>
                                        { items }
                                    </Picker>
                                </View>
                            ) : (
                                <View style={ { marginBottom: 5 } }>
                                    <Text style={ styles.labelDark }>{ "Send a Message To" }</Text>
                                    <Text style={ styles.largeText }>{ myTeams[currentTeamId].name }</Text>
                                </View>
                            )
                        }
                        <TextInput
                            keyBoardType={ "default" }
                            multiline={ true }
                            textAlignVertical="top"
                            onChangeText={ setText }
                            placeholder={ "Message details" }
                            value={ text }
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
};


NewMessageScreen.navigationOptions = {
    title: "Send A Message"
};

const mapStateToProps = (state: Object): Object => {
    const currentUser = User.create({ ...state.login.user, ...removeNulls(state.profile) });
    const myTeams = Object.keys((state.profile || {}).teams)
        .map((key: string): TeamType => state.teams.teams[key]) // match id's to their teams
        .filter((team: Object): boolean => Boolean(team)); // remove deleted teams, just in case
    const teams = state.teams.teams;
    return { teams, myTeams, currentUser };
};

const mapDispatchToProps = (dispatch: Dispatch<ActionType>): Object => ({ actions: bindActionCreators(actionCreators, dispatch) });

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(NewMessageScreen);
