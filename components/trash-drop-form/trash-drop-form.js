// @flow
import React, { useState, useEffect, Fragment } from "react";
import {
    TouchableHighlight,
    StyleSheet,
    TextInput,
    View,
    ScrollView
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
    trashDrop: Object,
    onSave: Object => void,
    onCancel: ()=> void,
    currentUser: UserType,
    townData: Object,
    trashCollectionSites: Array<Object>
};

export const TrashDropForm = ({ location, trashDrop, onSave, onCancel, currentUser, townData, trashCollectionSites }: PropsType): React$Element<View> => {
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
    const isEditable = Boolean(!drop.wasCollected && drop.createdBy && (drop.createdBy.uid === currentUser.uid));
    useEffect(() => {
        setDrop({ ...trashDrop, location });
    }, [trashDrop, location]);


    const guStart = moment(getCurrentGreenUpDay()).subtract(1, "days");
    const guEnd = moment(getCurrentGreenUpDay()).add(4, "days");
    const contents = !dateIsInCurrentEventWindow()
        ? (
            <View style={ {flex: 1, justifyContent:"center"} }>
                <View>
                    <Title>{ "You can start recording your trash bags 2 days before and up to 3 days after Green Up Day" }</Title>
                    <Text>{ `${ guStart.format("dddd MM/DD/YYYY") } until ${ guEnd.format("dddd MM/DD/YYYY") }` }</Text>
                </View>
            </View>
        )
        : (
            <Fragment>
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
                        <TownInformation townInfo={ townInfo } town={ town }/>
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
                        {
                            !drop.id && townInfo.roadsideDropOffAllowed === true && (
                                <View style={ { width: "100%", height: 60 } }>
                                    <TouchableHighlight
                                        style={ [styles.button, { width: "100%" }] }
                                        onPress={ collectTrashDrop }
                                    >
                                        <Text style={ styles.buttonText }>{ "Drop trash right here" }</Text>
                                    </TouchableHighlight>
                                </View>
                            )
                        }
                        {
                            !drop.id && (
                                <View style={ { width: "100%", height: 60 } }>
                                    <SiteSelector
                                        label={ "Select Trash Collection Site" }
                                        onSelect={ () => {
                                        } }
                                        sites={ trashCollectionSites }
                                        value={ "foo" }
                                    />
                                    <Text
                                        style={ styles.buttonText }>{ "Trash was taken to  this drop-off location." }</Text>
                                </View>
                            )
                        }
                    </View>
                </ScrollView>
            </Fragment>
        );


    return (
        <SafeAreaView style={ styles.container }>
            { contents }
        </SafeAreaView>
    );
};

