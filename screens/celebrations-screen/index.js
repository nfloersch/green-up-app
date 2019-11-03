// @flow
import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, FlatList, TextInput, TouchableHighlight, Platform } from "react-native";
import { connect } from "react-redux";
import { defaultStyles } from "../../styles/default-styles";
import CelebrationLocation from "../../components/celebration-location";
import * as R from "ramda";
import WatchGeoLocation from "../../components/watch-geo-location";
import { Ionicons } from "@expo/vector-icons";
import { searchArray } from "../../libs/search-score";

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
    celebrationEvents: Array<Object>,
    userLocation: Object
};

const Celebrations = ({ celebrationEvents, userLocation }: PropsType): React$Element<any> => {

    const [searchResults, setSearchResults] = useState(celebrationEvents);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        const spotsFound = searchArray(searchableFields, celebrationEvents, searchTerm);
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

            <FlatList
                data={ searchTerm ? searchResults : celebrationEvents }
                keyExtractor={ (item: Object, index: number): string => `location-${ index }` }
                renderItem={ ({ item }: { item: Town }): React$Element<any> => (
                    <CelebrationLocation
                        item={ item }
                        onPress={ () => {
                        } }
                    />) }
            />

        </View>
    );
};

Celebrations.navigationOptions = {
    title: "Celebrate Green Up"
};

const mapStateToProps = (state: Object): Object => {

    const flatReduce = ([key, town]) => (town.celebrations || [])
        .map((celebration): Object => ({
            ...celebration,
            townId: key,
            townName: town.name
        }));

    const celebrationEvents = R.compose(
        R.flatten,
        R.map((entry): Array<Object> => flatReduce(entry)),
        Object.entries
    )(state.towns.townData);
    return (
        {
            celebrationEvents,
            userLocation: state.userLocation
        });
};

export default connect(mapStateToProps)(Celebrations);
