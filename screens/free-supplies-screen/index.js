// @flow
import React, { useState } from "react";
import { StyleSheet, ScrollView, View, FlatList, TextInput, TouchableHighlight, Platform } from "react-native";
import { connect } from "react-redux";
import { defaultStyles } from "../../styles/default-styles";
import PickupLocation from "../../components/pickup-location";
import * as R from "ramda";
import WatchGeoLocation from "../../components/watch-geo-location";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

const styles = StyleSheet.create(defaultStyles);
const iconStyle = {
    height: 40,
    width: 40,
    padding: 2,
    color: "white"
};

type PropsType = {
    towns: { [key: string]: Town },
    userLocation: Object
};

const FreeSupplies = ({ towns, userLocation }: PropsType): React$Element<any> => {
    const [searchResults, setSearchResults] = useState(Object.keys(towns));
    const [searchTerm, setSearchTerm] = useState("");
    const onSearchTermChange = R.curry((myTowns: Array<Object>, term: string) => {
        const filterTowns = ((value: Object): boolean => (value.townName || "").toLowerCase().indexOf(term.trim().toLowerCase()) !== -1);
        const foundTowns = myTowns.filter(filterTowns);
        setSearchResults(foundTowns);
        setSearchTerm(term.trim());
    });


    return (

        <View style={ styles.frame }>
            <WatchGeoLocation/>
            <View style={ { margin: 10, marginBottom: 2, height: 40, backgroundColor: "red" } }>
                <View style={ { flex: 1, flexDirection: "row", justifyContent: "flexStart" } }>
                    <View style={ { flex: 1, flexDirection: "column" } }>
                        <TextInput
                            keyBoardType={ "default" }
                            onChangeText={ onSearchTermChange(towns) }
                            placeholder={ "Search" }
                            style={ [styles.textInput, { alignSelf: "stretch" }] }
                            value={ searchTerm }
                            underlineColorAndroid={ "transparent" }
                        />
                    </View>
                    <TouchableHighlight style={ { height: 40, width: 40 } }>
                        <Ionicons
                            name={ Platform.OS === "ios" ? "ios-close" : "md-close" }
                            size={ 36 }
                            style={ iconStyle }/>
                    </TouchableHighlight>
                    <TouchableHighlight style={ { height: 40, width: 40 } }>
                        <Ionicons
                            name={ Platform.OS === "ios" ? "ios-locate" : "md-locate" }
                            size={ 36 }
                            style={ iconStyle }/>
                    </TouchableHighlight>
                </View>
            </View>
            <ScrollView style={ styles.scroll }>
                <View style={ styles.infoBlockContainer }>
                    <FlatList
                        style={ styles.infoBlockContainer }
                        data={ searchTerm ? searchResults : towns }
                        keyExtractor={ item => item.key }
                        renderItem={ ({ item }: { item: Town }): React$Element<any> => (
                            <PickupLocation item={ item }/>) }/>
                </View>
                <View style={ defaultStyles.padForIOSKeyboard }/>
            </ScrollView>
        </View>
    );
};

FreeSupplies.navigationOptions = {
    title: "Find Bags, Gloves, and Other Stuff"
};

const mapStateToProps = (state: Object): Object => {

    const flatReduce = ([key, town]) => (town.pickupLocations || []).map((pickup, i): Object => ({
        ...pickup,
        key: i,
        townId: key,
        townName: town.name
    }));

    const towns = R.compose(
        R.flatten,
        R.map((entry): Array<Object> => flatReduce(entry)),
        Object.entries
    )(state.towns.townData);

    return (
        {
            towns,
            userLocation: state.userLocation
        });
};

export default connect(mapStateToProps)(FreeSupplies);
