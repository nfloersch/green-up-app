// @flow
import React, { useState, useEffect } from "react";
import * as IntentLauncherAndroid from "expo-intent-launcher";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as R from "ramda";
import CheckBox from "react-native-checkbox";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    KeyboardAvoidingView,
    Linking,
    TouchableHighlight,
    TouchableOpacity,
    Modal,
    ScrollView,
    StyleSheet,
    TextInput,
    Text,
    View,
    Platform
} from "react-native";
import TrashToggles from "./trash-toggles";
import * as turf from "@turf/helpers";
import booleanWithin from "@turf/boolean-within";
import TrashDrop from "../../models/trash-drop";
import * as actionCreators from "./actions";
import { defaultStyles } from "../../styles/default-styles";
import MultiLineMapCallout from "../../components/multi-line-map-callout";
import { Ionicons } from "@expo/vector-icons";
import TownInformation from "../../components/town-information";
import offsetLocations from "../../libs/offset-locations";

const styles = StyleSheet.create(defaultStyles);

type PropsType = {
    actions: Object,
    drops: Array<Object>,
    currentUser: Object,
    townData: Object,
    location: Object,
    supplyPickupToggle: boolean,
    uncollectedTrashToggle: boolean,
    trashDropOffToggle: boolean,
    myTrashToggle: boolean,
    collectedTrashToggle: boolean,
    cleanAreas: Array<Object>,
    cleanAreasToggle: boolean
};

