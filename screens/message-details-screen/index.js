// @flow
import React from "react";
import { StyleSheet, Image, Text, ScrollView, View } from "react-native";
import { connect } from "react-redux";
import { defaultStyles } from "../../styles/default-styles";
import * as constants from "../../styles/constants";

const myStyles = { messageHeader: { margin: 5 } };
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type PropsType = {
    messages: Object,
    navigation: Object,
    teams: Object
};

const MessageDetailsScreen = ({ messages, navigation, teams }: PropsType): React$Element<View> => {

    const message = messages[navigation.state.params.messageId];
    const teamId = message.teamId;
    const team = teams[teamId] || {};
    return (
        <View style={ styles.frame }>
            { !message
                ? (<Text>{ message || "Oops, sorry.  We could not find that message" }</Text>)
                : (
                    <View style={ { flex: 1 } }>
                        <View style={ {
                            borderBottomColor: "#CCC",
                            borderBottomWidth: 1,
                            height: 70
                        } }>
                            <View style={ { flex: 1, flexDirection: "row", padding: 10, backgroundColor: "#EEE" } }>
                                <Image
                                    style={ { width: 50, height: 50, marginRight: 10 } }
                                    source={ { uri: message.sender.photoURL } }
                                />
                                <View>
                                    <View style={ { height: 30, flex: 1, flexDirection: "row" } }>
                                        <Text style={ { color: "#555", fontSize: 16 } }>{ "From: " }</Text>
                                        <Text style={ [styles.textDark, {
                                            fontSize: 12,
                                            height: 16,
                                            marginTop: 4
                                        }] }>{ message.sender.displayName }</Text>
                                    </View>
                                    <View style={ { height: 30, flex: 1, flexDirection: "row" } }>
                                        <Text style={ { color: "#555", fontSize: 16 } }>{ "To: " }</Text>
                                        <Text style={ [styles.textDark, {
                                            fontSize: 12,
                                            height: 16,
                                            marginTop: 4
                                        }] }>{ team.name }</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <ScrollView style={ {
                            padding: 10
                        } }>
                            <View style={ styles.infoBlockContainer }>
                                <Text style={ [styles.textDark, {
                                    fontSize: 14,
                                    paddingBottom: 10
                                }] }>{ message.text }</Text>
                            </View>
                        </ScrollView>
                    </View>
                )
            }
        </View>
    );
};

MessageDetailsScreen.navigationOptions = {
    title: "Message Details",
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
    const teams = state.teams.teams;
    const messages = Object
        .values((state.messages || {}).messages || {})
        .reduce((obj: Object, queue: Object): Object => ({ ...obj, ...queue }), {});
    return { messages, teams: teams };
};

// $FlowFixMe
export default connect(mapStateToProps)(MessageDetailsScreen);
