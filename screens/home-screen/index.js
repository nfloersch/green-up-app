// @flow
import React from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../login-screen/actions";
import { defaultStyles } from "../../styles/default-styles";
import { getUsersTeams } from "../../libs/team-helpers";
import User from "../../models/user";
import { removeNulls } from "../../libs/remove-nulls";
import { getCurrentGreenUpDay } from "../../libs/green-up-day-calucators";
import moment from "moment";
import * as R from "ramda";
import HomeButton from "../../components/home-button";
import * as colors from "../../styles/constants";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);
const homeTitle = R.cond(
    [
        [days => days > 1, days => `${ days } days until Green Up Day`],
        [days => days === 1, () => "Tomorrow is Green Up Day!"],
        [days => days === 0, () => "It's Green Up Day!"],
        [days => days < 0, () => "Keep on Greening"]
    ]
)(moment(getCurrentGreenUpDay()).diff(moment(), "days"));

type PropsType = {
    actions: Object,
    navigation: Object,
    currentUser: Object,
    myTeams: Array<Object>
};

const menuConfig = {
    messages: {
        order: 1,
        navigation: "Messages",
        label: "Messages",
        backgroundImage: require("../../assets/images/button-image-ford-1970.png")
    },
    findATeam: {
        order: 2,
        navigation: "FindTeam",
        label: "Find A Team",
        backgroundImage: require("../../assets/images/button-image-girls-2-1970.jpg")
    },
    createATeam: {
        order: 3,
        navigation: "Messages",
        label: "Create A Team",
        backgroundImage: require("../../assets/images/button-image-girls-1970.jpg")
    },
    handlingTrash: {
        order: 4,
        navigation: "Messages",
        label: "Handling Trash",
        backgroundImage: require("../../assets/images/button-image-ford-1970.png")
    },
    freeSupplies: {
        order: 5,
        navigation: "Messages",
        label: "Free Supplies",
        backgroundImage: require("../../assets/images/button-image-loading-pickup-1970.jpg")
    },
    celebrations: {
        order: 6,
        navigation: "Messages",
        label: "Celebrations",
        backgroundImage: require("../../assets/images/button-image-gov-dean-1970.jpg")
    },
    greenUpFacts: {
        order: 7,
        navigation: "Messages",
        label: "Green Up Facts",
        backgroundImage: require("../../assets/images/button-image-ford-1970.png")
    }
};

const HomeScreen = ({ actions, navigation, currentUser, myTeams }: PropsType): React$Element<any> => {
    const myButtons = R.compose(
        R.map(entry => ({
            onPress: () => navigation.navigate(entry[1].navigation),
            label: entry[1].label,
            backgroundImage: entry[1].backgroundImage,
            id: entry[0],
            key: entry[0]
        })),
        R.sort((a, b) => a[1].order - b[1].order),
        Object.entries
    );
    const data = myButtons(menuConfig);
    return (
        <SafeAreaView style={ styles.container }>
            <FlatList
                data={ data }
                keyExtractor={ item => item.id }
                renderItem={ ({ item }) => (<HomeButton { ...item }/>) }
                numColumns={ 2 }
                style={ { paddingTop: 2, paddingLeft: 1, paddingRight: 1, paddingBottom: 2 } }
            >
                <View style={ { height: 20 } }/>
            </FlatList>
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
        fontSize: 26,
        color: colors.buttonColor
    }
};

const mapStateToProps = (state) => {
    const user = User.create({ ...state.login.user, ...removeNulls(state.profile) });
    const teams = state.teams.teams || {};
    const myTeams = getUsersTeams(user, teams);
    return ({
        user, myTeams
    });
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
