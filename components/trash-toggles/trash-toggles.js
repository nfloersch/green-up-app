// @flow
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../action-creators/map-action-creators";
import { View, SafeAreaView } from "react-native";
import Toggle from "../toggle";
import circleTurquoise from "../../assets/images/circle-turquoise.png";
import circleBlue from "../../assets/images/circle-blue.png";
import circleRed from "../../assets/images/circle-red.png";
import circleYellow from "../../assets/images/circle-yellow.png";
import circleGreen from "../../assets/images/circle-green.png";
import circleOrange from "../../assets/images/circle-orange.png";


type PropsType = {
    actions: { toggleTrashData: (string, boolean)=>void },
    close: any => void,
    supplyPickupToggle: boolean,
    uncollectedTrashToggle: boolean,
    trashDropOffToggle: boolean,
    myTrashToggle: boolean,
    collectedTrashToggle: boolean,
    cleanAreasToggle: boolean
};


const Toggles = (
    {
        actions,
        supplyPickupToggle,
        uncollectedTrashToggle,
        trashDropOffToggle,
        myTrashToggle,
        collectedTrashToggle,
        cleanAreasToggle
    }: PropsType): React$Element<any> => (
    <SafeAreaView style={ {
        flex: 1,
        marginRight: 10,
        marginLeft: 10,
        justifyContent: "center",
        backgroundColor: "transparent",
        alignContent: "center",
        alignItems: "center"
    } }>
        <View style={ {
            width: "100%",
            backgroundColor: "#FFF",
            flex: 0.4,
            justifyContent: "space-between",
            padding: 20
        } }>
            <Toggle
                icon={ circleYellow }
                label="My Trash"
                value={ myTrashToggle }
                onValueChange={ () => {
                    actions.toggleTrashData("myTrashToggle", !myTrashToggle);
                } }/>
            <Toggle
                icon={ circleRed }
                label="Uncollected Trash"
                value={ uncollectedTrashToggle }
                onValueChange={ () => {
                    actions.toggleTrashData("uncollectedTrashToggle", !uncollectedTrashToggle);
                } }/>
            <Toggle

                icon={ circleBlue }
                label="Trash Drop-Offs"
                value={ trashDropOffToggle }
                onValueChange={ () => {
                    actions.toggleTrashData("trashDropOffToggle", !trashDropOffToggle);
                } }/>
            <Toggle

                icon={ circleGreen }
                label="Supply Pickups"
                value={ supplyPickupToggle }
                onValueChange={ () => {
                    actions.toggleTrashData("supplyPickupToggle", !supplyPickupToggle);
                } }/>
            <Toggle

                icon={ circleTurquoise }
                label="Collected Trash"
                value={ collectedTrashToggle }
                onValueChange={ () => {
                    actions.toggleTrashData("collectedTrashToggle", !collectedTrashToggle);
                } }/>
            <Toggle

                icon={ circleOrange }
                label="Team Cleaning Areas"
                value={ cleanAreasToggle }
                onValueChange={ () => {
                    actions.toggleTrashData("cleanAreasToggle", !cleanAreasToggle);
                } }/>
        </View>
    </SafeAreaView>
);


const mapStateToProps = (state: Object): Object => {
    const { myTrashToggle, cleanAreasToggle, trashDropOffToggle, uncollectedTrashToggle, collectedTrashToggle, supplyPickupToggle } = state.trashTracker;
    return {
        collectedTrashToggle,
        supplyPickupToggle,
        uncollectedTrashToggle,
        trashDropOffToggle,
        myTrashToggle,
        cleanAreasToggle
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({ actions: bindActionCreators(actionCreators, dispatch) });

// $FlowFixMe
export const TrashToggles = connect(mapStateToProps, mapDispatchToProps)(Toggles);
