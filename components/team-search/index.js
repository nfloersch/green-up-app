// @flow
import React, { Component } from "react";
import {
    KeyboardAvoidingView, Platform,
    ScrollView,
    StyleSheet,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    View
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./actions";
import { defaultStyles } from "../../styles/default-styles";
import * as teamMemberStatuses from "../../constants/team-member-statuses";

/**
 *
 * @param {string} termsToSearchFor - what to search for
 * @param {[string]} stringToSearchIn - things we search
 * @returns {number} the number of matches
 */
function searchScore(termsToSearchFor: string, stringToSearchIn: ?string): number {
    // We are deleting this screen
    return 0;
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
    }
};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class SearchItem extends Component<{ item: Object }> {

    render() {
        const item = this.props.item;
        return (
            <TouchableOpacity
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
            </TouchableOpacity>);
    }
}

type Props = {
    actions: Object,
    closeModal: () => void,
    teamMembers: Object,
    teams: Object,
    navigation: Object,
    searchResults: Array<Object>,
    currentUser: Object
};

class TeamSearch extends Component<Props> {

    constructor(props) {
        super(props);
        this.toTeamDetail = this.toTeamDetail.bind(this);
        this.onSearchTermChange = this.onSearchTermChange.bind(this);
        this.state = {
            searchTerm: "",
            searchResults: []
        };
    }

    componentWillMount() {
        return this.onSearchTermChange(this.state.searchTerm);
    }

    componentWillReceiveProps() {
        return this.onSearchTermChange(this.state.searchTerm);
    }

    static navigationOptions = {
        title: "Find a Team"
    };

    onSearchTermChange(searchTerm: string = "") {
        const { teams, teamMembers, currentUser } = this.props;
        const mkey = currentUser.uid;
        // get all the teams the user is on
        const teamsImOn = Object.keys(teamMembers).filter(key =>
            !!teamMembers[key] &&
            (
                (teamMembers[key][mkey] && teamMembers[key][mkey].memberStatus === teamMemberStatuses.OWNER) ||
                (teamMembers[key][mkey] && teamMembers[key][mkey].memberStatus === teamMemberStatuses.ACCEPTED)
            )
        );

        const _searchResults = Object.keys(teams)
            .filter(key => teams[key].isPublic === true ||
                teamsImOn.indexOf(key) > -1)
            .map(key => ({
                key,
                score: searchScore(searchTerm, [teams[key].name,
                    teams[key].description,
                    teams[key].town,
                    teams[key].owner.displayName])
            }))
            .filter(score => (searchTerm.trim() === "" || score.score > 0))
            .sort((score1, score2) => (score2.score - score1.score))
            .map(score => score.key);
        // eliminate dupes
        const searchResults = Array.from(new Set(_searchResults));
        this.setState({ searchResults, searchTerm });
    }

    toTeamDetail(teamId: string) {
        return () => {
            const team = this.props.teams[teamId];
            this.props.actions.selectTeam(team);
            this.props.closeModal();
            this.props.navigation.navigate("TeamDetails");
        };
    }

    render() {
        const teams = this.props.teams;
        const searchResults = this.state.searchResults.map(teamId => (
            { key: teamId, teamId, toDetail: this.toTeamDetail(teamId), team: teams[teamId] }
        ));
        return (
            <KeyboardAvoidingView
                style={ [styles.frame, { paddingTop: 30 }] }
                behavior={ Platform.OS === "ios" ? "padding" : null }
            >
                <View style={ [styles.buttonBarHeader, { backgroundColor: "#EEE", marginTop: 10 }] }>
                    <View style={ styles.buttonBar }>
                        <View style={ styles.buttonBarButton }>
                            <TouchableHighlight
                                style={ styles.headerButton }
                                onPress={ this.props.closeModal }
                            >
                                <Text style={ styles.headerButtonText }>{ "Close" }</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={ styles.searchHeader }>
                    <TextInput
                        keyBoardType={ "default" }
                        onChangeText={ this.onSearchTermChange }
                        placeholder={ "Team Name, Team Owner, or City/Town" }
                        style={ styles.textInput }
                        value={ this.state.searchTerm }
                        underlineColorAndroid={ "transparent" }
                    />
                </View>
                <ScrollView style={ [styles.scroll, { paddingLeft: 10, paddingRight: 10 }] }>
                    <FlatList
                        data={ searchResults }
                        renderItem={ ({ item }) => (<SearchItem item={ item }/>) }
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state) => ({
    teams: state.teams.teams || {},
    teamMembers: state.teams.teamMembers || {},
    currentUser: state.login.user
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamSearch);
