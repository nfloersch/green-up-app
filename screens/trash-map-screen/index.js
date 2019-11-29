// @flow
import React, { useState, Fragment } from "react";
import MapView from "react-native-maps";
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
import TrashToggles from "../../components/trash-toggles/trash-toggles";
import TrashDrop from "../../models/trash-drop";
import * as actionCreators from "../../action-creators/map-action-creators";
import { defaultStyles } from "../../styles/default-styles";
import MultiLineMapCallout from "../../components/multi-line-map-callout";
import { Ionicons } from "@expo/vector-icons";

import geoHelpers from "../../libs/geo-helpers";
import TrashDropForm from "../../components/trash-drop-form";
import WatchGeoLocation from "../../components/watch-geo-location";
import Address from "../../models/address";

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

const TrashMap = (
    {
        actions,
        cleanAreas,
        cleanAreasToggle,
        collectedTrashToggle,
        currentUser,
        drops,
        myTrashToggle,
        supplyDistributionSites,
        supplyPickupToggle,
        townData,
        trashCollectionSites,
        trashDropOffToggle,
        uncollectedTrashToggle,
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

    const [modalVisible, setModalVisible] = useState(false);

    const [toggleModalVisible, setToggleModalVisible] = useState(false);

    const closeModal = () => {
        const newDrop = TrashDrop.create({
            id: null,
            location: {},
            tags: [],
            bagCount: 1,
            wasCollected: false,
            createdBy: { uid: currentUser.uid, email: currentUser.email }
        });
        setModalVisible(false);
        setDrop(newDrop);
    };

    const closeToggleModal = () => {
        setToggleModalVisible(false);
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

    // $FlowFixMe
    const distributionSites = R.compose(
        R.filter((site: Object): boolean => Boolean(site.coordinates && site.coordinates.latitude && site.coordinates.longitude)),
        Object.values
    )(supplyDistributionSites);

    const initialMapLocation = userLocation
        ? {
            latitude: Number(userLocation.coordinates.latitude),
            longitude: Number(userLocation.coordinates.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
        : null;
    const collectedTrashMarkers = (collectedTrashToggle ? drops : [])
        .filter((d: TrashDrop): boolean => d.wasCollected === true)
        .map((d: TrashDrop): React$Element<any> => (
            <MapView.Marker
                key={ d.id }
                // image={collectedTrashIcon}
                pinColor={ "turquoise" }
                coordinate={ d.location }
                title={ `${ d.bagCount || "0" } bag(s)${ (d.tags || []).length > 0 ? " & other trash" : "" }` }
                description={ "Tap to view collected trash" }
                onCalloutPress={ () => {
                    setModalVisible(true);
                    setDrop(d);
                } }
                stopPropagation={ true }/>
        ));

    const myTrashMarkers = (drops || [])
        .filter((d: TrashDrop): boolean => Boolean(myTrashToggle && !d.wasCollected && d.createdBy && d.createdBy.uid === currentUser.uid))
        .map((d: TrashDrop): React$Element<any> => (
            <MapView.Marker
                key={ d.id }
                // image={myUncollectedTrashIcon}
                pinColor={ "yellow" }
                coordinate={ d.location }
                title={ `${ d.bagCount || "0" } bag(s)${ (d.tags || []).length > 0 ? " & other trash" : "" }` }
                description={ "Tap to view, edit or collect" }
                onCalloutPress={ () => {
                    setModalVisible(true);
                    setDrop(d);
                } }
                stopPropagation={ true }
            />
        ));

    const uncollectedTrashMakers = (uncollectedTrashToggle ? drops : [])
        .filter((d: TrashDrop): boolean => Boolean(!d.wasCollected && d.createdBy && d.createdBy.uid !== currentUser.uid))
        .map((d: TrashDrop): React$Element<any> => (
            <MapView.Marker
                key={ d.id }
                // image={uncollectedTrashIcon}
                pinColor={ "red" }
                coordinate={ d.location }
                title={ `${ d.bagCount || "0" } bag(s)${ (d.tags || []).length > 0 ? " & other trash" : "" }` }
                description={ "Tap to view or collect" }
                onCalloutPress={ () => {
                    setModalVisible(true);
                    setDrop(d);
                } }
                stopPropagation={ true }
            />
        ));

    const collectionSiteMarkers = geoHelpers((supplyPickupToggle ? distributionSites : []), trashDropOffToggle ? collectionSites : [])
        .map((d: Object, i: number): React$Element<any> => (
            <MapView.Marker
                key={ `dropOffLocation${ i }.map((d, i) => (` }
                // image={trashDropOffLocationIcon}
                pinColor={ "blue" }
                coordinate={ d.coordinates }
                stopPropagation={ true }>
                <MultiLineMapCallout
                    title="Drop Off Location"
                    description={ `${ d.name }, ${ Address.toString(d.address) }` }
                />
            </MapView.Marker>
        ));

    const distributionSiteMarkers = (supplyPickupToggle ? distributionSites : [])
        .map((d: Object, i: number): React$Element<any> => (
            <MapView.Marker
                key={ `supplyPickup${ i }` }
                // image={supplyPickupLocationIcon}
                pinColor={ "green" }
                coordinate={ d.coordinates }
                stopPropagation={ true }>
                <MultiLineMapCallout
                    title="Supply Pickup Location"
                    description={ `${ d.name }, ${ Address.toString(d.address) }` }
                />
            </MapView.Marker>
        ));

    const cleanAreaMarkers = (cleanAreasToggle ? cleanAreas : [])
        .map((d: Object, i: number): React$Element<any> => (
            <MapView.Marker
                key={ `cleanArea${ i }` }
                pinColor={ "orange" }
                coordinate={ d.coordinates }
                stopPropagation={ true }>
                <MultiLineMapCallout
                    title={ `${ d.title }` }
                    description={ `${ d.description }` }
                />
            </MapView.Marker>
        ));

    const allMarkers = distributionSiteMarkers
        .concat(collectionSiteMarkers)
        .concat(uncollectedTrashMakers)
        .concat(myTrashMarkers)
        .concat(collectedTrashMarkers)
        .concat(cleanAreaMarkers);

    return (
        <SafeAreaView style={ styles.container }>
            <WatchGeoLocation/>
            {
                R.cond([
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
                        <Fragment>
                            <View style={ {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                height: 50,
                                width: "100%",
                                flex: 1,
                                flexDirection: "row",
                                padding: 0,
                                justifyContent: "flex-end"
                            } }>
                                <TouchableHighlight
                                    style={ [styles.headerButton, {
                                        backgroundColor: "#EEE",
                                        paddingTop: 13,
                                        height: 50,
                                        flex: 1
                                    }] }
                                    onPress={ () => {
                                        setModalVisible(true);
                                    } }>
                                    <Text style={ styles.headerButtonText }>
                                        { "Record Your Trash" }
                                    </Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={ {
                                        height: 50,
                                        width: 50,
                                        padding: 5,
                                        backgroundColor: "rgba(255,255,255,0.8)"
                                    } }
                                    onPress={ () => {
                                        setToggleModalVisible(true);
                                    } }
                                >

                                    <Ionicons
                                        name={ Platform.OS === "ios" ? "ios-options" : "md-options" }
                                        size={ 42 }
                                        color="#333"
                                    />
                                </TouchableHighlight>
                            </View>
                            <MapView
                                initialRegion={ initialMapLocation }
                                showsUserLocation={ true }
                                showsMyLocationButton={ true }
                                showsCompass={ true }
                                style={ {
                                    position: "absolute",
                                    top: 50,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    height: "100%",
                                    width: "100%",
                                    margin: 0,
                                    padding: 0
                                } }
                            >
                                { allMarkers }
                            </MapView>
                        </Fragment>)
                    ]
                ])()
            }
            <Modal
                animationType={ "slide" }
                transparent={ false }
                visible={ modalVisible }
                onRequestClose={ closeModal }>
                <TrashDropForm
                    currentUser={ currentUser }
                    location={ userLocation }
                    onSave={ saveTrashDrop }
                    onCancel={ closeModal }
                    townData={ townData }
                    trashCollectionSites={ trashCollectionSites }
                    trashDrop={ drop }
                />
            </Modal>
            <Modal
                animationType={ "slide" }
                transparent={ false }
                visible={ toggleModalVisible }
                onRequestClose={ closeToggleModal }>
                <TrashToggles close={ closeToggleModal }/>
            </Modal>
        </SafeAreaView>
    );
};

TrashMap.navigationOptions = {
    title: "Trash Map"
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

    const trashCollectionSites = state.trashCollectionSites.sites;
    const supplyDistributionSites = state.supplyDistributionSites.sites;
    const cleanAreas = getTeamLocations(state.teams.teams || {});
    const drops = (state.trashTracker.trashDrops || [])
        .filter((drop: TrashDrop): boolean => Boolean(drop.location && drop.location.longitude && drop.location.latitude));
    const townData = state.towns.townData;
    const collectedTrashToggle = state.trashTracker.collectedTrashToggle;
    const supplyPickupToggle = state.trashTracker.supplyPickupToggle;
    const uncollectedTrashToggle = state.trashTracker.uncollectedTrashToggle;
    const trashDropOffToggle = state.trashTracker.trashDropOffToggle;
    const myTrashToggle = state.trashTracker.myTrashToggle;
    const cleanAreasToggle = state.trashTracker.cleanAreasToggle;
    return {
        cleanAreas,
        cleanAreasToggle,
        collectedTrashToggle,
        currentUser: state.login.user,
        drops: drops,
        supplyDistributionSites,
        supplyPickupToggle,
        townData,
        trashCollectionSites,
        trashDropOffToggle,
        uncollectedTrashToggle,
        myTrashToggle,
        userLocation: state.userLocation
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({ actions: bindActionCreators(actionCreators, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(TrashMap);