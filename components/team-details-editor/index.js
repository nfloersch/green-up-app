// @flow
import React from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as actionCreators from "../../action-creators/team-action-creators";
import { defaultStyles } from "../../styles/default-styles";
import TeamMember from "../../models/team-member";
import * as statuses from "../../constants/team-member-statuses";
import User from "../../models/user";
import { removeNulls } from "../../libs/remove-nulls";
import * as colors from "../../styles/constants";
import * as constants from "../../styles/constants";
import * as R from "ramda";
import TeamDetailsForm from "../team-details-form";
import { Divider } from "@shoutem/ui";

const myStyles = {
    danger: {
        borderWidth: 2,
        borderColor: colors.colorTextError,
        marginTop: 10,
        padding: 10,
        backgroundColor: "white"
    },
    dangerText: {
        color: colors.colorTextError,
        fontSize: 18,
        textAlign: "center"
    },
    selected: {
        opacity: 0.5
    }
};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);


type PropsType = {
    actions: { deleteTeam: string => void, saveTeam: Object => void },
    currentUser: User,
    navigation: Object,
    otherCleanAreas: Array<any>,
    selectedTeam: TeamType
};

const TeamDetailsEditor = ({ actions, currentUser, navigation, otherCleanAreas, selectedTeam }: PropsType): React$Element<any> => {


    const saveTeam = (team) => {
        actions.saveTeam(team);
    };

    const deleteTeam = () => {
        Alert.alert(
            "DANGER!",
            "Are you really, really sure you want to permanently delete this team?",
            [
                {
                    text: "No", onPress: () => {
                    }, style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        navigation.goBack();
                        if (selectedTeam.id) {
                            actions.deleteTeam(selectedTeam.id);
                        }
                        // We should do something here?
                    }
                }
            ],
            { cancelable: true }
        );
    };


    return (
        <TeamDetailsForm
            currentUser={ currentUser }
            onSave={ saveTeam }
            otherCleanAreas={ otherCleanAreas }
            team={ selectedTeam }>
            <Divider styleName={ "line" }/>
            <View style={ { marginTop: 20 } }>
                <TouchableHighlight
                    style={ styles.danger }
                    onPress={ deleteTeam }
                >
                    <Text style={ styles.dangerText }>
                        { "Delete Team" }
                    </Text>
                </TouchableHighlight>
            </View>
        </TeamDetailsForm>
    );
};

TeamDetailsEditor.navigationOptions = {
    title: "Team Details",
    tabBarLabel: "Details",
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

type PinType<T> = ?(Array<T> | T);

const mapStateToProps = (state: Object): Object => {
    const selectedTeam = state.teams.selectedTeam;

    const profile = state.profile;

    const currentUser = User.create({ ...state.login.user, ...removeNulls(state.profile) });

    const owner = TeamMember.create({ ...currentUser, ...profile, memberStatus: statuses.OWNER });

    const mapToPinData = R.cond([
        [
            (locations: any): boolean => !locations,
            (): Array<any> => []
        ],
        [
            Array.isArray,
            (locations: PinType<any>, teamName: any): Array<Object> => (locations || [])
                .filter((l: PinType<any>): boolean => Boolean(l))
                .map((l: Object): mixed => mapToPinData(l, teamName))
        ],

        [
            R.T,
            (location: any, teamName: any): Object => ({
                key: "",
                coordinates: location.coordinates,
                title: `${ teamName || "Another Team" }`,
                description: "has claimed this area"
            })]
    ]);


    // $FlowFixMe
    const otherCleanAreas = R.compose(
        R.flatten,
        R.map((entry: [string, TeamType]): Array<Object> => mapToPinData(entry[1].locations, entry[1].name)),
        R.filter((entry: [string, TeamType]): boolean => (entry[0] !== selectedTeam.id)),
        Object.entries
    )(state.teams.teams);


    return { owner, currentUser, otherCleanAreas, selectedTeam };
};

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({ actions: bindActionCreators(actionCreators, dispatch) });

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailsEditor);
