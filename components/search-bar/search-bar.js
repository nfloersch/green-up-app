// @flow
import React from "react";
import { StyleSheet, View, TextInput, TouchableHighlight, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "../../styles/default-styles";

const localStyles = {
    searchBar: {
        margin: 10,
        padding: 0,
        marginBottom: 2,
        height: 45
    },
    searchTerm: {
        backgroundColor: "white",
        textAlign: "left",
        padding: 10
    },
    iconStyle: {
        height: 40,
        width: 40,
        padding: 2,
        color: "white",
        textAlign: "center"
    }
};
const styles = StyleSheet.create(Object.assign({}, defaultStyles, localStyles));

type PropsType = {
    searchTerm: ?string,
    search: string => void,
    userLocation: Object
};

export const SearchBar = ({ userLocation, searchTerm = "", search }: PropsType): React$Element<View> => (
    <View style={ styles.searchBar }>
        <View style={ { flex: 1, flexDirection: "row", alignItems: "top", justifyContent: "center" } }>
            <View style={ { flex: 1, flexDirection: "column", justifyContent:"center", paddingTop: 2 } }>
                <TextInput
                    keyBoardType={ "default" }
                    onChangeText={ search }
                    placeholder={ "Search" }
                    style={ styles.searchTerm}
                    value={ searchTerm }
                    underlineColorAndroid={ "transparent" }
                />
            </View>
            <TouchableHighlight
                onPress={ () => {
                    search("");
                } }
                style={ { height: 36, width: 40, paddingLeft: 2, paddingRight: 2, paddingBottom: 2, marginLeft: 2 } }>
                <Ionicons
                    name={ Platform.OS === "ios" ? "ios-close-circle-outline" : "md-close-circle-outline" }
                    size={ 36 }
                    style={ styles.iconStyle }/>
            </TouchableHighlight>
            <TouchableHighlight
                onPress={ () => {
                    search(userLocation.townId || "");
                } }
                style={ { height:36, width: 40, paddingLeft: 2, paddingRight: 2, paddingBottom: 2,  marginLeft: 2 } }>
                <Ionicons
                    name={ Platform.OS === "ios" ? "md-locate" : "md-locate" }
                    size={ 36 }
                    style={ styles.iconStyle }/>
            </TouchableHighlight>
        </View>
    </View>
);

