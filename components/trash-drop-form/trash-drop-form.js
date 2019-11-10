// @flow
import React, { useState, useEffect } from "react";
import {
    TouchableHighlight,
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView
} from "react-native";
import { defaultStyles } from "../../styles/default-styles";
import { SafeAreaView, TouchableOpacity } from "react-native";
import CheckBox from "react-native-checkbox";
import * as turf from "@turf/helpers";
import booleanWithin from "@turf/boolean-within";
import TownInformation from "../town-information";

type LocationType = { coords: { longitude: number, latitude: number } };

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);
const getTown = (myLocation: LocationType): string => {
    const townPolygonsData = require("../../libs/VT_Boundaries__town_polygons.json");
    const currentLocation = turf.point([myLocation.coords.longitude, myLocation.coords.latitude]);
    const town = townPolygonsData.features
        .find((f: Object): boolean => {
            const feature = turf.feature(f.geometry);
            return booleanWithin(currentLocation, feature);
        });
    return town ? town.properties.TOWNNAMEMC : "";
};

type PropsType = {
    location: LocationType,
    trashDrop: Object,
    onSave: Object => void,
    onCancel: ()=> void,
    currentUser: UserType
};

export const TrashDropForm = ({ location, trashDrop, onSave, onCancel, currentUser }: PropsType): React$Element<View> => {
    const [drop, setDrop] = useState({
        id: null,
        location: {},
        tags: [],
        bagCount: 1,
        wasCollected: false,
        createdBy: { uid: currentUser.uid, email: currentUser.email }
    });
    const collectTrashDrop = () => {
        const collectedDrop = {
            ...drop,
            wasCollected: true,
            collectedBy: {
                uid: currentUser.uid,
                email: currentUser.email
            }
        };
        onSave(collectedDrop);
    };

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
    const showFirstButton = Boolean(!drop.wasCollected && drop.createdBy && (drop.createdBy.uid === currentUser.uid));
    useEffect(() => {
        setDrop(trashDrop);
    }, [trashDrop]);

    return (
        <SafeAreaView style={ styles.container }>

            <View style={ [styles.buttonBarHeader, { backgroundColor: "#EEE", marginTop: 10 }] }>
                <View style={ styles.buttonBar }>
                    {
                        showFirstButton
                            ? (
                                <View style={ styles.buttonBarButton }>
                                    <TouchableOpacity
                                        style={ styles.headerButton }
                                        onPress={ onSave }
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
                        <TouchableOpacity style={ styles.headerButton } onPress={ onCancel }>
                            <Text style={ styles.headerButtonText }>{ "Cancel" }</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView style={ styles.scroll }>
                <View style={ styles.infoBlockContainer }>
                    <TownInformation townInfo={ townInfo } town={ town }/>
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
        </SafeAreaView>

    );
};



