// @flow
import React, { useState, useEffect, Fragment } from "react";
import {
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ScrollView,
    Modal
} from "react-native";
import { DropDownMenu, Text, Button, Title, Subtitle, Divider, View } from "@shoutem/ui";
import { defaultStyles } from "../../styles/default-styles";
import { SafeAreaView } from "react-native";
import * as turf from "@turf/helpers";
import booleanWithin from "@turf/boolean-within";
import TownInformation from "../town-information";
import SiteSelector from "../site-selector";
import * as R from "ramda";
import Site from "../site";
import ButtonBar from "../button-bar";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import TagToggle from "../../components/tag-toggle";
import { isInGreenUpWindow } from "../../libs/green-up-day-calucators";
import { findTownIdByCoordinates } from "../../libs/geo-helpers";

type LocationType = { id: string, name: string, coordinates: { longitude: number, latitude: number } };

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);

const styles = StyleSheet.create(combinedStyles);

// const getTown = (myLocation: LocationType): string => {
//     const townPolygonsData = require("../../libs/VT_Boundaries__town_polygons.json");
//     const currentLocation = turf.point([myLocation.coordinates.longitude, myLocation.coordinates.latitude]);
//     const town = townPolygonsData.features
//         .find((f: Object): boolean => {
//             const feature = turf.feature(f.geometry);
//             return booleanWithin(currentLocation, feature);
//         });
//     return town ? town.properties.TOWNNAMEMC : "";
// };

type PropsType = {
    location: LocationType,
    trashDrop?: Object,
    onSave: TrashDropType => void,
    currentUser: UserType,
    townData: Object,
    trashCollectionSites: Object, // Array<Object>,
    userLocation?: LocationType,
    teamOptions: { id: string, name: ?string }[]
};

