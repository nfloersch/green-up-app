// @flow
import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, FlatList, TextInput, TouchableHighlight, Platform } from "react-native";
import { connect } from "react-redux";
import { defaultStyles } from "../../styles/default-styles";
import * as R from "ramda";
import WatchGeoLocation from "../../components/watch-geo-location";
import { Ionicons } from "@expo/vector-icons";
import { searchArray } from "../../libs/search-score";
import { DisposalSite } from "../../components/disposal-site/disposal-site";

const styles = StyleSheet.create(defaultStyles);
const iconStyle = {
    height: 40,
    width: 40,
    padding: 2,
    color: "white",
    textAlign: "center"
};
const searchableFields = ["name", "townName", "address", "townId"];
type PropsType = {
    dropOffSpots: Array<Object>,
    userLocation: Object
};

const HandlingTrash = ({ dropOffSpots, userLocation }: PropsType): React$Element<any> => {

    const [searchResults, setSearchResults] = useState(dropOffSpots);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        const spotsFound = searchArray(searchableFields, dropOffSpots, searchTerm);
        setSearchResults(spotsFound);
    }, [searchTerm]);

    return (
        <View style={ styles.frame }>
            <WatchGeoLocation/>
            <View style={ { margin: 10, padding: 0, marginBottom: 2, height: 40 } }>
                <View style={ { flex: 1, flexDirection: "row", justifyContent: "flexStart" } }>
                    <View style={ { flex: 1, flexDirection: "column" } }>
                        <TextInput
                            keyBoardType={ "default" }
                            onChangeText={ setSearchTerm }
                            placeholder={ "Search" }
                            style={ [styles.textInput, { alignSelf: "stretch" }] }
                            value={ searchTerm }
                            underlineColorAndroid={ "transparent" }
                        />
                    </View>
                    <TouchableHighlight
                        onPress={ () => {
                            setSearchTerm("");
                        } }
                        style={ { height: 40, width: 40, padding: 1, marginLeft: 2 } }>
                        <Ionicons
                            name={ Platform.OS === "ios" ? "ios-close-circle-outline" : "md-close-circle-outline" }
                            size={ 36 }
                            style={ iconStyle }/>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={ () => {
                            setSearchTerm(userLocation.townId || "");
                        } }
                        style={ { height: 40, width: 40, padding: 1, marginLeft: 2 } }>
                        <Ionicons
                            name={ Platform.OS === "ios" ? "md-locate" : "md-locate" }
                            size={ 36 }
                            style={ iconStyle }/>
                    </TouchableHighlight>
                </View>
            </View>
            <ScrollView style={ styles.scroll }>
                <View style={ styles.infoBlockContainer }>
                    <FlatList
                        style={ styles.infoBlockContainer }
                        data={ searchTerm ? searchResults : dropOffSpots }
                        keyExtractor={ (item: Object, index: number): string => `location-${ index }` }
                        renderItem={ ({ item }: { item: Town }): React$Element<any> => (
                            <DisposalSite item={ item }/>) }/>
                </View>
                <View style={ defaultStyles.padForIOSKeyboard }/>
            </ScrollView>
        </View>
    );
};

HandlingTrash.navigationOptions = {
    title: "Trash Disposal Sites"
};

const mapStateToProps = (state: Object): Object => {

    const flatReduce = ([key, town]) => (town.dropOffLocations || [])
        .map((dropOff): Object => ({
            ...dropOff,
            townId: key,
            townName: town.name,
            allowsRoadside: town.roadsideDropOffAllowed ? `${ town.name } allows roadside trash drops` : `${ town.name } does NOT allow roadside trash drops. Please take your trash to the nearest drop-off location.`
        }));

    const dropOffSpots = R.compose(
        R.flatten,
        R.map((entry): Array<Object> => (entry[1].dropOffLocations || []).length === 0
            ? [{
                townId: entry[0],
                townName: entry[1].name,
                allowsRoadside: entry[1].roadsideDropOffAllowed ? `${ entry[1].name } allows roadside trash drops` : `${ entry[1].name } does NOT allow roadside trash drops. Please take your trash to the nearest drop-off location.`
            }]
            : flatReduce(entry)),
        Object.entries
    )(state.towns.townData);

    return (
        {
            dropOffSpots,
            userLocation: state.userLocation
        });
};

export default connect(mapStateToProps)(HandlingTrash);
