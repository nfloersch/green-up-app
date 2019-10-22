// @flow
import React, { useState } from "react";
import {
    StyleSheet,
    FlatList,
    Text,
    TextInput,
    TouchableHighlight,
    View, SafeAreaView
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "./actions";
import { defaultStyles } from "../../styles/default-styles";
import * as teamMemberStatuses from "../../constants/team-member-statuses";
import * as R from "ramda";
import DisplayText from "../../components/display-text";
import * as colors from "../../styles/constants";

/**
 *
 * @param {string} term - what to search for
 * @param {string[]} searchableString - things we search
 * @returns {number} the number of matches
 */
const searchScore = (term: string, searchableString: [string]): number => {
    const terms = term.trim().split(" ");
    const testTerm = terms[0].toLowerCase();
    const score = searchableString.reduce((_score, interrogee) =>
        (_score + (typeof interrogee === "string" &&
        interrogee.toLowerCase().indexOf(testTerm) > -1 ? 1 : 0)), 0);
    return (terms.length <= 1) ? score : score + searchScore(terms.slice(1).join(" "), searchableString);
};

const myStyles = {
    scrollview: {
        marginTop: 10
    },
    details: {
        fontWeight: "bold"
    },
    teamInfo: {
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: "#EFEFEF",
        padding: 3
    },
    noTeamsFound: {
        flex: 1,
        justifyContent: "center"
    },
    noTeamsFoundWrapper: {
        backgroundColor: "#FFFFFF44",
        width: "100%",
        padding: 20
    },
    noTeamsFoundText: {
        fontSize: 30,
        color: colors.colorTextThemeLight,
        textShadowColor: `${ colors.colorTextThemeDark }`,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 4,
        lineHeight: 36
    },
    teamDetail: {
        color: colors.colorTextThemeLight,
        fontSize: 14
    },
    teamNameWrapper: {
        paddingTop: 4,
        paddingBottom: 4,
        flex: 1,
        justifyContent: "center"
    },
    teamName: {
        fontSize: 30,
        color: colors.colorTextThemeLight,
        textShadowColor: "#a74b2e",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 4,
        textAlign: "center",
        textAlignVertical: "center",
        includeFontPadding: false,
    }
};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type SearchItemType = { item: { teamId: string, toDetail: ()=>void, team: { isPublic: boolean, location: ?string, name: ?string, town: string, owner: { displayName: string } } } };

const SearchItem = ({ item }: SearchItemType) => (
    <TouchableHighlight
        key={ item.teamId }
        onPress={ item.toDetail }
        style={ { margin: 5, backgroundColor: colors.colorButton, padding: 10 } }
    >
        <View styles={ { flex: 1, justifyItems: "center" } }>
            <View style={ { flex: 1, flexDirection: "row", justifyContent: "space-between" } }>
                <Text style={ [styles.teamDetail, { color: colors.colorTextThemeLight }] }>
                    { item.team.town }
                </Text>
                <Text style={ [styles.teamDetail, { color: colors.colorTextThemeLight }] }>
                    { item.team.isPublic ? "Public" : "Private" }
                </Text>
            </View>
            <View style={ styles.teamNameWrapper }>
                <DisplayText
                    style={ styles.teamName }>
                    { item.team.name }
                </DisplayText>
            </View>
            <View style={ { flex: 1, flexDirection: "row", justifyContent: "space-between" } }>
                <Text style={ [styles.teamDetail, { color: colors.colorTextThemeLight }] }>
                    { item.team.location }
                </Text>
                <Text style={ [styles.teamDetail, { color: colors.colorTextThemeLight }] }>
                    { item.team.owner.displayName }
                </Text>
            </View>
        </View>
    </TouchableHighlight>
);

type PropsType = {
    actions: Object,
    closeModal: () => void;
    teamMembers: Object,
    teams: Object,
    navigation: Object,
    searchResults: Array<Object>,
    currentUser: Object
};

const TeamSearch = ({ actions, teamMembers, teams, navigation, currentUser }: PropsType) => {

    const [searchTerm, setSearchTerm] = useState("");

    const mkey = currentUser.uid;

    const myTeams = R.compose(
        R.filter(key =>
            (teamMembers[key][mkey] && teamMembers[key][mkey].memberStatus === teamMemberStatuses.OWNER) ||
            (teamMembers[key][mkey] && teamMembers[key][mkey].memberStatus === teamMemberStatuses.ACCEPTED)
        ),
        R.filter(key => Boolean(teamMembers[key])),
        Object.keys
    )(teams);


    const searchResults = R.compose(
        Array.from, // convert back to array
        arr => new Set(arr), // eliminate dupes
        R.map(score => score.key), // we only want keys
        R.sort((score1, score2) => (score2.score - score1.score)), // sort by score
        R.filter(score => (searchTerm.trim() === "" || score.score > 0)), // filter out zero scores
        R.map(key => ({ // get the search score for each team
            key,
            score: searchScore(searchTerm, [teams[key].name,
                teams[key].description,
                teams[key].town,
                teams[key].owner.displayName])
        })),
        R.filter(key => myTeams.indexOf(key) === -1), // remove user's teams
        // R.filter(key => teams[key].isPublic === true), //   remove private teams - switching to listing private teams
        Object.keys // get team keys
    )(teams);

    const toTeamDetail = (teamId: string) => () => {
        actions.selectTeam(teams[teamId]);
        navigation.navigate("TeamDetails");
    };

    const mySearchResults = searchResults.map(teamId => (
        { key: teamId, teamId, toDetail: toTeamDetail(teamId), team: teams[teamId] }
    ));


    const hasTeams = mySearchResults.length > 0;
    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.searchHeader }>
                <TextInput
                    keyBoardType={ "default" }
                    onChangeText={ setSearchTerm }
                    placeholder={ "Team Name, Team Owner, or City/Town" }
                    style={ styles.textInput }
                    value={ searchTerm }
                    underlineColorAndroid={ "transparent" }
                />
            </View>
            { hasTeams
                ? (
                    <FlatList
                        data={ mySearchResults }
                        renderItem={ ({ item }) => (<SearchItem item={ item }/>) }
                    />
                )
                : (
                    <View style={ styles.noTeamsFound }>
                        <View style={ styles.noTeamsFoundWrapper }>
                            <DisplayText style={ styles.noTeamsFoundText }>
                                { "Sorry, we couldn't find any teams for you." }
                            </DisplayText>
                            <DisplayText style={ [styles.noTeamsFoundText, { marginTop: 10 }] }>
                                { "Try starting your own!" }
                            </DisplayText>
                        </View>
                    </View>
                )
            }
        </SafeAreaView>
    );
};

TeamSearch.navigationOptions = {
    title: "Find a Team",
    headerStyle: {
        backgroundColor: "#FFF"
    },
    headerTintColor: colors.colorTextThemeDark,
    headerTitleStyle: {
        fontFamily: "sriracha",
        fontWeight: "bold",
        fontSize: 26,
        color: colors.colorTextThemeDark
    }
};

const mapStateToProps = (state) => ({
    teams: state.teams.teams || {},
    teamMembers: state.teams.teamMembers || {},
    currentUser: state.login.user
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamSearch);
