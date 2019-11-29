// @flow
import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, FlatList, TextInput, TouchableHighlight, Platform } from "react-native";
import { connect } from "react-redux";
import { defaultStyles } from "../../styles/default-styles";
import PickupLocation from "../../components/pickup-location";
import * as R from "ramda";
import WatchGeoLocation from "../../components/watch-geo-location";
import { Ionicons } from "@expo/vector-icons";
import { searchArray } from "../../libs/search-score";
import SupplyDistributionSite from "../../models/supply-distribution-site";

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
    pickupSpots: Array<Object>,
    userLocation: Object
};

const FreeSupplies = ({ pickupSpots, userLocation }: PropsType): React$Element<any> => {

    const [searchResults, setSearchResults] = useState(pickupSpots);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        const spotsFound = searchArray(searchableFields, pickupSpots, searchTerm);
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
                        data={ searchTerm ? searchResults : pickupSpots }
                        keyExtractor={ (item: Object, index: number): string => `location-${ index }` }
                        renderItem={ ({ item }: { item: Town }): React$Element<any> => (
                            <PickupLocation item={ item }/>) }/>
                </View>

            </ScrollView>
        </View>
    );
};

FreeSupplies.navigationOptions = {
    title: "Find Bags, Gloves, and Other Stuff"
};

const mapStateToProps = (state: Object): Object => {

    const pickupSpots = R.compose(
        R.map(entry => SupplyDistributionSite.create(entry[1], entry[0])),
        Object.entries
    )(state.supplyDistributionSites.sites);
    return ({
        pickupSpots,
        userLocation: state.userLocation
    });
};

export default connect(mapStateToProps)(FreeSupplies);
