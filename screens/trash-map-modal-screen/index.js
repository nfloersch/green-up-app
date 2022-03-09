// @flow
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import TrashToggles from "../../components/trash-toggles";
import * as actionCreators from "../../action-creators/map-action-creators";
import * as constants from "../../styles/constants";

type PropsType = {
    actions: Object,
    cleanAreasToggle: boolean,
    collectedTrashToggle: boolean,
    currentUser: Object,
    supplyPickupToggle: boolean,
    trashDropOffToggle: boolean,
    myTrashToggle: boolean,
    uncollectedTrashToggle: boolean,
    navigation: Object
};

const TrashMapModal = ({}: PropsType): React$Element<any> => (
    <SafeAreaView style={ { flex: 1, backgroundColor: constants.colorBackgroundDark } }>
        <TrashToggles/>
    </SafeAreaView>
);

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