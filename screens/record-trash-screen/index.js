// @flow
import React, { useState } from "react";
import * as R from "ramda";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import EnableLocationServices from "../../components/enable-location-services";
import {
    SafeAreaView,
    TouchableHighlight,
    Modal,
    StyleSheet,
    Text,
    View,
    Platform
} from "react-native";
import TrashDrop from "../../models/trash-drop";
import * as actionCreators from "../../action-creators/map-action-creators";
import { defaultStyles } from "../../styles/default-styles";
import { Ionicons } from "@expo/vector-icons";
import { dateIsInCurrentEventWindow } from "../../libs/green-up-day-calucators";

import TrashDropForm from "../../components/trash-drop-form";
import WatchGeoLocation from "../../components/watch-geo-location";

const styles = StyleSheet.create(defaultStyles);

type PropsType = {
    actions: Object,
    drops: Array<Object>,
    cleanAreas: Array<Object>,
    cleanAreasToggle: boolean,
    collectedTrashToggle: boolean,
    currentUser: Object,
    supplyDistributionSites: Object,
    supplyPickupToggle: boolean,
    townData: Object,
    trashCollectionSites: Object,
    trashDropOffToggle: boolean,
    myTrashToggle: boolean,
    uncollectedTrashToggle: boolean,
    userLocation: Object
};

const RecordTrashScreen = (
    {
        actions,
        currentUser,
        drops,
        townData,
        trashCollectionSites,
        userLocation
    }: PropsType): React$Element<any> => {

    const [drop, setDrop] = useState({
        id: null,
        location: {},
        tags: [],
        bagCount: 1,
        wasCollected: false,
        createdBy: { uid: currentUser.uid, email: currentUser.email }
    });


    const closeModal = () => {
        const newDrop = TrashDrop.create({
            id: null,
            location: {},
            tags: [],
            bagCount: 1,
            wasCollected: false,
            createdBy: { uid: currentUser.uid, email: currentUser.email }
        });
        setDrop(newDrop);
    };


    const saveTrashDrop = (myDrop: Object) => {
        if (myDrop.id) {
            actions.updateTrashDrop(myDrop);
        } else {
            actions.dropTrash(TrashDrop.create(myDrop));
        }
        closeModal();
    };

    // $FlowFixMe
    const collectionSites = R.compose(
        R.filter((site: Object): boolean => Boolean(site.coordinates && site.coordinates.latitude && site.coordinates.longitude)),
        Object.values
    )(trashCollectionSites);

    const initialMapLocation = userLocation
        ? {
            latitude: Number(userLocation.coordinates.latitude),
            longitude: Number(userLocation.coordinates.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
        : null;


    const content = R.cond([
        [
            () => Boolean(userLocation.error),
            () => (<EnableLocationServices errorMessage={ userLocation.error }/>)
        ],
        [() => !Boolean(initialMapLocation), () => (
            <View style={ [styles.frame, { display: "flex", justifyContent: "center" }] }>
                <Text style={ { fontSize: 20, color: "white", textAlign: "center" } }>
                    { "...Locating You" }
                </Text>
            </View>)],
        [R.T, () => (
            <TrashDropForm
                currentUser={ currentUser }
                location={ userLocation }
                onSave={ saveTrashDrop }
                onCancel={ closeModal }
                townData={ townData }
                trashCollectionSites={ trashCollectionSites }
                trashDrop={ drop }
            />)
        ]
    ])();


    return (
        <SafeAreaView style={ styles.container }>
            <WatchGeoLocation/>
            { content }
        </SafeAreaView>
    );
};

RecordTrashScreen.navigationOptions = {
    title: "Trash Map"
};

const mapStateToProps = (state: Object): Object => {

    const trashCollectionSites = state.trashCollectionSites.sites;
    const drops = (state.trashTracker.trashDrops || [])
        .filter((drop: TrashDrop): boolean => Boolean(drop.location && drop.location.longitude && drop.location.latitude));
    const townData = state.towns.townData;
    return {
        currentUser: state.login.user,
        drops: drops,
        townData,
        trashCollectionSites,
        userLocation: state.userLocation
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({ actions: bindActionCreators(actionCreators, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(RecordTrashScreen);