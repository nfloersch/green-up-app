// @flow
import React, { Fragment } from "react";
import * as R from "ramda";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//import { Lightbox, Button } from "@shoutem/ui";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Platform
} from "react-native";
import TrashToggles from "../../components/trash-toggles";
import * as actionCreators from "../../action-creators/map-action-creators";
import { defaultStyles } from "../../styles/default-styles";
//import MultiLineMapCallout from "../../components/multi-line-map-callout";
import { Ionicons } from "@expo/vector-icons";
import * as constants from "../../styles/constants";
//import { offsetLocations } from "../../libs/geo-helpers";
//import WatchGeoLocation from "../../components/watch-geo-location";
//import Address from "../../models/address";

const styles = StyleSheet.create(defaultStyles);

type PropsType = {
    actions: Object,
    cleanAreasToggle: boolean,
    collectedTrashToggle: boolean,
    currentUser: Object,
    supplyPickupToggle: boolean,
    trashDropOffToggle: boolean,
    myTrashToggle: boolean,
    uncollectedTrashToggle: boolean,
    navigation: Object,
};

const TrashMapModal = (
    {
        cleanAreasToggle,
        collectedTrashToggle,
        currentUser,
        myTrashToggle,
        supplyPickupToggle,
        trashDropOffToggle,
        uncollectedTrashToggle,
        navigation
    }: PropsType): React$Element<any> => {

    return (
        <SafeAreaView style={ {flex: 1, backgroundColor: constants.colorBackgroundDark} }>
            <TrashToggles/>
        </SafeAreaView>
    );
};

TrashMapModal.navigationOptions = {
    title: "Toggles",
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

const mapStateToProps = (state: Object): Object => {
    const mapLocations = (team: TeamType): Array<Object> => (team.locations || [])
        .map((l: Object): Object => (
            {
                key: "",
                coordinates: l.coordinates,
                title: `${ team.name || "" }`,
                description: "claimed this area"
            }
        ));
    // $FlowFixMe
    const getTeamLocations = R.compose(
        R.flatten,
        R.map((team: Object): Array<Object> => mapLocations(team)),
        Object.values
    );
    const collectedTrashToggle = state.trashTracker.collectedTrashToggle;
    const supplyPickupToggle = state.trashTracker.supplyPickupToggle;
    const uncollectedTrashToggle = state.trashTracker.uncollectedTrashToggle;
    const trashDropOffToggle = state.trashTracker.trashDropOffToggle;
    const myTrashToggle = state.trashTracker.myTrashToggle;
    const cleanAreasToggle = state.trashTracker.cleanAreasToggle;
    return {
        cleanAreasToggle,
        collectedTrashToggle,
        currentUser: state.login.user,
        supplyPickupToggle,
        trashDropOffToggle,
        uncollectedTrashToggle,
        myTrashToggle
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({ actions: bindActionCreators(actionCreators, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(TrashMapModal);