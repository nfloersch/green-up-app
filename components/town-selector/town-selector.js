import React from "react";
import { StyleSheet, View, Text, TouchableHighlight, Platform, TouchableOpacity } from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import * as styleConstants from "../../styles/constants";
import { defaultStyles } from "../../styles/default-styles";
import * as R from 'ramda';

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

const styles = StyleSheet.create(myStyles, {});

type PropsType = {
    onSelect: string => void,
    town: ?string,
    towns: ?Array<string>
};
const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

const findTown = R.cond([
    [query],
    []
]);


    R.curry((allTowns, query) => {


    if ((query || "").trim() === "") {
        return [];
    }
    return allTowns.filter(x => x.toLowerCase().indexOf(query.toLowerCase()) > -1);
});

export const TownSelector = ({ town, towns, onSelect }: PropsType) => {
    const myTowns = findTowns(query);

    return (
        <View style={ { zIndex: 1, marginTop: 10 } }>
            <Text style={ styles.labelDark }>{ "Select Town/City" }</Text>
            <Autocomplete
                inputContainerStyle={ { borderColor: "#000" } }
                data={ myTowns }
                defaultValue={ town || "" }
                onChangeText={ text => dispatch({ type: "SET_STATE", data: { query: text } }) }
                underlineColorAndroid={ "transparent" }
                renderItem={ town => (
                    <TouchableOpacity
                        style={ styles.suggestion }
                        onPress={ setState({ query: "", team: { ...state.team, town } }) }
                    >
                        <Text>{ town }</Text>
                    </TouchableOpacity>
                ) }
            />

        </View>
    );
};


export default TownSelector;
