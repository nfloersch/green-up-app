// @flow
import React from "react";
import { View, FlatList } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { defaultStyles } from "../../styles/default-styles";
import { getUsersTeams } from "../../libs/team-helpers";
import User from "../../models/user";
import { removeNulls } from "../../libs/remove-nulls";
import { getCurrentGreenUpDay } from "../../libs/green-up-day-calucators";
import moment from "moment";
import * as R from "ramda";
import HomeButton from "../../components/home-button";
import * as colors from "../../styles/constants";
import { connectStyle } from "@shoutem/theme";
import { Screen } from "@shoutem/ui";
import { selectTeam } from "../../action-creators/team-action-creators";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);

const homeTitle = R.cond(
    [
        [(days: number): boolean => days > 1, (days: number): string => `${ days } days until Green Up Day`],
        [(days: number): boolean => days === 1, (): string => "Tomorrow is Green Up Day!"],
        [(days: number): boolean => days === 0, (): string => "It's Green Up Day!"],
        [(days: number): boolean => days < 0, (): string => "Keep on Greening"]
    ]
)(moment(getCurrentGreenUpDay()).diff(moment(), "days"));

type PropsType = {
    actions: { selectTeam: TeamType => void },
    navigation: Object,
    currentUser: Object,
    myTeams: Array<Object>,
    style: ?Object,
    teams: { [key: string]: TeamType }
};

const isOwner = (teams, user: UserType, teamId: string): boolean => {
    const teamOwner = (teams[teamId] || {}).owner;
    return teamOwner && teamOwner.uid === user.uid;
};


const menuConfig = {
    messages: {
        order: 1,
        navigation: "Messages",
        label: "Messages",
        backgroundImage: require("../../assets/images/button-image-ford-1970.png")
    },
    findATeam: {
        order: 100,
        navigation: "FindTeam",
        label: "Find A Team",
        backgroundImage: require("../../assets/images/button-image-girls-2-1970.jpg")
    },
    createATeam: {
        order: 101,

        navigation: "NewTeam",
        label: "Start A Team",
        backgroundImage: require("../../assets/images/button-image-gov-dean-1970.jpg")
    },
    handlingTrash: {
        order: 102,
        navigation: "HandlingTrash",
        label: "Handling Trash",
        backgroundImage: require("../../assets/images/button-image-loading-pickup-1970.jpg")
    },
    freeSupplies: {
        order: 103,
        navigation: "FreeSupplies",
        label: "Free Supplies",
        backgroundImage: require("../../assets/images/button-image-car-1970.jpg")
    },
    celebrations: {
        order: 104,
        navigation: "Celebrations",
        label: "Celebrations",
        backgroundImage: require("../../assets/images/button-image-royalton-bandstand.jpg")
    },
    greenUpFacts: {
        order: 105,
        navigation: "GreenUpFacts",
        label: "Green Up Facts",
        backgroundImage: require("../../assets/images/button-image-dump-truck-bags-1970.jpg")
    }
};

const HomeScreen = ({ actions, currentUser, navigation, myTeams, teams }: PropsType): React$Element<any> => {

    // $FlowFixMe
    const teamButtonsConfig = R.reduce((acc: Object, team: TeamType): Object => ({
        ...acc,
        [team.id]: {
            order: 20,
            navigation: isOwner(teams, currentUser, (team.id || "foo")) ? "TeamEditor" : "TeamDetails",
            beforeNav: () => {
                actions.selectTeam(team);
            },
            label: team.name || "My Team",
            backgroundImage: require("../../assets/images/button-image-girls-1970.jpg")
        }
    }), {});

    // $FlowFixMe
    const myButtons = R.compose(
        R.map((entry: Array<any>): Object => ({
            onPress: () => {
                if (entry[1].beforeNav) {
                    entry[1].beforeNav();
                }
                navigation.navigate(entry[1].navigation);
            },
            label: entry[1].label,
            backgroundImage: entry[1].backgroundImage,
            id: entry[0],
            key: entry[0]
        })),
        R.sort((a: Object, b: Object): number => a[1].order - b[1].order),
        Object.entries
    );

    const fillerButtonConfig = {
        fillerButton: {
            order: 999,
            navigation: "HomeScreen",
            backgroundImage: require("../../assets/images/filler-button-background.png")
        }
    };

    const teamButtons = teamButtonsConfig(myTeams);
    const buttonConfigs = { ...menuConfig, ...teamButtons };
    const oddButtons = Object.keys(buttonConfigs).length % 2 !== 0;
    const data = myButtons({ ...buttonConfigs, ...(oddButtons ? fillerButtonConfig : {}) });

    return (
        <Screen style={ { backgroundColor: colors.colorBackgroundHome } }>
            <FlatList
                data={ data }
                keyExtractor={ (item: Object): string => item.id }
                renderItem={ ({ item }: { item: Object }): React$Element<any> => (<HomeButton { ...item }/>) }
                numColumns={ 2 }
                style={ { paddingTop: 2, paddingLeft: 1, paddingRight: 1, paddingBottom: 2 } }
            >
                <View style={ { height: 20 } }/>
            </FlatList>
        </Screen>
    );
};

HomeScreen.navigationOptions = {
    title: homeTitle,
    headerStyle: {
        backgroundColor: "#FFF"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        fontFamily: "sriracha",
        fontWeight: "bold",
        fontSize: 26,
        color: colors.colorButton
    }
};

const mapStateToProps = (state: Object): Object => {
    const user = User.create({ ...state.login.user, ...removeNulls(state.profile) });
    const teams = state.teams.teams || {};
    const myTeams = getUsersTeams(user, teams);
    return ({ myTeams, currentUser: user, teams });
};

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({
    actions: bindActionCreators({ selectTeam }, dispatch)
});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(connectStyle("org.greenup.HomeScreen", combinedStyles)(HomeScreen));
