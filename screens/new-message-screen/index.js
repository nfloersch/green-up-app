// @flow

import React, { useState, useEffect } from "react";
import {
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
import * as actionCreators from "../../action-creators/message-action-creators";
import Message from "../../models/message";
import { defaultStyles } from "../../styles/default-styles";
import * as messageTypes from "../../constants/message-types";
import { removeNulls } from "../../libs/remove-nulls";
import Team from "../../models/team";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type PropsType = {
    actions: { sendTeamMessage: (teamId: string, message: MessageType) => void },
    currentUser: Object,
    navigation: Object,
    selectedTeamId?: string
};

const NewMessageScreen = ({ actions, currentUser, navigation, selectedTeamId }: PropsType): React$Element<View> => {
    const teamHash = (currentUser.teams || {}) || {};
    const teamList = Object
        .entries(teamHash)
        .map((entry: [string, Object]): TeamType => Team.create(entry[1], entry[0]));

    const [currentTeamId, setCurrentTeamId] = useState(navigation.selectedTeamid || selectedTeamId || (teamList[0] || {}).id || null);

    const [messageText, setMessageText] = useState("");

    useEffect(() => {
        const newTeamId = navigation.selectedTeamId || selectedTeamId || null;
        if (newTeamId && newTeamId !== currentTeamId) {
            setCurrentTeamId(newTeamId);
            setMessageText("");
        }
    }, [selectedTeamId, navigation]);


    const sendMessage = () => {
        const message = Message.create(
            {
                text: messageText,
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

    const items = teamList.map((team: TeamType): React$Element<any> => (
        <Picker.Item key={ team.id } label={ team.name } value={ team.id }/>
    ));

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

            <ScrollView style={ styles.scroll }>
                <View style={ styles.infoBlockContainer }>
                    {

                        <View style={ { marginBottom: 5 } }>
                            <Text style={ styles.labelDark }>{ "Send a Message To Team:" }</Text>
                            { teamList.length > 1
                                ? (
                                    <Picker
                                        style={ styles.picker }
                                        selectedValue={ currentTeamId }
                                        onValueChange={ (teamId: string) => {
                                            setCurrentTeamId(teamId);
                                        } }>
                                        { items }
                                    </Picker>
                                )
                                : (

                                    <Text style={ styles.largeText }>{ (teamHash[currentTeamId] || {}).name }</Text>
                                )
                            }
                        </View>


                    }
                    <TextInput
                        keyBoardType={ "default" }
                        multiline={ true }
                        textAlignVertical="top"
                        onChangeText={ (text: string) => {
                            setMessageText(text);
                        } }
                        placeholder={ "Message details" }
                        value={ messageText }
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

        </View>
    );
};


NewMessageScreen.navigationOptions = {
    title: "Send A Message"
};

const mapStateToProps = (state: Object): Object => {
    const currentUser = User.create({ ...state.login.user, ...removeNulls(state.profile) });
    return { currentUser };
};

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({ actions: bindActionCreators(actionCreators, dispatch) });

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(NewMessageScreen);
