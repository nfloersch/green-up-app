// @flow
import React from "react";
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
    onCancel: ()=> void
};


export const TrashDropForm = ({ location, trashDrop, onSave, onCancel }: PropsType): React$Element<View> => {
    const town = location ? getTown(location) : "";
    const encodedTownName = town.toUpperCase().replace(/[^A-Z]/g, "_");
    const townInfo = townData[encodedTownName] || {};

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
        </SafeAreaView>

    );
};



