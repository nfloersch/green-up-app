// @flow
import React, { useState, useEffect } from "react";
import {
    TouchableHighlight,
    StyleSheet,
    TextInput,
    View,
    ScrollView, Modal
} from "react-native";
import { DropDownMenu, Text, Title } from "@shoutem/ui";
import { defaultStyles } from "../../styles/default-styles";
import { SafeAreaView, TouchableOpacity } from "react-native";
import CheckBox from "react-native-checkbox";
import * as turf from "@turf/helpers";
import booleanWithin from "@turf/boolean-within";
import TownInformation from "../town-information";
import SiteSelector from "../site-selector";
import * as R from "ramda";
import Site from "../site";

type LocationType = { id: string, name: string, coordinates: { longitude: number, latitude: number } };

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);

const styles = StyleSheet.create(combinedStyles);

const getTown = (myLocation: LocationType): string => {
    const townPolygonsData = require("../../libs/VT_Boundaries__town_polygons.json");
    const currentLocation = turf.point([myLocation.coordinates.longitude, myLocation.coordinates.latitude]);
    const town = townPolygonsData.features
        .find((f: Object): boolean => {
            const feature = turf.feature(f.geometry);
            return booleanWithin(currentLocation, feature);
        });
    return town ? town.properties.TOWNNAMEMC : "";
};

type PropsType = {
    location: LocationType,
    trashDrop?: Object,
    onSave: Object => void,
    currentUser: UserType,
    townData: Object,
    trashCollectionSites: Array<Object>,
    userLocation?: LocationType
};

export const TrashDropForm = ({ location, trashDrop, onSave, currentUser, townData, trashCollectionSites, userLocation }: PropsType): React$Element<View> => {
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
        bagCount: 1,
        createdBy: { uid: currentUser.uid, email: currentUser.email }
    });
    const [modal, setModal] = useState(null);
    const town = location ? getTown(location) : "";
    const encodedTownName = town.toUpperCase().replace(/[^A-Z]/g, "_");
    const townInfo = townData[encodedTownName] || {};
    const toggleTag = (tag: string): (any=>any) => () => {
        const hasTag = (drop.tags || []).indexOf(tag) > -1;
        const tags = hasTag
            ? (drop.tags || []).filter((_tag: string): boolean => _tag !== tag)
            : (drop.tags || []).concat(tag);
        setDrop({ ...drop, tags });

    };

    useEffect(() => {
        setDrop({ ...trashDrop, location });
    }, [trashDrop, location]);

    // const guStart = moment(getCurrentGreenUpDay()).subtract(1, "days");
    // const guEnd = moment(getCurrentGreenUpDay()).add(4, "days");
    const teamOptions = Object.entries(currentUser.teams || {}).map((entry: [string, Object]) => ({
        id: entry[0],
        name: entry[1].name
    }));
    const selectedSite = trashCollectionSites.find(site => site.id === drop.collectionSiteId);
    const selectedTown = townData.find(t => t.townId === (selectedSite || {}).townId);
    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.buttonBarHeader }>
                <View style={ styles.buttonBar }>
                    <TouchableOpacity
                        style={ styles.headerButton }
                        onPress={ () => onSave(drop) }
                    >
                        <Text style={ styles.headerButtonText }>
                            { "Save" }
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={ styles.scroll }>
                <View style={ { flex: 1, justifyContent: "flex-start" } }>
                    <Text style={ styles.label }>Number of Bags</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
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
                    <Text style={ styles.label }>Other Items</Text>
                    <View style={ styles.fieldset }>
                        <CheckBox
                            label="Needles/Bio-Waste"
                            checked={ (drop.tags || []).indexOf("bio-waste") > -1 }
                            onChange={ toggleTag("bio-waste") }/>
                        <CheckBox
                            label="Tires"
                            checked={ (drop.tags || []).indexOf("tires") > -1 }
                            onChange={ toggleTag("tires") }/>
                        <CheckBox
                            label="Large Object"
                            checked={ (drop.tags || []).indexOf("large") > -1 }
                            onChange={ toggleTag("large") }/>
                    </View>


                    { R.cond([
                        [() => teamOptions.length > 1, () => (
                            <View style={ { flex: 1, flexDirection: "row" } }>
                                <Title>{ "This drop is for team:" }</Title>
                                <DropDownMenu
                                    options={ teamOptions }
                                    selectedOption={ drop.teamId ? teamOptions.find(t => (t.id === drop.teamId)) : teamOptions[0] }
                                    onOptionSelected={ (team) => setDrop({ ...drop, teamId: team.id }) }
                                    titleProperty="name"
                                    valueProperty="teamOptions.id"
                                    style={ { modalItem: { color: "blue", backgroundColor: "red" } } }
                                />
                            </View>
                        )],
                        [() => teamOptions.length === 1, () => (
                            <Title>{ `These bags coun for team: ${ teamOptions[0].name }` }</Title>
                        )],
                        [R.T, () => null]
                    ])() }


                    <TownInformation townInfo={ townInfo } town={ town }/>
                    {
                        !drop.id && townInfo.roadsideDropOffAllowed === true && (
                            <View style={ { width: "100%", height: 60 } }>
                                <TouchableHighlight
                                    style={ [styles.button, { width: "100%" }] }
                                    onPress={ onSave }
                                >
                                    <Text style={ styles.buttonText }>{ "Drop trash right here" }</Text>
                                </TouchableHighlight>
                            </View>
                        )
                    }
                    <View style={ { width: "100%", height: 60 } }>
                        <TouchableHighlight
                            stle={ styles.button }
                            onPress={ () => {
                                setModal("site-selector");
                            } }
                        >
                            <Text>{ "Find a trash collection site" }</Text>
                        </TouchableHighlight>
                    </View>
                    { drop.collectionSiteId ? (
                        <View style={ styles.fieldset }>
                            <Site site={ selectedSite } town={ selectedTown }/></View>
                    ) : null }
                </View>

            </ScrollView>
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
        </SafeAreaView>
    );
};

