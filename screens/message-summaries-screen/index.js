// @flow
import React from "react";
import {
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as messageTypes from "../../constants/message-types";
import * as actionCreators from "../../action-creators/message-action-creators";
import Message from "../../models/message";
import { defaultStyles } from "../../styles/default-styles";
import * as R from "ramda";
import * as constants from "../../styles/constants";
import { Button, ListView, View, Text, Title, Subtitle } from "@shoutem/ui";
import { SimpleLineIcons } from "@expo/vector-icons";
import ButtonBar from "../../components/button-bar";


const myStyles = {
    message: {
        marginBottom: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: "#888",
        borderStyle: "solid"
    },
    unread: {
        color: "#111",
        fontSize: 12,
        shadowColor: "#FFF",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1
    },
    read: {
        color: "#888",
        fontSize: 12,
        shadowColor: "#FFF",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1
    },
    oldMsg: {
        color: "#888",
        fontSize: 16,
        height: 60,
        fontFamily: "Rubik-Regular"
    },
    newMsg: {
        fontWeight: "bold",
        color: "#111",
        fontSize: 16,
        height: 60,
        fontFamily: "Rubik-Regular"
    },
    loadingScreen: {
        justifyContent: "center",
        alignItems: "center"

    }
};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type ItemPropsType = {
    item: MessageType,
    toDetail: any => any
};

const MessageSummary = ({ item, toDetail }: ItemPropsType): React$Element<any> => {
    const sender = item.sender || {};
    const messageStyle = item.read ? styles.oldMsg : styles.newMsg;
    return (
        <TouchableOpacity key={ item.id } onPress={ toDetail }>
            <View style={ {
                flex: 1,
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "#AAA"
            } }>
                <Image
                    style={ { width: 80, height: 80 } }
                    source={ { uri: sender.photoURL } }
                />
                <View style={ { flex: 1, flexDirection: "column", alignItems: "stretch" } }>
                    <View style={ { flex: 1, justifyContent: "center", padding: 10 } }>
                        <Text style={ messageStyle }>
                            { (item.text || "").length > 80
                                ? `${ (item.text || "").slice(0, 80) }...`
                                : item.text }
                        </Text>
                    </View>
                </View>
                <View>
                    <View style={ { flex: 1, justifyContent: "center", marginLeft: 20, marginRight: 10 } }>
                        <SimpleLineIcons
                            name={ "arrow-right" }
                            size={ 20 }
                            color="#333"
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};


type MessagePropsType = {
    actions: Object,
    currentUser: Object,
    messages: Object,
    navigation: Object,
    userHasTeams: boolean
};


const MessageSummariesScreen = ({ actions, currentUser, messages, navigation, userHasTeams }: MessagePropsType): React$Element<any> => {

    const toMessageDetail = (message: MessageType): (()=>void) => {
        const userId = (currentUser || {}).uid;
        switch (message.type) {
            case messageTypes.INVITATION :
                return () => {
                    actions.selectTeamById(message.teamId);
                    navigation.navigate("TeamDetails");
                };
            case messageTypes.REQUEST_TO_JOIN :
                return () => {
                    const membershipId = ((message.sender || {}).email || {}).uid || "";
                    const teamId = message.teamId;
                    actions.readMessage(message, userId);
                    navigation.navigate("TeamMemberDetails", { teamId, membershipId });
                };
            default :
                return () => {
                    // mark message as read
                    actions.readMessage(message, userId);
                    // navigate to details screen
                    navigation.navigate("MessageDetails", { messageId: message.id });
                };
        }
    };

    const myMessages = Object
        .entries(messages)
        .map((entry: [string, Object]): MessageType => Message.create(entry[1], entry[0]))
        .sort((a: MessageType, b: MessageType): number => (b.created || 0).valueOf() - (a.created || 0).valueOf());


    const getHeader = R.cond([
        [(hasTeams, hasMessages) => (!hasTeams && !hasMessages), () => (null)],
        [(hasTeams, hasMessages) => (!hasTeams && hasMessages), () => (
            <View style={ styles.singleButtonHeader }>
                <View style={ styles.headerButton }>
                    <Text style={ styles.headerButtonText }>
                        { "To send messages, join or create a team." }
                    </Text>
                </View>
            </View>
        )],
        [
            R.T,
            () => (
                <ButtonBar
                    buttonConfigs={ [
                        {
                            text: "New Message",
                            onClick: () => {
                                navigation.navigate("NewMessage");
                            }
                        }
                    ] }/>
            )]
    ]);


    const getContent = R.cond(
        [
            [
                (_messages, hasTeams) => (hasTeams && _messages.length === 0),
                () => (
                    <View style={ { backgroundColor: "white", padding: 30, margin: 30 } }>
                        <Title style={ {
                            textAlign: "center",
                            color: "#000",
                            marginBottom: 20
                        } }>
                            { "Sorry, no messages yet." }
                        </Title>
                        <Title style={ {
                            textAlign: "center",
                            color: "#000"
                        } }>
                            { "Click the \"New Message\" button to send one to your team." }
                        </Title>
                    </View>

                )
            ],
            [
                (_messages, hasTeams) => (!hasTeams && _messages.length === 0),
                () => (
                    <View style={ { padding: 10, marginTop: 30 } }>
                        <View style={ { backgroundColor: "white", padding: 10, marginTop: 30 } }>
                            <Title style={ { marginBottom: 20, textAlign: "center" } }>
                                { "Your messages will appear here." }
                            </Title>
                            <Subtitle style={ { textAlign: "center" } }>
                                { "To send messages, join or create a team." }
                            </Subtitle>
                        </View>
                        <View styleName="horizontal" style={ { marginTop: 30 } }>
                            <Button
                                onPress={ () => {
                                    navigation.navigate("FindTeam");
                                } }
                                styleName="confirmation">
                                <Text>JOIN A TEAM</Text>
                            </Button>

                            <Button
                                onPress={ () => {
                                    navigation.navigate("NewTeam");
                                } }
                                styleName="confirmation secondary">
                                <Text>CREATE A TEAM</Text>
                            </Button>
                        </View>
                    </View>
                )
            ],
            [
                R.T,
                (_messages) => (
                    <ListView
                        data={ _messages }
                        renderRow={ message => (
                            <MessageSummary item={ message } toDetail={ toMessageDetail(message) }/>) }
                    />
                )
            ]
        ]);


    return (
        <SafeAreaView style={ styles.container }>
            { getHeader(userHasTeams, Object.keys(messages || {}).length > 0) }
            <View style={ {
                flex: 1,
                backgroundColor: constants.colorBackgroundLight
            } }>
                { getContent(myMessages, userHasTeams) }
            </View>

        </SafeAreaView>
    );
};


MessageSummariesScreen.navigationOptions = {
    title: "Message Board",
    tabBarLabel: "Messages",
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

type MessageHashType = { [key: string]: MessageType };

const mapStateToProps = (state: Object): Object => {
    const teams = state.teams.teams || {};

    // $FlowFixMe
    const addTeamNamesToMessages = R.compose(
        R.reduce((obj: Object, message: MessageType): MessageHashType => ({ ...obj, [message.id]: message }), {}),
        R.map((message: Object): MessageType => Message.create({
            ...message,
            teamName: (teams[message.teamId] || {}).name
        })),
        Object.values
    );

    const messages = Object
        .values((state.messages || {}).messages || {})
        .reduce((obj: Object, queue: Object): MessageHashType => ({ ...obj, ...addTeamNamesToMessages(queue) }), {});

    const userHasTeams = Object.keys((state.profile || {}).teams || {}).length > 0;
    return {
        currentUser: state.login.user,
        messages: messages,
        messagesLoaded: state.messages.loaded,
        userHasTeams
    };
};


const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(MessageSummariesScreen);
