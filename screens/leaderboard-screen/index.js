// @flow
// TODO: Remove inline styles (JN)
import React, { useState } from "react";
import { View, SafeAreaView, TouchableOpacity, FlatList, Text } from "react-native";
import { connect } from "react-redux";
// import { defaultStyles } from "../../styles/default-styles";
import * as R from "ramda";
import * as constants from "../../styles/constants";

// const styles = StyleSheet.create(defaultStyles);

type PropsType = {
    rankings: Array<Object>
};
type ItemPropsType = { rank: number, teamName: string, bagCount: number };
type RowPropsType = { item: ItemPropsType };

const renderRow = ({ item }: RowPropsType): React$Element<any> => (
    <View style={ {
        backgroundColor: "white",
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        height: 50
    } }>
        <View style={ {
            flexBasis: 50,
            flexGrow: 0,
            flexShrink: 0,
            justifyContent: "center",
            height: 50,
            alignSelf: "center",
            backgroundColor: "#EEE",
            borderStyle: "solid",
            borderBottomWidth: 1,
            borderColor: "#AAA",
            borderTopWidth: 1,
            borderTopColor: "#FFF"
        } }>
            <Text style={ { textAlign: "center" } }>{ item.rank || 0 }</Text>
        </View>
        <View style={ {
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: "auto",
            justifyContent: "center",
            alignSelf: "center",
            height: 50,
            backgroundColor: "#FFF",
            borderStyle: "solid",
            borderBottomWidth: 1,
            borderColor: "#AAA",
            borderTopWidth: 1,
            borderTopColor: "#FFF"
        } }>
            <Text style={ { textAlign: "center" } }>{ item.teamName || "Anon" }</Text>
        </View>
        <View style={ {
            flexBasis: 50,
            flexGrow: 0,
            flexShrink: 0,
            justifyContent: "center",
            height: 50,
            alignSelf: "center",
            backgroundColor: "#EEE",
            borderStyle: "solid",
            borderBottomWidth: 1,
            borderBottomColor: "#AAA",
            borderTopWidth: 1,
            borderTopColor: "#FFF"
        } }>
            <Text style={ { textAlign: "center" } }>{ item.bagCount || "0" }</Text>
        </View>
    </View>
);


const LeaderboardScreen = ({ rankings }: PropsType): React$Element<any> => {
    const [sortBy, setSortBy] = useState("rank");

    const sortedRanks = R.cond([
        [
            (sort) => (sort === "rank"),
            () => R.sortBy(ranking => ranking.rank)(rankings)
        ],
        [
            (sort) => (sort === "teamName"),
            () => R.sortBy(ranking => ranking.teamName)(rankings)
        ]
    ])(sortBy);
    return (
        <SafeAreaView style={ { flex: 1, justifyContent: "flex-start", position: "relative", width: "100%" } }>
            <View style={ {
                backgroundColor: "white",
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
                height: 50,
                borderStyle: "solid",
                borderBottomWidth: 1,
                borderColor: "black",
                position: "absolute",
                width: "100%"
            } }>
                <View style={ {
                    flexBasis: 50,
                    flexGrow: 0,
                    flexShrink: 0,
                    justifyContent: "center",
                    height: 50,
                    alignSelf: "center",
                    backgroundColor: "#EEE"
                } }>
                    <TouchableOpacity onPress={ () => {
                        setSortBy("rank");
                    } }>
                        <Text style={ { textAlign: "center" } }>{ "Rank" }</Text>
                    </TouchableOpacity>
                </View>
                <View style={ {
                    flexGrow: 1,
                    flexShrink: 1,
                    flexBasis: "auto",
                    justifyContent: "center",
                    alignSelf: "center",
                    height: 50,
                    backgroundColor: "#FFF"
                } }>
                    <TouchableOpacity onPress={ () => {
                        setSortBy("teamName");
                    } }>
                        <Text style={ { textAlign: "center" } }>{ "Team" }</Text>
                    </TouchableOpacity>
                </View>
                <View style={ {
                    flexBasis: 50,
                    flexGrow: 0,
                    flexShrink: 0,
                    justifyContent: "center",
                    height: 50,
                    alignSelf: "center",
                    backgroundColor: "#EEE"
                } }>
                    <Text style={ { textAlign: "center" } }>{ "Bags" }</Text>
                </View>
            </View>
            <FlatList
                style={ { marginTop: 51 } }
                data={ sortedRanks }
                renderItem={ renderRow }
            />
        </SafeAreaView>
    );
};


LeaderboardScreen.navigationOptions = {
    title: "Live Leaderboard",
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
    const bagDrops = Object.values(state.trashTracker.trashDrops);
    const teamHash = R.map(team => ({ teamId: team.id, teamName: team.name || "Anonymous Team", bagCount: 0 }))(teams);
    const rankings = R.compose(
        R.addIndex(R.map)((ranking, index) => ({
            ...ranking,
            rank: index + 1
        })),
        R.sort((a, b) => (b.bagCount - a.bagCount)),
        Object.values,
        R.reduce((acc, drop) => ({ // sum the bag drops for each team.
            ...acc,
            [drop.teamId]: {
                ...acc[drop.teamId],
                bagCount: ((teams[drop.teamId] || {}).bagCount || 0) + drop.bagCount
            }
        }), teamHash),
        R.filter(drops => Boolean(drops.teamId))
    )(bagDrops);
    return ({ rankings });
};

// $FlowFixMe
export default connect(mapStateToProps)(LeaderboardScreen);
