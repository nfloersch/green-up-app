// @flow

import React, { useState, useEffect, Fragment } from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    TextInput
} from "react-native";
import {Picker} from '@react-native-picker/picker';
import { SafeAreaView } from "react-native-safe-area-context";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import User from "../../models/user";
import * as actionCreators from "../../action-creators/message-action-creators";
import Message from "../../models/message";
import { defaultStyles } from "../../styles/default-styles";
import * as messageTypes from "../../constants/message-types";
import { removeNulls } from "../../libs/remove-nulls";
import Team from "../../models/team";
import * as constants from "../../styles/constants";
import ButtonBar from "../../components/button-bar";

const styles = StyleSheet.create(defaultStyles);

type PropsType = {
    actions: { sendTeamMessage: (teamId: string, message: MessageType) => void },
    currentUser: Object,
    navigation: Object,
    selectedTeamId?: string
};

const NewMessageScreen = ({ actions, currentUser, navigation, selectedTeamId }: PropsType): React$Element<View> => {
    const teamHash = (currentUser.teams || {}) || {};
    const teamHashList = Object.entries(teamHash);
    const teamFilterList = teamHashList.filter((entry) => {
        if ('name' in entry[1]) {
            return entry[1].name != null
        }
        return false;
        }
    );
    const teamList = teamFilterList.map(
        (entry: [string, Object]): TeamType => Team.create(entry[1], entry[0])
    );

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
        <Picker.Item key={ team.id } itemStyle={ { backgrounColor: "white" } } label={ team.name } value={ team.id }/>
    ));

    return (
        <SafeAreaView style={ styles.container }>
            <ButtonBar buttonConfigs={
                [
                    { text: "Send Message", onClick: sendMessage },
                    { text: "Cancel", onClick: cancelMessage }
                ]
            }/>

            <ScrollView
                style={ [styles.scroll, {
                    padding: 20
                }] }
                automaticallyAdjustContentInsets={ false }
                scrollEventThrottle={ 200 }
                keyboardShouldPersistTaps={ "always" }>
                <View style={ styles.formControl }>
                    { teamList.length > 1
                        ? (
                            <Fragment>
                                <Text style={ styles.label }>{ "To:" }</Text>
                                <Picker
                                    selectedValue={ currentTeamId }
                                    itemStyle={ { backgroundColor: "#FFFF99", color: "black" } }
                                    onValueChange={ (teamId: string) => {
                                        setCurrentTeamId(teamId);
                                    } }>
                                    { items }
                                </Picker>
                            </Fragment>
                        )
                        : (<Text style={ styles.largeText }>{ `To: ${ (teamHash[currentTeamId] || {}).name }` }</Text>)
                    }
                </View>
                <View style={ styles.formControl }>
                    <Text style={ styles.label }>{ "Your Message" }</Text>
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
            </ScrollView>
        </SafeAreaView>
    );
};


NewMessageScreen.navigationOptions = {
    title: "Send A Message",
    headerStyle: {
        backgroundColor: constants.colorBackgroundDark
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        fontFamily: "Rubik-Regular",
        fontWeight: "bold",
        fontSize: 20,
        color: constants.colorHeaderText
    },
    headerBackTitleStyle: {
        fontFamily: "Rubik-Regular",
        fontWeight: "bold",
        fontSize: 20,
        color: constants.colorHeaderText
    }
};

const mapStateToProps = (state: Object): Object => {
    const currentUser = User.create({ ...state.login.user, ...removeNulls(state.profile) });
    return { currentUser };
};

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({ actions: bindActionCreators(actionCreators, dispatch) });

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(NewMessageScreen);
