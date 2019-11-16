// @flow
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Autocomplete from "react-native-autocomplete-input";

const myStyles = {
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 1
    },
    labelDark: {
        color: "#333",
        fontSize: 16,
        shadowColor: "#FFF",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        marginTop: 5
    },
    suggestion: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        borderColor: "#ABABAB",
        borderBottomWidth: 1
    }
};

const styles = StyleSheet.create(myStyles);

type PropsType = {
    onSelect: Town => void,
    value: ?string,
    towns: ?Array<Town>
};

const matchTowns = (towns: ?Array<Town>, query?: string): Array<Town> => {
    const testTowns = Array.isArray(towns) ? towns.filter((town: Town): boolean => Boolean(town && town.name)) : [];
    const testString = typeof query !== "string" ? "" : query.trim().toLowerCase();
    return testTowns.filter((town: Town): boolean => (town.name || "").toLowerCase().startsWith(testString));
};

export const SiteSelector = ({ value, towns, onSelect }: PropsType): React$Element<any> => {
    const [query, setQuery] = useState("");
    const [focus, setFocus] = useState(false);
    const data = focus ? matchTowns(towns, query) : [];
    useEffect(() => {
        if (Boolean(value)) {
            setQuery(value || "");
        }
    }, [value]);
    return (
        <View style={ { zIndex: 1, marginTop: 10 } }>
            <Text style={ styles.labelDark }>{ "Select Town/City" }</Text>
            <Autocomplete
                inputContainerStyle={ { borderColor: "#000" } }
                data={ data }
                defaultValue={ query }
                onChangeText={ setQuery }
                onBlur={ () => {
                    setFocus(false);
                } }
                onFocus={ () => {
                    setFocus(true);
                } }
                keyExtractor={ (item): string => item.id }
                underlineColorAndroid={ "transparent" }
                renderItem={ (selection: Object): React$Element<any> => (
                    <TouchableOpacity
                        key={ selection.item.id }
                        style={ styles.suggestion }
                        onPress={ () => {
                            onSelect(selection.item);
                        } }
                    >
                        <Text style={ { color: "black" } }>{ selection.item.name }</Text>
                    </TouchableOpacity>
                ) }
            />
        </View>
    );
};


export default TownSelector;
