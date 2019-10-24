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
 * scores a string according to how many search terms it contains
 * @param {string} termsToSearchFor - what to search for
 * @param {string[]} stringsToSearchIn - things we search
 * @returns {number} the number of matches
 */
function searchScore(termsToSearchFor: string, stringsToSearchIn: Array<string>): number {
    // break condition
    if (!Array.isArray(stringsToSearchIn) || stringsToSearchIn.length === 0 || typeof termsToSearchFor !== "string" || termsToSearchFor.length === 0) {
        return 0;
    }
    const searchedString = stringsToSearchIn[0].toLowerCase(); // normalize string to search
    const terms = termsToSearchFor.trim().split(" ");
    const testTerm = terms[0].toLowerCase().trim(); // normalize what to search for
    // score 1 point for contains the search term and an extra point if it starts with the search term
    const score = (searchedString.indexOf(testTerm) > -1 ? 1 : 0) + searchedString.startwWith(testTerm) > -1 ? 1 : 0;
    // Add scores from for the rest of terms on current string and scores from all terms on remaining strings
    return score + searchScore(terms.join(" "), stringsToSearchIn.slice(1)) + searchScore(terms.slice(1), searchedString); // tail call
}

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
        includeFontPadding: false
    }
};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type SearchItemType = { item: { teamId: string, toDetail: ()=>void, team: { isPublic: boolean, location: ?string, name: ?string, town: string, owner: { displayName: string } } } };

const SearchItem = ({ item }: SearchItemType): React$Element<TouchableHighlight> => (
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
    closeModal: () => void,
    teamMembers: Object,
    teams: Object,
    navigation: Object,
    searchResults: Array<Object>,
    currentUser: Object
};

const TeamSearch = ({ actions, teamMembers, teams, navigation, currentUser }: PropsType): React$Element<any> => {

    const [searchTerm, setSearchTerm] = useState("");

    const mkey = currentUser.uid;

    const myTeams = R.compose(
        R.filter((key: string): boolean =>
            (teamMembers[key][mkey] && teamMembers[key][mkey].memberStatus === teamMemberStatuses.OWNER) ||
            (teamMembers[key][mkey] && teamMembers[key][mkey].memberStatus === teamMemberStatuses.ACCEPTED)
        ),
        R.filter((key: string): boolean => Boolean(teamMembers[key])),
        Object.keys
    )(teams);


    const searchResults = R.compose(
        Array.from, // convert back to array
        (arr: Array<string>): Set => new Set(arr), // eliminate dupes
        R.map((score: object): string => score.key), // we only want keys
        R.sort((score1: Object, score2: Object): number => (score2.score - score1.score)), // sort by score
        R.filter((score: Object): boolean => (searchTerm.trim() === "" || score.score > 0)), // filter out zero scores
        R.map((key: string): Object => ({ // get the search score for each team
            key,
            score: searchScore(
                searchTerm,
                [
                    teams[key].name,
                    teams[key].description,
                    teams[key].town,
                    teams[key].owner.displayName
                ]
            )
        })),
        R.filter((key: string): boolean => myTeams.indexOf(key) === -1), // remove user's teams
        // R.filter(key => teams[key].isPublic === true), //   remove private teams - switching to listing private teams
        Object.keys // get team keys
    )(teams);

    const toTeamDetail = (teamId: string): (()=>void) => () => {
        actions.selectTeam(teams[teamId]);
        navigation.navigate("TeamDetails");
    };

    const mySearchResults = searchResults.map((teamId: string): Object => (
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
                        renderItem={ ({ item }: { item: any }): React$Element<SearchItem> => (
                            <SearchItem item={ item }/>) }
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

const mapStateToProps = (state: Object): Object => ({
    teams: state.teams.teams || {},
    teamMembers: state.teams.teamMembers || {},
    currentUser: state.login.user
});

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamSearch);