export const TrashDropForm = ({ teamOptions, location, trashDrop, onSave, currentUser, townData, trashCollectionSites, userLocation }: PropsType): React$Element<View> => {
    const defaultTeam = Object.values(currentUser.teams || {})[0] || {};
    const [drop, setDrop] = useState({
        id: null,
        active: true,
        teamId: (defaultTeam || {}).id || null,
        collectionSiteId: null,
        created: new Date(),
        wasCollected: false,
        location: {},
        tags: [],
        createdBy: { uid: currentUser.uid, email: currentUser.email },
        bagCount: 1
    });
    const [modal, setModal] = useState(null);
    const currentTownId = location && location.coordinates ? findTownIdByCoordinates(location.coordinates) : "";

    const toggleTag = (tag: string): (any=>any) => () => {
        const hasTag = (drop.tags || []).indexOf(tag) > -1;
        const tags = hasTag
            ? (drop.tags || []).filter((_tag: string): boolean => _tag !== tag)
            : (drop.tags || []).concat(tag);
        setDrop({ ...drop, tags });
    };

    useEffect(() => {
        setDrop({ ...drop, location });
    }, [trashDrop, location]);

    const currentTown = townData.find(t => t.townId === currentTownId);
    const selectedSite = trashCollectionSites.find(site => site.id === drop.collectionSiteId);
    const townHasSites = trashCollectionSites.some(site => site.townId = currentTownId);

    const getDropButtons = R.cond([
        [
            R.always(townHasSites && currentTown.allowsRoadside),
            () => (
                <View style={ { flex: 1, flexDirection: "row", justifyContent: "space-evenly" } }>
                    <Button styleName="stacked secondary"
                            onPress={ () => {
                            } }>
                        <FontAwesome size={ 30 } style={ { color: "#DDD", marginBottom: 10 } } name={ "map-marker" }/>
                        <Text>Drop Trash Bag Here</Text>
                    </Button>
                    <Button styleName="stacked secondary"
                            onPress={ () => {
                                setModal("site-selector");
                            } }>
                        <FontAwesome style={ { color: "#DDD", marginBottom: 10 } } size={ 30 } name={ "map-signs" }/>
                        <Text>Find Trash Collection Site</Text>
                    </Button>
                </View>
            )
        ],
        [
            R.always(currentTown.allowsRoadside),
            () => (
                <Button styleName="confirmation">
                    <Text>Drop Bag Here</Text>
                </Button>
            )
        ],
        [
            R.T,
            () => (
                <View style={ { width: "100%", height: 60 } }>
                    <Button
                        styleName={ "full-width  secondary" }
                        onPress={ () => {
                            setModal("site-selector");
                        } }>
                        <MaterialCommunityIcons
                            name="earth"
                            size={ 25 }
                            style={ { marginRight: 10 } }
                            color={ "#555" }
                        />
                        <Text>{ "Find a trash collection site" }</Text>
                    </Button>
                </View>)
        ]
    ]);
    return (
        <Fragment>
            <SafeAreaView style={ { flex: 1, flexDirection: "column", justifyContent: "flex-end" } }>
                <ScrollView style={ { flexGrow: 1 } }>
                    <View style={ { flex: 1, justifyContent: "flex-start" } }>
                        <View style={ { marginTop: 20, backgroundColor: "white" } }>
                            { R.cond([
                                [() => teamOptions.length > 1, () => (
                                    <Fragment>
                                        <Subtitle
                                            style={ { textAlign: "center" } }>{ "This drop is for team:" }</Subtitle>
                                        <DropDownMenu
                                            options={ teamOptions }
                                            selectedOption={ drop.teamId ? teamOptions.find(t => (t.id === drop.teamId)) : teamOptions[0] }
                                            onOptionSelected={ (team) => setDrop({ ...drop, teamId: team.id }) }
                                            titleProperty="name"
                                            valueProperty="teamOptions.id"
                                            styleName="horizontal"
                                            style={ {
                                                modal: { backgroundColor: "#F00", color: "red" },
                                                selectedOption: {
                                                    marginTop: 0,
                                                    height: 90,
                                                    "shoutem.ui.Text": {
                                                        color: "#333",
                                                        fontSize: 20
                                                    }
                                                }
                                            } }
                                        />
                                    </Fragment>
                                )],
                                [() => teamOptions.length === 1, () => (
                                    <Title> { teamOptions[0].name } </Title>
                                )],
                                [R.T, () => null]
                            ])() }

                        </View>
                        <View style={ { height: 100 } }>
                            <Text style={ {
                                lineHeight: 60,
                                height: 60,
                                color: "white",
                                textAlign: "center"
                            } }>{ "How many bags are you dropping?" }</Text>
                            <View style={ { flex: 1, justifyContent: "center", flexDirection: "row" } }>
                                <TouchableOpacity
                                    onPress={ () => {
                                        const bagCount = isNaN(Number(drop.bagCount)) ? 1 : (Number(drop.bagCount) < 2 ? 1 : Number(drop.bagCount) - 1);
                                        setDrop({
                                            ...drop,
                                            bagCount
                                        });
                                    } }
                                    style={ { height: 100, marginRight: 10 } }>
                                    <MaterialCommunityIcons
                                        size={ 40 }
                                        style={ { color: "#EEE" } }
                                        name={ "chevron-down-circle" }
                                    />
                                </TouchableOpacity>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    value={ isNaN(drop.bagCount) ? "" : drop.bagCount.toString() }
                                    keyboardType="numeric"
                                    placeholder="#"
                                    style={ {
                                        color: "#000",
                                        width: 80,
                                        textAlign: "center",
                                        backgroundColor: "white",
                                        fontSize: 20
                                    } }
                                    onChangeText={ (text: string) => {
                                        const bagCount = isNaN(Number(text)) ? 1 : Number(text);
                                        setDrop({
                                            ...drop,
                                            bagCount
                                        });

                                    } }
                                />
                                <TouchableOpacity
                                    onPress={ () => {
                                        const bagCount = isNaN(Number(drop.bagCount)) ? 1 : (Number(drop.bagCount) < 1 ? 1 : Number(drop.bagCount) + 1);
                                        setDrop({
                                            ...drop,
                                            bagCount
                                        });
                                    } }
                                    style={ { height: 100, marginLeft: 10 } }>
                                    <MaterialCommunityIcons
                                        size={ 40 } style={ { color: "#EEE" } }
                                        name={ "chevron-up-circle" }/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={ styles.label }>Other Items</Text>

                        <TagToggle
                            tag={ "bio-waste" }
                            text={ "Needles/Bio-Waste" }
                            drop={ drop }
                            style={ { margin: 0, padding: 0, height: 100 } }
                            onToggle={ toggleTag("bio-waste") }/>
                        <TagToggle
                            tag={ "tires" }
                            text={ "Tires" }
                            drop={ drop }
                            style={ { margin: 0, padding: 0, height: 100 } }
                            onToggle={ toggleTag("tires") }/>
                        <TagToggle
                            tag={ "large" }
                            text={ "Large Object" }
                            drop={ drop }
                            style={ { margin: 0, padding: 0, height: 100 } }
                            onToggle={ toggleTag("large") }/>

                        <TownInformation townInfo={ currentTown } hideOnError={ true }/>

                        <Divider styleName={ "line" } style={ { marginTop: 20, marginBottom: 20 } }/>

                        { getDropButtons() }


                        { drop.collectionSiteId ? (
                            <View style={ { backgroundColor: "white", padding: 10, marginTop: 10 } }>
                                <Text
                                    style={ { fontSize: 20, marginBottom: 10 } }>{ "I'm taking my trash here:" }</Text>
                                <Site site={ selectedSite } town={ currentTown }/>
                            </View>
                        ) : null }
                    </View>


                </ScrollView>
                <ButtonBar buttonConfigs={
                    [
                        {
                            onClick: (() => {
                                onSave(drop);
                            }),

                            text: "Save"
                        }
                    ]
                }
                >

                    <Text>Tag My Bag</Text>
                </ButtonBar>
            </SafeAreaView>
            <Modal
                animationType={ "slide" }
                onRequestClose={ () => {
                    setModal(null);
                } }
                transparent={ false }
                visible={ modal === "site-selector" }>
                <SafeAreaView>
                    <SiteSelector
                        onSelect={ site => {
                            setDrop({ ...drop, collectionSiteId: site.id });
                            setModal(null);
                        } }
                        sites={ trashCollectionSites || [] }
                        userLocation={ userLocation || {} }
                        towns={ townData }
                        onCancel={ () => {
                            setModal(null);
                        } }
                        value={ selectedSite }
                    />
                </SafeAreaView>
            </Modal>
        </Fragment>
    );
};

