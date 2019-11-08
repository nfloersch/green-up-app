// @flow
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { defaultStyles } from "../../styles/default-styles";
import * as R from "ramda";
import { Tile, Divider, ListView, Text } from "@shoutem/ui";

const styles = StyleSheet.create(defaultStyles);

type PropsType = {
    rankings: Array<Object>
};

const renderRow = (ranking) => {

    if (!ranking) {
        return null;
    }

    return (
        <Tile style={ { flex: 1, flexDirection: "row" } }>
            <Text styleName="md-gutter-bottom">{ ranking.rank }</Text>
            <Text styleName="sm-gutter-horizontal">{ ranking.teamName }</Text>
            <Text styleName="md-gutter-bottom">{ ranking.bagCount }</Text>
            <Divider styleName="line"/>
        </Tile>
    );
};


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
        <SafeAreaView style={ styles.container }>
            <View style={ { height: 50, width: "100%", backgroundColor: "#EEE" } }>
                <View style={ { flex: 1, flexDirection: "row", justifyContent: "space-around" } }>
                    <TouchableOpacity onPress={ () => {
                        setSortBy("rank");
                    } }>
                        <Text>{ "Sort by Rank" }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => {
                        setSortBy("teamName");
                    } }><Text>{ "Sort by Team" }</Text></TouchableOpacity>
                </View>
            </View>
            <ListView data={ sortedRanks } renderRow={ renderRow }/>
        </SafeAreaView>
    );
};


LeaderboardScreen.navigationOptions = {
    title: "Live Leaderboard"
};

const mapStateToProps = (state: Object): Object => {

    const teams = state.teams.teams;
    const bagDrops = state.trashTracker.trashDrops;
    const rankings = R.compose(
        R.addIndex(R.map)((ranking, index) => ({
            ...ranking,
            rank: index
        })),
        R.sort((a, b) => (b.bagCount - a.bagCount)),
        counts => Object
            .entries(teams || {})
            .map(entry => ({
                teamName: (entry[1] || {}).name || "Anonymous Team",
                teamId: entry[0],
                bagCount: counts[entry[0]] || 0
            })),
        R.reduce((a, b) => ({ ...a, [b.teamId]: (a[b.teamId] || 0) + (b.bagCount || 0) }), {})
    )(bagDrops);
    return ({ rankings });
};

export default connect(mapStateToProps)(LeaderboardScreen);
