// @flow
import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { defaultStyles } from "../../styles/default-styles";
import * as R from "ramda";
import { Title, Subtitle, Divider, ListView } from "@shoutem/ui";

const styles = StyleSheet.create(defaultStyles);

type PropsType = {
    rankings: Array<Object>
};

const renderRow = (ranking) => {

    if (!ranking) {
        return null;
    }

    return (
        <View style={ { flex: 1, flexDirection: "row" } }>
            <Title styleName="md-gutter-bottom">{ ranking.rank }</Title>
            <Subtitle styleName="sm-gutter-horizontal">{ ranking.teamName }</Subtitle>
            <Title styleName="md-gutter-bottom">{ ranking.bagCount }</Title>
            <Divider styleName="line"/>
        </View>
    );
};


const LeaderboardScreen = ({ rankings }: PropsType): React$Element<any> => (
    <SafeAreaView style={ styles.container }>
        <ListView
            data={ rankings }
            renderRow={ renderRow }/>
    </SafeAreaView>
);


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
