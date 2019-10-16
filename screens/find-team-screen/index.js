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
    }
};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type SearchItemType = { item: { teamId: string, toDetail: ()=>void, team: { name: string, town: string, owner: { displayName: string } } } };

const SearchItem = ({ item }: SearchItemType) => (
    <TouchableHighlight
        key={ item.teamId }
        onPress={ item.toDetail }
        style={ [styles.altButton] }
    >
        <View styles={ { flex: 1, justifyItems: "center" } }>
            <Text style={ [styles.teamTitle, { color: "#1E1E1E", marginTop: 5, textAlign: "center" }] }>
                { item.team.name }
            </Text>
            <View style={ { flex: 1, flexDirection: "row", justifyContent: "space-between" } }>
                <Text style={ [styles.teamSearchTown, { color: "#1E1E1E" }] }>
                    { item.team.town }
                </Text>
                <Text style={ [styles.teamSearchOwner, { color: "#1E1E1E" }] }>
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
    const [searchResults, setSearchResults] = useState([]);

    const onSearchTermChange = (_searchTerm: string = "") => {
        const mkey = currentUser.uid;

        const myTeams = R.compose(
            R.filter(key =>
                (teamMembers[key][mkey] && teamMembers[key][mkey].memberStatus === teamMemberStatuses.OWNER) ||
                (teamMembers[key][mkey] && teamMembers[key][mkey].memberStatus === teamMemberStatuses.ACCEPTED)
            ),
            R.filter(key => Boolean(teamMembers[key])),
            Object.keys
        )(teams);


        const _searchResults = R.compose(
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
            R.filter(key => teams[key].isPublic === true || myTeams.indexOf(key) > -1), //   remove private teams
            Object.keys // get team keys
        )(teams);

        setSearchResults(_searchResults);
        setSearchTerm(_searchTerm);
    };

    const toTeamDetail = (teamId: string) => () => {
        actions.selectTeam(teams[teamId]);
        navigation.navigate("TeamDetails");
    };

    const mySearchResults = searchResults.map(teamId => (
        { key: teamId, teamId, toDetail: toTeamDetail(teamId), team: teams[teamId] }
    ));
    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.searchHeader }>
                <TextInput
                    keyBoardType={ "default" }
                    onChangeText={ onSearchTermChange }
                    placeholder={ "Team Name, Team Owner, or City/Town" }
                    style={ styles.textInput }
                    value={ searchTerm }
                    underlineColorAndroid={ "transparent" }
                />
            </View>
            <FlatList
                data={ mySearchResults }
                renderItem={ ({ item }) => (<SearchItem item={ item }/>) }
            />
        </SafeAreaView>
    );
};

TeamSearch.navigationOptions = {
    title: "Find a Team"
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
