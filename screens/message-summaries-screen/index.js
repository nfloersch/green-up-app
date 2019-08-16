// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
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
import * as actions from "./actions";
import Message from "../../models/message";
import { defaultStyles } from "../../styles/default-styles";
import coveredBridge from "../../assets/images/covered-bridge2.jpg";

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

type TProps = {
    item: Message,
    toDetail: any => any
}

class MessageItem extends Component<TProps> {

    render() {
        const { item, toDetail } = this.props;
        return (
            <TouchableOpacity key={ item.id } onPress={ toDetail }>
                <View style={ [styles.row, { height: 85 }] }>
                    <View style={ { flex: 1, flexDirection: "row" } }>
                        <Image
                            style={ { width: 50, height: 50, marginRight: 10 } }
                            source={ { uri: item.sender.photoURL } }
                        />
                        <View style={ { flex: 1, flexDirection: "column", alignItems: "stretch" } }>
                            <Text style={ [item.read ? styles.read : styles.unread, {
                                fontSize: 10,
                                textAlign: "left",
                                fontWeight: "bold",
                                height: 13
                            }] }
                            >{item.teamName}</Text>
                            <Text style={ [{ height: 40 }, item.read
                                ? styles.oldMsg : styles.newMsg] }>
                                {item.text.length > 80
                                    ? `${item.text.slice(0, 80)}...`
                                    : item.text}
                            </Text>
                            <Text style={ [item.read ? styles.read : styles.unread, {
                                fontSize: 10,
                                textAlign: "right"
                            }] }>
                                {`--${item.sender.displayName || item.sender.email}`}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

class MessageSummariesScreen extends Component {
    static propTypes = {
        actions: PropTypes.object,
        currentUser: PropTypes.object,
        messages: PropTypes.object,
        navigation: PropTypes.object,
        userHasTeams: PropTypes.bool,
        teamMembersLoaded: PropTypes.bool,
        teamsLoaded: PropTypes.bool,
        messagesLoaded: PropTypes.bool,
        teams: PropTypes.object
    };

    static navigationOptions = {
        title: "Message Board",
        tabBarLabel: "Messages"
    };

    constructor(props) {
        super(props);
        this.toMessageDetail = this.toMessageDetail.bind(this);
        this.toSendMessage = this.toSendMessage.bind(this);
    }

    toSendMessage() {
        return () => {
            this.props.navigation.navigate("NewMessage");
        };
    }

    toMessageDetail(message) {
        const userId = (this.props.currentUser || {}).uid;
        switch (message.type) {
            case messageTypes.INVITATION :
                return () => {
                    this.props.actions.selectTeamById(message.teamId);
                    this.props.navigation.navigate("TeamDetails");
                };
            case messageTypes.REQUEST_TO_JOIN :
                return () => {
                    const membershipId = message.sender.email.uid;
                    const teamId = message.teamId;
                    this.props.actions.readMessage(message, userId);
                    this.props.navigation.navigate("TeamMemberDetails", { teamId, membershipId });
                };
            default :
                return () => {
                    // mark message as read
                    this.props.actions.readMessage(message, userId);
                    // navigate to details screen
                    this.props.navigation.navigate("MessageDetails", { messageId: message.id });
                };
        }
    }

    render() {
        const myMessages = Object.entries(this.props.messages).map(entry => Message.create(entry[1], entry[0])).sort((a, b) => b.created.valueOf() - a.created.valueOf());
        return this.props.userHasTeams || myMessages.length > 0 ? (
            <View style={ styles.frame }>
                <View style={ styles.singleButtonHeader }>
                    {
                        this.props.userHasTeams
                            ? (<TouchableHighlight
                                style={ styles.headerButton }
                                onPress={ () => {
                                    this.props.navigation.navigate("NewMessage");
                                } }>
                                <Text style={ styles.headerButtonText }>{"New Message"}</Text>
                            </TouchableHighlight>)
                            : (
                                <View style={ styles.headerButton }>
                                    <Text style={ styles.headerButtonText }>{"Join or create a team to send messages."}</Text>
                                </View>)
                    }
                </View>
                {myMessages.length > 0
                    ? (
                        <ScrollView style={ styles.scroll }>
                            <View style={ styles.infoBlockContainer }>
                                <FlatList
                                    data={ myMessages }
                                    keyExtractor={ item => item.id }
                                    renderItem={ ({ item }) => (
                                        <MessageItem
                                            item={ item }
                                            toDetail={ this.toMessageDetail(item) }/>) }
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
                                <Text style={ [styles.textDark, { textAlign: "center", height: 30 }] }>{"Sorry, no messages yet."}</Text>
                            </View>
                        </ImageBackground>
                    )}
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
                            {"All your messages will be listed here."}
                        </Text>
                        <Text style={ [styles.textDark, { textAlign: "justify" }] }>
                            {"Before you can send or receive messages you will need to join or create a team."}
                        </Text>
                        <TouchableOpacity
                            style={ styles.button }
                            onPress={ () => {
                                this.props.navigation.navigate("Teams");
                            } }
                        >
                            <Text style={ styles.buttonText }>{"Go to \"My Teams\" >"}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const teams = state.teams.teams || {};
    const mapMessagesToTeamNames = queue => Object.values(queue)
        .map(message => Message.create({ ...message, teamName: (teams[message.teamId] || {}).name }))
        .reduce((obj, message) => ({ ...obj, [message.id]: message }), {});
    const messages = Object.values((state.messages || {}).messages || {}).reduce((obj, queue) => ({ ...obj, ...mapMessagesToTeamNames(queue) }), {});
    const userHasTeams = Object.keys((state.profile || {}).teams || {}).length > 0;
    const userHasMessages = state.messages.length > 0;
    return {
        currentUser: state.login.user,
        messages: messages,
        messagesLoaded: state.messages.loaded,
        userHasTeams,
        userHasMessages,
        teamsLoaded: state.messages.teamsLoaded,
        teamMembersLoaded: state.loading.teamMembersLoaded,
        teams: teams
    };
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageSummariesScreen);
