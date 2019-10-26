// @flow
import React, { useState } from "react";
import { StyleSheet, KeyboardAvoidingView, ScrollView, View, FlatList, TextInput, Platform } from "react-native";
import { connect } from "react-redux";
import { defaultStyles } from "../../styles/default-styles";
import TownItem from "../../components/town-item";
import * as R from "ramda";

const styles = StyleSheet.create(defaultStyles);

type PropsType = {
    towns: { [key: string]: Town }
};

const TownInfo = ({ towns }: PropsType): React$Element<any> => {
    const [searchResults, setSearchResults] = useState(Object.keys(towns));
    const [searchTerm, setSearchTerm] = useState("");
    const onSearchTermChange = (term: string) => {


        // $FlowFixMe
        const filterTowns = R.compose(
            R.map((town: Town): ?string => town.id),
            R.filter(((value: Object): boolean => (value.name || "").toLowerCase().indexOf(term.trim().toLowerCase()) !== -1)),
            Object.values
        );

        setSearchResults(filterTowns(towns));
        setSearchTerm(term.trim());
    };

    const keys = searchTerm ? searchResults : Object.keys(towns);
    const locations = keys.map((key: string): Object => ({ key, ...(towns[key] || {}) }));

    return (
        <View style={ styles.frame }>
            <View style={ { margin: 10 } }>
                <TextInput
                    keyBoardType={ "default" }
                    onChangeText={ onSearchTermChange }
                    placeholder={ "Search by City/Town" }
                    style={ styles.textInput }
                    value={ searchTerm }
                    underlineColorAndroid={ "transparent" }
                />
            </View>
            <KeyboardAvoidingView
                style={ defaultStyles.frame }
                behavior={ Platform.OS === "ios" ? "padding" : null }
            >
                <ScrollView style={ styles.scroll }>
                    <View style={ styles.infoBlockContainer }>
                        <FlatList
                            style={ styles.infoBlockContainer }
                            data={ locations }
                            renderItem={ ({ item }: { item: Town }): React$Element<any> => (
                                <TownItem item={ item }/>) }/>
                    </View>
                    <View style={ defaultStyles.padForIOSKeyboard }/>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};


TownInfo.navigationOptions = {
    title: "Find Bags, Gloves, and Other Stuff"
};

function mapStateToProps(state: Object): Object {
    const towns = state.towns.townData;
    return { towns };
}


// $FlowFixMe
export default connect(mapStateToProps)(TownInfo);