const TrashMap = (
    {
        actions,
        drops,
        currentUser,
        townData,
        location,
        supplyPickupToggle,
        uncollectedTrashToggle,
        trashDropOffToggle,
        myTrashToggle,
        collectedTrashToggle,
        cleanAreas,
        cleanAreasToggle
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
    const [errorMessage, setErrorMessage] = useState(null);

    const getTown = (myLocation: { coords: { longitude: number, latitude: number } }): string => {
        const townPolygonsData = require("../../libs/VT_Boundaries__town_polygons.json");
        const currentLocation = turf.point([myLocation.coords.longitude, location.coords.latitude]);
        const town = townPolygonsData.features
            .find((f: Object): boolean => {
                const feature = turf.feature(f.geometry);
                return booleanWithin(currentLocation, feature);
            });
        return town ? town.properties.TOWNNAMEMC : "";
    };

    const getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === "granted") {
            const locationProviderStatus = await Location.getProviderStatusAsync();
            if (locationProviderStatus.locationServicesEnabled === false) {
                setErrorMessage("Access to the device location is required. Please make sure you have location services on and you grant access when requested.");
            } else {
                const myLocation = await Location.getCurrentPositionAsync({});
                actions.locationUpdated(myLocation);

                Location.watchPositionAsync({ timeInterval: 3000, distanceInterval: 20 }, (l: Object) => {
                    setErrorMessage(null);
                    actions.locationUpdated(l);
                });
            }
        } else {
            setErrorMessage("Access to the device location is required. Please make sure you have location services on and you grant access when requested.");
        }
    };

    const toggleTag = (editable: boolean, tag: string): (any=>any) => () => {
        if (editable) {
            const hasTag = (drop.tags || []).indexOf(tag) > -1;
            const tags = hasTag
                ? (drop.tags || []).filter((_tag: string): boolean => _tag !== tag)
                : (drop.tags || []).concat(tag);
            setDrop({ ...drop, tags });
        }
    };

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
            actions.dropTrash(TrashDrop.create({ ...myDrop, location: location.coords }));
        }
        closeModal();
    };

    const collectTrashDrop = () => {
        const collectedDrop = {
            ...drop,
            wasCollected: true,
            collectedBy: {
                uid: currentUser.uid,
                email: currentUser.email
            }
        };
        setDrop(collectedDrop);
        saveTrashDrop(collectedDrop);
    };

    const goToTrashDrop = () => {
        setModalVisible(true);
    };

    // by convention, we're importing town names as upper case, any characters different
    // than uppercase letters replaced with underscore
    const town = location ? getTown(location) : "";

    const encodedTownName = town.toUpperCase().replace(/[^A-Z]/g, "_");

    const townInfo = townData[encodedTownName] || {};

    // $FlowFixMe
    const trashDropOffLocations = R.compose(
        R.filter((loc: Object): boolean => Boolean(loc.coordinates && loc.coordinates.latitude && loc.coordinates.longitude)),
        R.flatten,
        R.map((t: Object): Array<Object> => t.dropOffLocations),
        Object.values
    )(townData);

    // $FlowFixMe
    const supplyPickupLocations = R.compose(
        R.filter((loc: Object): boolean => Boolean(loc.coordinates && loc.coordinates.latitude && loc.coordinates.longitude)),
        R.flatten,
        R.map((t: Object): Array<Object> => t.pickupLocations),
        Object.values
    )(townData);

    const initialMapLocation = location
        ? {
            latitude: Number(location.coords.latitude),
            longitude: Number(location.coords.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
        : null;

    const showFirstButton = Boolean(!drop.wasCollected && drop.createdBy && (drop.createdBy.uid === currentUser.uid));

    const collectedTrash = (collectedTrashToggle ? drops : [])
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

    const myTrash = (drops || [])
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

    const unCollectedTrash = (uncollectedTrashToggle ? drops : [])
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

    const dropOffLocations = offsetLocations((supplyPickupToggle ? supplyPickupLocations : []), trashDropOffToggle ? trashDropOffLocations : [])
        .map((d: Object, i: number): React$Element<any> => (
            <MapView.Marker
                key={ `${ town }DropOffLocation${ i }.map((d, i) => (` }
                // image={trashDropOffLocationIcon}
                pinColor={ "blue" }
                coordinate={ d.coordinates }
                stopPropagation={ true }>
                <MultiLineMapCallout
                    title="Drop Off Location"
                    description={ `${ d.name }, ${ d.address }` }
                />
            </MapView.Marker>
        ));

    const pickupLocations = (supplyPickupToggle ? supplyPickupLocations : [])
        .map((d: Object, i: number): React$Element<any> => (
            <MapView.Marker
                key={ `supplyPickup${ i }` }
                // image={supplyPickupLocationIcon}
                pinColor={ "green" }
                coordinate={ d.coordinates }
                stopPropagation={ true }>
                <MultiLineMapCallout
                    title="Supply Pickup Location"
                    description={ `${ d.name }, ${ d.address }` }
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

    const allMarkers = pickupLocations
        .concat(dropOffLocations)
        .concat(unCollectedTrash)
        .concat(myTrash)
        .concat(collectedTrash)
        .concat(cleanAreaMarkers);

    const enableLocation = async () => {
        if (Platform.OS === "android") {
            await IntentLauncherAndroid.startActivityAsync(IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS);
        }

        if (Platform.OS === "ios") {
            await Linking.openURL("app-settings:");
        }

        getLocationAsync();
    };


    useEffect(() => {
        if (!location) {
            getLocationAsync();
        }
    }, []);

    return Boolean(errorMessage)
        ? (<View style={ styles.frame }>
            <Text>{ errorMessage }</Text>
            <TouchableHighlight style={ styles.link } onPress={ enableLocation }>
                <Text style={ [styles.linkText, { color: "#333333" }] }>{ "Enable Location Services" }</Text>
            </TouchableHighlight>
        </View>)
        : initialMapLocation &&
        (<View style={ styles.frame }>
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


                { townInfo.roadsideDropOffAllowed
                    ? (
                        <TouchableHighlight
                            style={ [styles.headerButton, {
                                backgroundColor: "#EEE",
                                paddingTop: 13,
                                height: 50,
                                flex: 1
                            }] }
                            onPress={ goToTrashDrop }>
                            <Text style={ styles.headerButtonText }>
                                { "Drop A Trash Bag Here" }
                            </Text>
                        </TouchableHighlight>
                    )
                    : (<View style={ [styles.headerButton, {
                        backgroundColor: "#EEE",
                        paddingTop: 13,
                        height: 50,
                        flex: 1
                    }] }/>)
                }
                <TouchableHighlight
                    style={ { height: 50, width: 50, padding: 5, backgroundColor: "rgba(255,255,255,0.8)" } }
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

            <TownInformation townInfo={ townInfo } town={ town }/>
            <Modal
                animationType={ "slide" }
                transparent={ false }
                visible={ modalVisible }
                onRequestClose={ closeModal }>
                <View style={ [styles.frame, { paddingTop: 30 }] }>
                    <View style={ [styles.buttonBarHeader, { backgroundColor: "#EEE", marginTop: 10 }] }>
                        <View style={ styles.buttonBar }>
                            {
                                showFirstButton
                                    ? (
                                        <View style={ styles.buttonBarButton }>
                                            <TouchableOpacity
                                                style={ styles.headerButton }
                                                onPress={ saveTrashDrop }
                                            >
                                                <Text style={ styles.headerButtonText }>
                                                    { drop.id ? "Update This Spot" : "Mark This Spot" }
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                    : null
                            }


                            <View style={ styles.buttonBarButton }>
                                <TouchableOpacity style={ styles.headerButton } onPress={ closeModal }>
                                    <Text style={ styles.headerButtonText }>{ "Cancel" }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <KeyboardAvoidingView
                        style={ defaultStyles.frame }
                        behavior={ Platform.OS === "ios" ? "padding" : null }
                    >
                        <ScrollView style={ styles.scroll }>
                            <View style={ styles.infoBlockContainer }>
                                <Text style={ styles.labelDark }>Number of Bags</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    editable={ showFirstButton }
                                    value={ (drop.bagCount || "").toString() }
                                    keyboardType="numeric"
                                    placeholder="1"
                                    style={ styles.textInput }
                                    onChangeText={ (text: string) => {
                                        setDrop({
                                            ...drop,
                                            bagCount: Number(text)
                                        });
                                    } }
                                />
                                <Text style={ styles.labelDark }>Other Items</Text>
                                <View style={ styles.fieldset }>
                                    <CheckBox
                                        editable={ showFirstButton }
                                        label="Needles/Bio-Waste"
                                        checked={ (drop.tags || []).indexOf("bio-waste") > -1 }
                                        onChange={ toggleTag(showFirstButton, "bio-waste") }/>
                                    <CheckBox
                                        editable={ showFirstButton }
                                        label="Tires"
                                        checked={ (drop.tags || []).indexOf("tires") > -1 }
                                        onChange={ toggleTag(showFirstButton, "tires") }/>
                                    <CheckBox
                                        editable={ showFirstButton }
                                        label="Large Object"
                                        checked={ (drop.tags || []).indexOf("large") > -1 }
                                        onChange={ toggleTag(showFirstButton, "large") }/>
                                </View>

                            </View>
                            {
                                drop.id && !drop.wasCollected && (
                                    <View style={ { width: "100%", height: 60 } }>
                                        <TouchableHighlight
                                            style={ [styles.button, { width: "100%" }] }
                                            onPress={ collectTrashDrop }
                                        >
                                            <Text style={ styles.buttonText }>{ "Collect Trash" }</Text>
                                        </TouchableHighlight>
                                    </View>
                                )
                            }
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </Modal>
            <Modal
                animationType={ "slide" }
                transparent={ false }
                visible={ toggleModalVisible }
                onRequestClose={ closeToggleModal }>
                <TrashToggles close={ closeToggleModal }/>
            </Modal>
        </View>) ||
        (<View style={ [styles.frame, { display: "flex", justifyContent: "center" }] }>
            <Text style={ { fontSize: 10, color: "white" } }>{ "...Locating" }</Text>
        </View>);
};


TrashMap.navigationOptions = {
    title: "Trash Tracker"
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
        drops: drops,
        currentUser: state.login.user,
        townData,
        location: state.trashTracker.location,
        collectedTrashToggle,
        supplyPickupToggle,
        uncollectedTrashToggle,
        trashDropOffToggle,
        myTrashToggle,
        cleanAreas,
        cleanAreasToggle
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({ actions: bindActionCreators(actionCreators, dispatch) });


// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(TrashMap);
