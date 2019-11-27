// @flow
import React, { useState, useEffect, Fragment } from "react";
import {
    TouchableHighlight,
    StyleSheet,
    TextInput,
    View,
    ScrollView, Modal
} from "react-native";
import { Text, Title } from "@shoutem/ui";
import { defaultStyles } from "../../styles/default-styles";
import { SafeAreaView, TouchableOpacity } from "react-native";
import CheckBox from "react-native-checkbox";
import * as turf from "@turf/helpers";
import booleanWithin from "@turf/boolean-within";
import TownInformation from "../town-information";
import SiteSelector from "../site-selector";
import { dateIsInCurrentEventWindow, getCurrentGreenUpDay } from "../../libs/green-up-day-calucators";
import moment from "moment";
import { MiniMap } from "../mini-map/mini-map";


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
    onCancel: ()=> void,
    currentUser: UserType,
    townData: Object,
    trashCollectionSites: Array<Object>
};

export const TrashDropForm = ({ location, trashDrop, onSave, onCancel, currentUser, townData, trashCollectionSites }: PropsType): React$Element<View> => {
    const defaultTeam = Object.values(currentUser.teams || {})[0];
    const [drop, setDrop] = useState({
        id: null,
        active: true,
        teamId: (defaultTeam || {}).id,
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
    const toggleTag = (editable: boolean, tag: string): (any=>any) => () => {
        if (editable) {
            const hasTag = (drop.tags || []).indexOf(tag) > -1;
            const tags = hasTag
                ? (drop.tags || []).filter((_tag: string): boolean => _tag !== tag)
                : (drop.tags || []).concat(tag);
            setDrop({ ...drop, tags });
        }
    };
    const isEditable = Boolean(!drop.wasCollected && drop.createdBy && (drop.createdBy.uid === currentUser.uid));
    useEffect(() => {
        setDrop({ ...trashDrop, location });
    }, [trashDrop, location]);

    const guStart = moment(getCurrentGreenUpDay()).subtract(1, "days");
    const guEnd = moment(getCurrentGreenUpDay()).add(4, "days");

    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.buttonBarHeader }>
                <View style={ styles.buttonBar }>
                    {
                        isEditable
                            ? (
                                <View style={ styles.buttonBarButton }>
                                    <TouchableOpacity
                                        style={ styles.headerButton }
                                        onPress={ () => onSave(drop) }
                                    >
                                        <Text style={ styles.headerButtonText }>
                                            { "Save" }
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                            : null
                    }
                    <View style={ styles.buttonBarButton }>
                        <TouchableOpacity style={ styles.headerButton } onPress={ onCancel }>
                            <Text style={ styles.headerButtonText }>{ "Cancel" }</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView style={ styles.scroll }>
                <View style={ { flex: 1, justifyContent: "flex-start" } }>
                    <Text style={ styles.labelDark }>Number of Bags</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        editable={ isEditable }
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
                            editable={ isEditable }
                            label="Needles/Bio-Waste"
                            checked={ (drop.tags || []).indexOf("bio-waste") > -1 }
                            onChange={ toggleTag(isEditable, "bio-waste") }/>
                        <CheckBox
                            editable={ isEditable }
                            label="Tires"
                            checked={ (drop.tags || []).indexOf("tires") > -1 }
                            onChange={ toggleTag(isEditable, "tires") }/>
                        <CheckBox
                            editable={ isEditable }
                            label="Large Object"
                            checked={ (drop.tags || []).indexOf("large") > -1 }
                            onChange={ toggleTag(isEditable, "large") }/>
                    </View>

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
                            onPress={ () => {
                                setModal("site-selector");
                            } }
                        >
                            <Text>{ "Choose Site" }</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
            <Modal
                animationType={ "slide" }
                onRequestClose={ () => {
                    setModal(null);
                } }
                transparent={ false }
                visible={ modal === "site-selector" }>
                <TouchableOpacity onPress={ () => {
                    setModal(null);
                } }>
                    <Text> { "X" };</Text>
                </TouchableOpacity>
                <SiteSelector
                    onSelect={ site => {
                        setDrop({ ...drop, collectionSiteId: site.id });
                    } }
                    sites={ trashCollectionSites }
                />
            </Modal>
        </SafeAreaView>
    );
};

