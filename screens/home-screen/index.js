// @flow
import React from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { defaultStyles } from "../../styles/default-styles";
import { getUsersTeams } from "../../libs/team-helpers";
import User from "../../models/user";
import { removeNulls } from "../../libs/remove-nulls";
import { daysUntilCurrentGreenUpDay } from "../../libs/green-up-day-calucators";
import * as R from "ramda";
import * as colors from "../../styles/constants";
import { connectStyle } from "@shoutem/theme";
import { selectTeam } from "../../action-creators/team-action-creators";
import * as constants from "../../styles/constants";
import {
    Text,
    Card,
    Divider,
    GridRow,
    Image,
    ImageBackground,
    ListView,
    Subtitle,
    Tile
} from "@shoutem/ui";


const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);

const homeTitle = R.cond(
    [
        [(days: number): boolean => days > 1, (days: number): string => `${ days } days until Green Up Day`],
        [(days: number): boolean => days === 1, (): string => "Tomorrow is Green Up Day!"],
        [(days: number): boolean => days === 0, (): string => "It's Green Up Day!"],
        [(days: number): boolean => days < 0, (): string => "Keep on Greening"]
    ]
)(daysUntilCurrentGreenUpDay());

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


const HomeScreen = ({ actions, currentUser, navigation, myTeams, teams }: PropsType): React$Element<any> => {

    const menuConfig = {
        messages: {
            order: 100,
            navigation: "Messages",
            label: "Messages",
            description: "Chat with your team.",
            backgroundImage: require("../../assets/images/horse-wide.jpg"),
            backgroundImageLarge: require("../../assets/images/horse-large.jpg")
        },
        findATeam: {
            order: myTeams.length === 0 ? 1 : 200,
            navigation: "FindTeam",
            label: "Find A Team",
            description: "Who's cleaning where.",
            backgroundImage: require("../../assets/images/girls-wide.jpg"),
            backgroundImageLarge: require("../../assets/images/girls-large.jpg")
        },
        createATeam: {
            order: myTeams.length === 0 ? 2 : 301,
            navigation: "NewTeam",
            label: "Start A Team",
            description: "Be a team captain",
            backgroundImage: require("../../assets/images/ford-wide.jpg"),
            backgroundImageLarge: require("../../assets/images/ford-large.jpg")
        },
        trashDisposal: {
            order: 400,
            navigation: "TrashDisposal",
            label: "Trash Disposal",
            description: "Tag your bags",
            backgroundImage: require("../../assets/images/dump-truck-wide.jpg"),
            backgroundImageLarge: require("../../assets/images/dump-truck-large.jpg")
        },
        freeSupplies: {
            order: 401,
            navigation: "FreeSupplies",
            label: "Free Supplies",
            description: "Get gloves and bags",
            backgroundImage: require("../../assets/images/car-wide.jpg"),
            backgroundImageLarge: require("../../assets/images/car-large.jpg")
        },
        celebrations: {
            order: 402,
            navigation: "Celebrations",
            label: "Celebrations",
            description: "Fun things to do",
            backgroundImage: require("../../assets/images/party-wide.jpg"),
            backgroundImageLarge: require("../../assets/images/party-large.jpg")
        },
        greenUpFacts: {
            order: 403,
            navigation: "GreenUpFacts",
            label: "Green Up Facts",
            description: "All about Green Up Day",
            backgroundImage: require("../../assets/images/posters-wide.jpg"),
            backgroundImageLarge: require("../../assets/images/posters-large.jpg")
        }
    };

    // $FlowFixMe
    const teamButtonsConfig = R.addIndex(R.reduce)((acc: Object, team: TeamType, index): Object => ({
        ...acc,
        [team.id]: {
            order: 20,
            navigation: isOwner(teams, currentUser, (team.id || "foo")) ? "TeamEditor" : "TeamDetails",
            beforeNav: () => {
                actions.selectTeam(team);
            },
            label: team.name || "My Team",
            description: "Who, Where and When",
            backgroundImage: (index % 2 > 0) ? require("../../assets/images/royalton-bandstand-wide.jpg") : require("../../assets/images/man-boy-wide.jpg"),
            backgroundImageLarge: (index % 2 > 0) ? require("../../assets/images/royalton-bandstand-large.jpg") : require("../../assets/images/man-boy-large.jpg")
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
            backgroundImageLarge: entry[1].backgroundImageLarge,
            description: entry[1].description,
            id: entry[0],
            key: entry[0]
        })),
        R.sort((a: Object, b: Object): number => a[1].order - b[1].order),
        Object.entries
    );

    const teamButtons = teamButtonsConfig(myTeams);
    const buttonConfigs = { ...menuConfig, ...teamButtons };
    const data = myButtons(buttonConfigs);
    let isFirstArticle = (data.length % 2 !== 0); // Show a featured button if we have an odd number of buttons.
    const groupedData = GridRow.groupByRows(data, 2, () => {
        if (isFirstArticle) {
            isFirstArticle = false;
            return 2;
        }
        return 1;
    });

    const renderRow = (rowData, index) => {
        // rowData contains grouped data for one row,
        // so we need to remap it into cells and pass to GridRow
        if (rowData.length === 1) {
            return (
                <TouchableOpacity key={ index } onPress={ rowData[0].onPress }>
                    <ImageBackground
                        styleName="large-wide"
                        source={ rowData[0].backgroundImageLarge }
                    >
                        <Tile>

                            <Text style={ {
                                color: "white",
                                fontSize: 30,
                                fontFamily: "sriracha"

                            } }
                            styleName="md-gutter-bottom">{ rowData[0].label }</Text>
                            <Text style={ { color: "white", fontSize: 20, fontFamily: "sriracha" } }
                                styleName="sm-gutter-horizontal">{ rowData[0].description }</Text>

                        </Tile>
                    </ImageBackground>
                    <Divider styleName="line"/>
                </TouchableOpacity>
            );
        }

        const cellViews = rowData.map((item, id) => (
            <TouchableOpacity
                key={ id }
                onPress={ item.onPress }
                styleName="flexible">
                <Card styleName="flexible">
                    <Image
                        styleName="medium-wide"
                        source={ item.backgroundImage }
                    />
                    <View style={ { padding: 5 } } styleName="content">
                        <Subtitle style={ { fontFamily: "sriracha", fontSize: 20 } }
                            numberOfLines={ 1 }>{ item.label }</Subtitle>
                        <View styleName="horizontal">
                            <Text style={ { fontFamily: "sriracha" } }
                                styleName="collapsible">{ item.description }</Text>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        ));

        return (
            <GridRow style={ { backgroundColor: "#BBB" } } columns={ 2 }>
                { cellViews }
            </GridRow>
        );
    };


    return (
        <SafeAreaView style={ { backgroundColor: colors.colorBackgroundHome } }>
            <ListView
                style={ { backgroundColor: constants.colorBackgroundDark, marginBottom: 10 } }
                data={ groupedData }
                renderRow={ renderRow }
            />

        </SafeAreaView>
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
        fontSize: 20,
        color: constants.HeaderColor
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
