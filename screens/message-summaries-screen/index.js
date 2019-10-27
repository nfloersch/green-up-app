// @flow
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    ImageBackground,
    TouchableOpacity,
    View,
    FlatList
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as messageTypes from "../../constants/message-types";
import * as actionCreators from "./actions";
import Message from "../../models/message";
import { defaultStyles } from "../../styles/default-styles";
import coveredBridge from "../../assets/images/covered-bridge2.jpg";
import * as R from "ramda";

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
        shadowColor: "#FFF",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1
    },
    newMsg: {
        fontWeight: "bold",
        color: "#111",
        fontSize: 16,
        shadowColor: "#FFF",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1
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

const MessageItem = ({ item, toDetail }: ItemPropsType): React$Element<any> => {
    const sender = item.sender || {};
    return (
        <TouchableOpacity key={ item.id } onPress={ toDetail }>
            <View style={ [styles.row, { height: 85 }] }>
                <View style={ { flex: 1, flexDirection: "row" } }>
                    <Image
                        style={ { width: 50, height: 50, marginRight: 10 } }
                        source={ { uri: sender.photoURL } }
                    />
                    <View style={ { flex: 1, flexDirection: "column", alignItems: "stretch" } }>
                        <Text style={ [item.read ? styles.read : styles.unread, {
                            fontSize: 10,
                            textAlign: "left",
                            fontWeight: "bold",
                            height: 13
                        }] }
                        >{ item.teamName }</Text>
                        <Text style={ [{ height: 40 }, item.read
                            ? styles.oldMsg : styles.newMsg] }>
                            { (item.text || "").length > 80
                                ? `${ (item.text || "").slice(0, 80) }...`
                                : item.text }
                        </Text>
                        <Text style={ [item.read ? styles.read : styles.unread, {
                            fontSize: 10,
                            textAlign: "right"
                        }] }>
                            { `--${ sender.displayName || sender.email || "" }` }
                        </Text>
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

    return userHasTeams || myMessages.length > 0 ? (
        <View style={ styles.frame }>
            <View style={ styles.singleButtonHeader }>
                {
                    userHasTeams
                        ? (<TouchableHighlight
                            style={ styles.headerButton }
                            onPress={ () => {
                                navigation.navigate("NewMessage");
                            } }>
                            <Text style={ styles.headerButtonText }>{ "New Message" }</Text>
                        </TouchableHighlight>)
                        : (
                            <View style={ styles.headerButton }>
                                <Text
                                    style={ styles.headerButtonText }>{ "Join or create a team to send messages." }</Text>
                            </View>)
                }
            </View>
            { myMessages.length > 0
                ? (
                    <ScrollView style={ styles.scroll }>
                        <View style={ styles.infoBlockContainer }>
                            <FlatList
                                data={ myMessages }
                                keyExtractor={ (item: Object): string => item.id }
                                renderItem={ ({ item }: { item: Object }): React$Element<any> => (
                                    <MessageItem
                                        item={ item }
                                        toDetail={ toMessageDetail(item) }/>) }
                                style={ styles.infoBlockContainer }
                            />
                        </View>
                    </ScrollView>
                )
                : (
                    <ImageBackground source={ coveredBridge } style={ styles.backgroundImage }>
                        <View style={ {
                            marginTop: "20%",
                            paddingLeft: 20,
                            paddingRight: 20,
                            paddingTop: 50,
                            paddingBottom: 50,
                            backgroundColor: "rgba(255,255,255, 0.85)"
                        } }>
                            <Text style={ [styles.textDark, {
                                textAlign: "center",
                                height: 30
                            }] }>{ "Sorry, no messages yet." }</Text>
                        </View>
                    </ImageBackground>
                ) }
        </View>
    ) : (
        <View style={ styles.frame }>
            <ImageBackground source={ coveredBridge } style={ styles.backgroundImage }>
                <View style={ {
                    marginTop: "20%",
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 50,
                    paddingBottom: 50,
                    backgroundColor: "rgba(255,255,255, 0.85)"
                } }>
                    <Text style={ [styles.textDark, { textAlign: "justify" }] }>
                        { "All your messages will be listed here." }
                    </Text>
                    <Text style={ [styles.textDark, { textAlign: "justify" }] }>
                        { "Before you can send or receive messages you will need to join or create a team." }
                    </Text>
                    <TouchableOpacity
                        style={ styles.button }
                        onPress={ () => {
                            navigation.navigate("Teams");
                        } }
                    >
                        <Text style={ styles.buttonText }>{ "Go to \"My Teams\" >" }</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};


MessageSummariesScreen.navigationOptions = {
    title: "Message Board",
    tabBarLabel: "Messages"
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
    const userHasMessages = state.messages.length > 0;
    return {
        currentUser: state.login.user,
        messages: messages,
        messagesLoaded: state.messages.loaded,
        userHasTeams,
        userHasMessages
    };
};


const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(MessageSummariesScreen);
