// @flow
import React, { useState } from "react";
import { StyleSheet, KeyboardAvoidingView, ScrollView, View, FlatList, TextInput, Platform, Text } from "react-native";
import { connect } from "react-redux";
import { defaultStyles } from "../../styles/default-styles";
import PickupLocation from "../../components/pickup-location";
import * as R from "ramda";
import WatchGeoLocation from "../../components/watch-geo-location";

const styles = StyleSheet.create(defaultStyles);

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
            <View style={ { margin: 10 } }>
                <TextInput
                    keyBoardType={ "default" }
                    onChangeText={ onSearchTermChange(towns) }
                    placeholder={ "Search by City/Town" }
                    style={ styles.textInput }
                    value={ searchTerm }
                    underlineColorAndroid={ "transparent" }
                />
            </View>
            <ScrollView style={ styles.scroll }>
                <View style={ styles.infoBlockContainer }>
                    <FlatList
                        style={ styles.infoBlockContainer }
                        data={ searchTerm ? searchResults : towns }
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

    const flatReduce = ([key, town]) => (town.pickupLocations || []).map(pickup => ({
        ...pickup,
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
