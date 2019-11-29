// @flow
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../action-creators/map-action-creators";
import { defaultStyles } from "../../styles/default-styles";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Toggle from "../toggle";
import circleTurquoise from "../../assets/images/circle-turquoise.png";
import circleBlue from "../../assets/images/circle-blue.png";
import circleRed from "../../assets/images/circle-red.png";
import circleYellow from "../../assets/images/circle-yellow.png";
import circleGreen from "../../assets/images/circle-green.png";
import circleOrange from "../../assets/images/circle-orange.png";

const myStyles = { toggle: { height: 50 } };
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

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


const TrashToggles = (
    {
        actions,
        close,
        supplyPickupToggle,
        uncollectedTrashToggle,
        trashDropOffToggle,
        myTrashToggle,
        collectedTrashToggle,
        cleanAreasToggle
    }: PropsType): React$Element<any> => (
    <View style={ [styles.frame, { paddingTop: 30 }] }>
        <View style={ [styles.singleButtonHeader, { backgroundColor: "#EEE", marginTop: 10 }] }>
            <View style={ styles.buttonBar }>
                <View style={ styles.buttonBarButton }>
                    <TouchableOpacity style={ styles.headerButton } onPress={ close }>
                        <Text style={ styles.headerButtonText }>{ "Close" }</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

        <View style={ [styles.infoBlockContainer, { height: 300 }] }>
            <Toggle
                style={ styles.toggle }
                icon={ circleYellow }
                label="My Trash"
                value={ myTrashToggle }
                onValueChange={ () => {
                    actions.toggleTrashData("myTrashToggle", !myTrashToggle);
                } }/>
            <Toggle
                style={ styles.toggle }
                icon={ circleRed }
                label="Uncollected Trash"
                value={ uncollectedTrashToggle }
                onValueChange={ () => {
                    actions.toggleTrashData("uncollectedTrashToggle", !uncollectedTrashToggle);
                } }/>
            <Toggle
                style={ styles.toggle }
                icon={ circleBlue }
                label="Trash Drop-Offs"
                value={ trashDropOffToggle }
                onValueChange={ () => {
                    actions.toggleTrashData("trashDropOffToggle", !trashDropOffToggle);
                } }/>
            <Toggle
                style={ styles.toggle }
                icon={ circleGreen }
                label="Supply Pickups"
                value={ supplyPickupToggle }
                onValueChange={ () => {
                    actions.toggleTrashData("supplyPickupToggle", !supplyPickupToggle);
                } }/>
            <Toggle
                style={ styles.toggle }
                icon={ circleTurquoise }
                label="Collected Trash"
                value={ collectedTrashToggle }
                onValueChange={ () => {
                    actions.toggleTrashData("collectedTrashToggle", !collectedTrashToggle);
                } }/>
            <Toggle
                style={ styles.toggle }
                icon={ circleOrange }
                label="Team Cleaning Areas"
                value={ cleanAreasToggle }
                onValueChange={ () => {
                    actions.toggleTrashData("cleanAreasToggle", !cleanAreasToggle);
                } }/>
        </View>
    </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(TrashToggles);
