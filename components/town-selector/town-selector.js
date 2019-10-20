// @flow
import React, { useState } from "react";
import { StyleSheet, View, Text, Platform, TouchableOpacity } from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import * as styleConstants from "../../styles/constants";
import { defaultStyles } from "../../styles/default-styles";
import * as R from "ramda";

const myStyles = {
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 1
    }
};

const styles = StyleSheet.create({ ...defaultStyles, ...myStyles });

type PropsType = {
    onSelect: string => void,
    defaultTown: ?string,
    towns: ?Array<string>
};

const matchTowns = R.curry((towns: ?Array<string>, query: ?string): Array<TownType> => {
    const testTowns = Array.isArray(towns) ? towns.filter(town => Boolean(town && town.name)) : [];
    const testString = typeof query !== "string" ? "" : query.trim().toLowerCase();
    return testTowns.filter(town => town.name.toLowerCase().indexOf(testString) > -1);
});


export const TownSelector = ({ defaultTown, towns, onSelect }: PropsType) => {
    const [query, setQuery] = useState("");
    const myTowns = matchTowns(towns);
    const data = myTowns(query);
    return (
        <View style={ { zIndex: 1, marginTop: 10 } }>
            <Text style={ styles.labelDark }>{ "Select Town/City" }</Text>
            <Autocomplete
                inputContainerStyle={ { borderColor: "#000" } }
                data={ data }
                defaultValue={ defaultTown || "" }
                onChangeText={ setQuery }
                underlineColorAndroid={ "transparent" }
                renderItem={ town => (
                    <TouchableOpacity
                        style={ styles.suggestion }
                        onPress={ () => onSelect(town) }
                    >
                        <Text style={ { color: "black" } }>{ town.name }</Text>
                    </TouchableOpacity>
                ) }
            />

        </View>
    );
};


export default TownSelector;
