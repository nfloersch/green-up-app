// @flow
import React, { Fragment } from "react";
import MapView from "react-native-maps";
import * as R from "ramda";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import EnableLocationServices from "../../components/enable-location-services";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity
} from "react-native";
import TrashDrop from "../../models/trash-drop";
import * as actionCreators from "../../action-creators/map-action-creators";
import { defaultStyles } from "../../styles/default-styles";
import MultiLineMapCallout from "../../components/multi-line-map-callout";
import { Ionicons } from "@expo/vector-icons";
import * as constants from "../../styles/constants";
import { offsetLocations } from "../../libs/geo-helpers";
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
    userLocation: Object,
    navigation: Object
};

const TrashMap = (
    {
        cleanAreas,
        cleanAreasToggle,
        collectedTrashToggle,
        currentUser,
        drops,
        myTrashToggle,
        supplyDistributionSites,
        supplyPickupToggle,
        trashCollectionSites,
        trashDropOffToggle,
        uncollectedTrashToggle,
        userLocation,
        navigation
    }: PropsType): React$Element<any> => {


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

    const locationExists = userLocation && userLocation.coordinates && userLocation.coordinates.latitude && userLocation.coordinates.longitude;

    const initialMapLocation = locationExists
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
                stopPropagation={ true }
            />
        ));

    const collectionSiteMarkers = offsetLocations((supplyPickupToggle ? distributionSites : []), trashDropOffToggle ? collectionSites : [])
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
        <SafeAreaView style={ { flex: 1, backgroundColor: constants.colorBackgroundDark } }>
            <WatchGeoLocation/>
            {
                R.cond([
                    [
                        () => Boolean(userLocation.error),
                        () => (<EnableLocationServices errorMessage={ userLocation.error }/>)
                    ],
                    [
                        () => !Boolean(initialMapLocation),
                        () => (
                            <View style={ [styles.frame, { display: "flex", justifyContent: "center" }] }>
                                <Text style={ { fontSize: 20, color: "white", textAlign: "center" } }>
                                    { "...Locating You" }
                                </Text>
                            </View>
                        )
                    ],
                    [
                        R.T,
                        () => (
                            <Fragment>
                                <MapView
                                    initialRegion={ initialMapLocation }
                                    showsUserLocation={ true }
                                    showsMyLocationButton={ true }
                                    showsCompass={ true }
                                    style={
                                        {
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            height: "100%",
                                            width: "100%",
                                            margin: 0,
                                            padding: 0
                                        }
                                    }
                                >
                                    { allMarkers }
                                </MapView>
                                <TouchableOpacity
                                    style={
                                        {
                                            position: "absolute",
                                            top: 10,
                                            right: 10,
                                            borderStyle: "solid",
                                            borderColor: "#000",
                                            borderRadius: 40,
                                            borderWidth: 1,
                                            backgroundColor: "#FFF",
                                            padding: 10,
                                            height: 50,
                                            width: 50,
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
                                            elevation: 5
                                        }
                                    }
                                    onPress={ () => navigation.navigate("TrashTrackerModal") }>
                                    <Ionicons
                                        name={ Platform.OS === "ios" ? "ios-options" : "md-options" }
                                        size={ 30 }
                                        color="#888"
                                    />
                                </TouchableOpacity>
                            </Fragment>
                        )
                    ]
                ])()
            }
        </SafeAreaView>
    );
};

TrashMap.navigationOptions = {
    title: "Trash Map",
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

    const trashCollectionSites = state.trashCollectionSites.sites;
    const supplyDistributionSites = state.supplyDistributionSites.sites;
    const cleanAreas = getTeamLocations(state.teams.teams || {});
    const drops = Object.values(state.trashTracker.trashDrops || [])
        .filter((drop: any): boolean => Boolean(drop.location && drop.location.longitude && drop.location.latitude));
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