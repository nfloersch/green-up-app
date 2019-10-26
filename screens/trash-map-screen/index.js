// @flow
import React, { useState, useEffect } from "react";
import * as IntentLauncherAndroid from "expo-intent-launcher";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";
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
        createdBy: { uid: props.currentUser.uid, email: props.currentUser.email }
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [toggleModalVisible, setToggleModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [hackyHeight, setHackyHeight] = useState(300);


    useEffect(() => {
        if (!location) {
            _getLocationAsync();
        }
        // Hack to work around known issue where the my location button doesn't show
        // https://github.com/react-community/react-native-maps/issues/1332
        setTimeout(() => setHackyHeight(301), 500);
        setTimeout(() => setHackyHeight(301), 1000);

    }, []);


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

    const _getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === "granted") {
            const locationProviderStatus = await Location.getProviderStatusAsync();
            if (locationProviderStatus.locationServicesEnabled === false) {
                setErrorMessage("Access to the device location is required. Please make sure you have location services on and you grant access when requested.");
            } else {
                const myLocation = await Location.getCurrentPositionAsync({});
                actions.locationUpdated(myLocation);

                Location.watchPositionAsync({ timeInterval: 3000, distanceInterval: 20 }, (l) => {
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
            const hasTag = drop.tags.indexOf(tag) > -1;
            const tags = hasTag ? drop.tags.filter(_tag => _tag !== tag) : drop.tags.concat(tag);
            setDrop({ ...drop, tags });
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setDrop({
            id: null,
            location: {},
            tags: [],
            bagCount: 1,
            wasCollected: false,
            createdBy: { uid: currentUser.uid, email: currentUser.email }
        });
    };

    const closeToggleModal = () => {
        setToggleModalVisible(false);
    };


    const saveTrashDrop = (drop: TrashDropType) => {
        if (drop.id) {
            actions.updateTrashDrop(drop);
        } else {
            actions.dropTrash(TrashDrop.create(drop, { location: location.coords }));
        }
        closeModal();
    };

    const collectTrashDrop = () => {
        const collectedDrop = Object.assign({}, drop, {
            wasCollected: true,
            collectedBy: {
                uid: currentUser.uid,
                email: currentUser.email
            }
        });

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
    const trashDropOffLocations = Object.values(townData).map(t => t.dropOffLocations)
        .reduce((a, b) => ([...a, ...b]), [])
        .filter(loc => loc.coordinates && loc.coordinates.latitude && loc.coordinates.longitude);
    const supplyPickupLocations = Object.values(townData).map(t => t.pickupLocations)
        .reduce((a, b) => ([...a, ...b]), [])
        .filter(loc => loc.coordinates && loc.coordinates.latitude && loc.coordinates.longitude);
    const initialMapLocation = location ? {
        latitude: Number(location.coords.latitude),
        longitude: Number(location.coords.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    } : null;

    const showFirstButton = !drop.wasCollected && drop.createdBy && drop.createdBy.uid === currentUser.uid;

    const collectedTrash = (collectedTrashToggle ? drops : []).filter(drop => drop.wasCollected === true).map(drop => (
        <MapView.Marker
            key={ drop.id }
            // image={collectedTrashIcon}
            pinColor={ "turquoise" }
            coordinate={ drop.location }
            title={ `${ drop.bagCount } bag(s)${ drop.tags.length > 0 ? " & other trash" : "" }` }
            description={ "Tap to view collected trash" }
            onCalloutPress={ () => {
                setModalVisible(true);
                setDrop(drop);
            } }
            stopPropagation={ true }/>
    ));

    const myTrash = (drops || [])
        .filter((drop: TrashDropType): boolean => Boolean(myTrashToggle && !drop.wasCollected && drop.createdBy && drop.createdBy.uid === currentUser.uid))
        .map((drop: TrashDropType): React$Element<any> => (
            <MapView.Marker
                key={ drop.id }
                // image={myUncollectedTrashIcon}
                pinColor={ "yellow" }
                coordinate={ drop.location }
                title={ `${ drop.bagCount || "0" } bag(s)${ (drop.tags || []).length > 0 ? " & other trash" : "" }` }
                description={ "Tap to view, edit or collect" }
                onCalloutPress={ () => {
                    setModalVisible(true);
                    setDrop(drop);
                } }
                stopPropagation={ true }
            />
        ));

    const unCollectedTrash = (uncollectedTrashToggle ? drops : [])
        .filter(drop => (!drop.wasCollected && drop.createdBy && drop.createdBy.uid !== currentUser.uid))
        .map(drop => (
            <MapView.Marker
                key={ drop.id }
                // image={uncollectedTrashIcon}
                pinColor={ "red" }
                coordinate={ drop.location }
                title={ `${ drop.bagCount } bag(s)${ drop.tags.length > 0 ? " & other trash" : "" }` }
                description={ "Tap to view or collect" }
                onCalloutPress={ () => {
                    setModalVisible(true);
                    setDrop(drop);
                } }
                stopPropagation={ true }
            />
        ));

    const dropOffLocations = offsetLocations((supplyPickupToggle ? supplyPickupLocations : []), trashDropOffToggle ? trashDropOffLocations : [])
        .map((d, i) => (
            <MapView.Marker
                key={ `${ town }DropOffLocation${ i }` }
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
        .map((d, i) => (
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
        .map((d, i) => (
            <MapView.Marker
                key={ `cleanArea${ i }` }
                pinColor={ "orange" }
                coordinate={ d.coordinates }
                stopPropagation={ true }>
                <MultiLineMapCallout
                    title={ `${ d.title }` }
                    description={ `${ d.description }` }/>
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

        _getLocationAsync();
    };

    return errorMessage
        ? (<View>
            <Text>{ errorMessage }</Text>
            <TouchableHighlight style={ styles.link } onPress={ enableLocation }>
                <Text style={ [styles.linkText, { color: "#333333" }] }>{ "Enable Location Services" }</Text>
            </TouchableHighlight>
        </View>)
        : initialMapLocation &&
        (
            <View style={ styles.frame }>
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
                                            checked={ drop.tags.indexOf("bio-waste") > -1 }
                                            onChange={ toggleTag(showFirstButton, "bio-waste") }/>
                                        <CheckBox
                                            editable={ showFirstButton }
                                            label="Tires"
                                            checked={ drop.tags.indexOf("tires") > -1 }
                                            onChange={ toggleTag(showFirstButton, "tires") }/>
                                        <CheckBox
                                            editable={ showFirstButton }
                                            label="Large Object"
                                            checked={ drop.tags.indexOf("large") > -1 }
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
            </View>
        );
};


TrashMap.navigationOptions = {
    title: "Trash Tracker"
};

const mapStateToProps = (state: Object): Object => {
    const drops = (state.trashTracker.trashDrops || [])
        .filter((drop: TrashDropType): boolean => drop.location && drop.location.longitude && drop.location.latitude);

    const cleanAreas = Object.values(state.teams.teams || {})
        .reduce((areas, team) => areas.concat(team.locations.map(l => Object.assign({}, {
            key: "",
            coordinates: l.coordinates,
            title: `${ team.name }`,
            description: "claimed this area"
        }))), []);
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
