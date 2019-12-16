// @flow
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../action-creators/team-action-creators";
import { defaultStyles } from "../../styles/default-styles";
import * as teamMemberStatuses from "../../constants/team-member-statuses";
import * as R from "ramda";
import DisplayText from "../../components/display-text";
import * as constants from "../../styles/constants";
import SearchBar from "../../components/search-bar";
import WatchGeoLocation from "../../components/watch-geo-location";
import { searchArray } from "../../libs/search";
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ListView } from "@shoutem/ui";

const myStyles = {

    details: {
        fontWeight: "bold"
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
        color: constants.colorTextThemeLight,
        textShadowColor: `${ constants.colorTextThemeDark }`,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 4,
        lineHeight: 36
    },
    teamDetail: {
        color: constants.colorTextThemeLight,
        fontSize: 14
    }
};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type PropsType = {
    actions: Object,
    closeModal: () => void,
    teamMembers: Object,
    teams: Object,
    navigation: Object,
    searchResults: Array<Object>,
    currentUser: Object,
    towns: Object,
    userLocation: Object
};


const FindTeamScreen = ({ actions, teamMembers, teams, navigation, currentUser, towns, userLocation }: PropsType): React$Element<any> => {

    const [searchTerm, setSearchTerm] = useState("");

    const mkey = currentUser.uid;

    // $FlowFixMe
    const myTeams = R.compose(
        R.filter((key: string): boolean =>
            (teamMembers[key][mkey] && teamMembers[key][mkey].memberStatus === teamMemberStatuses.OWNER) ||
            (teamMembers[key][mkey] && teamMembers[key][mkey].memberStatus === teamMemberStatuses.ACCEPTED)
        ),
        R.filter((key: string): boolean => Boolean(teamMembers[key])),
        Object.keys
    )(teams);

    const notMyTeams = R.compose(
        R.map(key => teams[key]),
        keys => Array.from(new Set(keys)), // remove dupes
        R.filter((key: string): boolean => myTeams.indexOf(key) === -1), // remove user's teams
        Object.keys
    )(teams);

    const [searchResults, setSearchResults] = useState([]);

    const toTeamDetail = (teamId: string): (()=>void) => () => {
        actions.selectTeam(teams[teamId]);
        navigation.navigate("TeamDetails");
    };

    const searchableFields = ["name", "townName", "description", "address", "teamName", "townId"];

    useEffect(() => {
        const teamsFound = searchArray(searchableFields, notMyTeams, searchTerm);
        const mySearchResults = teamsFound.map(team => (
            { teamId: team.id, toDetail: toTeamDetail(team.id), team }
        ));
        setSearchResults(mySearchResults);
    }, [searchTerm]);


    const hasTeams = searchResults.length > 0;

   type ItemType = { item: { team: TeamType, toDetail: any => void } };

   const TeamItem = ({ item }: ItemType): React$Element<any> => (
       <TouchableOpacity key={ item.team.id } onPress={ item.toDetail }>
           <View style={ {
               flex: 1,
               flexDirection: "row",
               borderBottomWidth: 1,
               borderColor: "#AAA",
               paddingTop: 10,
               paddingBottom: 10
           } }>
               <View style={ {
                   flex: 1,
                   justifyContent: "center",
                   width: 40,
                   maxWidth: 40,
                   marginRight: 20,
                   marginLeft: 10
               } }>
                   <MaterialCommunityIcons name={ item.team.isPublic ? "earth" : "earth-off" } size={ 40 }/>
               </View>

               <View style={ {
                   flex: 1,
                   flexDirection: "column",
                   padding: 10,
                   justifyContent: "center",
                   alignItems: "center"
               } }>
                   <View>
                       <Text style={ {
                           textAlign: "center",
                           fontWeight: "bold",
                           color: "#111",
                           fontSize: 16,
                           fontFamily: "Rubik-Regular"
                       } }>
                           { item.team.name || "" }
                       </Text>
                   </View>
                   <View>
                       <Text style={ {
                           textAlign: "center",
                           fontWeight: "bold",
                           color: "#111",
                           fontSize: 12,
                           fontFamily: "Rubik-Regular"
                       } }>
                           { (towns[item.team.townId] || {}).name || "" }
                       </Text>
                   </View>
               </View>
               <View>
                   <View style={ { flex: 1, justifyContent: "center", marginLeft: 20, marginRight: 10 } }>
                       <SimpleLineIcons
                           name={ "arrow-right" }
                           size={ 20 }
                           color="#333"
                       />
                   </View>
               </View>
           </View>
       </TouchableOpacity>
   );


   return (
       <SafeAreaView style={ styles.container }>
           <WatchGeoLocation/>
           <SearchBar searchTerm={ searchTerm } search={ setSearchTerm } userLocation={ userLocation }/>
           { hasTeams
               ? (

                   <View style={ {
                       flex: 1,
                       backgroundColor: constants.colorBackgroundLight
                   } }>
                       <ListView
                           data={ searchResults }
                           renderRow={ item => (<TeamItem item={ item }/>) }
                       />
                   </View>
               )
               : (
                   <View style={ styles.noTeamsFound }>
                       <View style={ styles.noTeamsFoundWrapper }>
                           <DisplayText style={ styles.noTeamsFoundText }>
                               { "Sorry, we couldn't find any teams for you." }
                           </DisplayText>
                           <DisplayText style={ { ...styles.noTeamsFoundText, marginTop: 10 } }>
                               { "Try starting your own!" }
                           </DisplayText>
                       </View>
                   </View>
               )
           }
       </SafeAreaView>
   );
};

FindTeamScreen.navigationOptions = {
    title: "Find a Team",
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

const mapStateToProps = (state: Object): Object => ({
    towns: state.towns.townData,
    teams: state.teams.teams || {},
    teamMembers: state.teams.teamMembers || {},
    currentUser: state.login.user,
    userLocation: state.userLocation
});


const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({
    actions: bindActionCreators(actionCreators, dispatch)
});


// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(FindTeamScreen);
