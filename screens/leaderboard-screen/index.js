// @flow
// TODO: Remove inline styles (JN)
import React, { useState } from "react";
import { View, SafeAreaView, TouchableOpacity, FlatList, Text } from "react-native";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { getUsersTeams } from "../../libs/team-helpers";
import User from "../../models/user";
import { removeNulls } from "../../libs/remove-nulls";
// import { defaultStyles } from "../../styles/default-styles";
import * as R from "ramda";
import * as constants from "../../styles/constants";

// const styles = StyleSheet.create(defaultStyles);

type PropsType = {
    myTeams: Array<Object>,
    rankings: Array<Object>
};
type ItemPropsType = { rank: number, teamName: string, bagCount: number };
type RowPropsType = { item: ItemPropsType };

const renderRow = ({ item }: RowPropsType): React$Element<any> => {
    const greyBgColor = item.isMyTeam ? constants.colorGreenHighlight : "#EEE";
    const teamBgColor = item.isMyTeam ? constants.colorLightGreenHighlight : "#FFF";
    const textColor = item.isMyTeam ? "white" : "black";
    
    return (
        <View style={ {
            backgroundColor: "white",
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            height: 50
        } }>
            <View style={ {
                flexBasis: 65,
                flexGrow: 0,
                flexShrink: 0,
                justifyContent: "center",
                height: 50,
                alignSelf: "center",
                backgroundColor: greyBgColor,
                borderStyle: "solid",
                borderBottomWidth: 1,
                borderColor: "#AAA",
                borderTopWidth: 1,
                borderTopColor: "#FFF"
            } }>
                <Text style={ { textAlign: "center", color: textColor } }>{ item.rank || 0 }</Text>
            </View>
            <View style={ {
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: "auto",
                justifyContent: "center",
                alignSelf: "center",
                height: 50,
                backgroundColor: teamBgColor,
                borderStyle: "solid",
                borderBottomWidth: 1,
                borderColor: "#AAA",
                borderTopWidth: 1,
                borderTopColor: "#FFF"
            } }>
                <Text style={ { textAlign: "center", color: textColor } }>{ item.teamName || "Anon" }</Text>
            </View>
            <View style={ {
                flexBasis: 65,
                flexGrow: 0,
                flexShrink: 0,
                justifyContent: "center",
                height: 50,
                alignSelf: "center",
                backgroundColor: greyBgColor,
                borderStyle: "solid",
                borderBottomWidth: 1,
                borderBottomColor: "#AAA",
                borderTopWidth: 1,
                borderTopColor: "#FFF"
            } }>
                <Text style={ { textAlign: "center", color: textColor } }>{ item.bagCount || "0" }</Text>
            </View>
        </View>
    )
};


const LeaderboardScreen = ({ myTeams, rankings }: PropsType): React$Element<any> => {
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
                    flexBasis: 65,
                    flexGrow: 0,
                    flexShrink: 0,
                    justifyContent: "center",
                    height: 50,
                    alignSelf: "center",
                    backgroundColor: "#CCC"
                } }>
                    <TouchableOpacity onPress={ () => {
                        setSortBy("rank");
                    } }>
                        <Text style={ { textAlign: "center", fontWeight: "bold" } }>
                            <FontAwesome size={ 15 } name={ "sort" } style={ { color: "#555" } }/>
                            { "  Rank" }
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={ {
                    flexGrow: 1,
                    flexShrink: 1,
                    flexBasis: "auto",
                    justifyContent: "center",
                    alignSelf: "center",
                    height: 50,
                    backgroundColor: "#EEE"
                } }>
                    <TouchableOpacity onPress={ () => {
                        setSortBy("teamName");
                    } }>
                        <Text style={ { textAlign: "center", fontWeight: "bold" } }>
                            <FontAwesome size={ 15 } name={ "sort" } style={ { color: "#555" } }/>
                            { "  Team" }
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={ {
                    flexBasis: 65,
                    flexGrow: 0,
                    flexShrink: 0,
                    justifyContent: "center",
                    height: 50,
                    alignSelf: "center",
                    backgroundColor: "#CCC"
                } }>
                    <TouchableOpacity onPress={ () => {
                        setSortBy("rank");
                    } }>
                        <Text style={ { textAlign: "center", fontWeight: "bold" } }>
                            <FontAwesome size={ 15 } name={ "sort" } style={ { color: "#555" } }/>
                            { "  Bags" }
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                style={ { marginTop: 51 } }
                data={ sortedRanks }
                renderItem={ renderRow }
                keyExtractor={ (teamRow) => teamRow.teamId }
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

function getRankingData(trashDrops, teams, myTeams){
    // only consider trashdrops belonging to current teams
    const teamIds = Object.keys(teams);
    const dropsForTeams = Object.values(trashDrops).filter(drop => teamIds.includes(drop.teamId));

    // populate rankings & bag counts
    const blankRankings = teamIds.map(id => ({teamId: id, teamName: teams[id].name || "Anonymous", bagCount: 0}))
    const summedRankings = blankRankings.map( ranking => {
        const teamDrops = dropsForTeams.filter( drop => drop.teamId === ranking.teamId);
        const count = teamDrops.reduce( (sum, drop) => sum += drop.bagCount, 0);
        return {...ranking, bagCount: count }
    });

    // sort and add "rank" property
    const sortedRankings = summedRankings.sort((a, b) => (b.bagCount - a.bagCount));
    const rankedRankings = sortedRankings.map((ranking, index) => ({
        ...ranking,
        rank: index + 1
    }));

    // add flag to show whether user belongs to team
    const myTeamIds = myTeams.map( t => t.id);
    const userAwareRankings = rankedRankings.map( (ranking) => ({
        ...ranking,
        isMyTeam: myTeamIds.includes(ranking.teamId)
    }));

    return userAwareRankings;
};  


const mapStateToProps = (state: Object): Object => {
    const user = User.create({ ...state.login.user, ...removeNulls(state.profile) });
    const myTeams = getUsersTeams(user, state.teams.teams);
    const rankings = getRankingData(state.trashTracker.trashDrops, state.teams.teams, myTeams);
    return ({ myTeams, rankings });
};

// $FlowFixMe
export default connect(mapStateToProps)(LeaderboardScreen);
