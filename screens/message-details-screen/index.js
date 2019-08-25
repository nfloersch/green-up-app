// @flow
import React, { Component } from "react";
import { StyleSheet, Image, Text, ScrollView, View } from "react-native";
import { connect } from "react-redux";
import { defaultStyles } from "../../styles/default-styles";

const myStyles = { messageHeader: { margin: 5 } };
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type Props = {
    messages: Object,
    navigation: Object,
    teams: Object
};

class MessageDetailsScreen extends Component<Props> {

    static navigationOptions = {
        title: "Message Details"
    };

    render() {
        const { messages, teams, navigation } = this.props;
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
    }
}

function mapStateToProps(state) {
    const teams = state.teams.teams;
    const messages = Object.values((state.messages || {}).messages || {}).reduce((obj, queue) => ({ ...obj, ...queue }), {});
    return { messages, teams: teams };
}

export default connect(mapStateToProps)(MessageDetailsScreen);
