// @flow
import React from "react";
import { StyleSheet, TouchableHighlight, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { View, TextInput } from "@shoutem/ui";

const localStyles = {
    iconStyle: {
        height: 40,
        width: 40,
        padding: 2,
        color: "white",
        textAlign: "center"
    }
};

const styles = StyleSheet.create(localStyles);

type PropsType = {
    searchTerm: ?string,
    search: string => void,
    userLocation: Object
};

export const SearchBar = ({ userLocation, searchTerm = "", search }: PropsType): React$Element<View> => (
    <View style={ { flex: 1, flexDirection: "row", justifyContent: "flexStart" } }>
        <View style={ { flex: 1, flexDirection: "column" } }>
            <TextInput
                keyBoardType={ "default" }
                onChangeText={ search }
                placeholder={ "Search" }
                style={ [styles.textInput, { alignSelf: "stretch" }] }
                value={ searchTerm }
                underlineColorAndroid={ "transparent" }
            />
        </View>
        <TouchableHighlight
            onPress={ () => {
                search("");
            } }
            style={ { height: 40, width: 40, padding: 1, marginLeft: 2 } }>
            <Ionicons
                name={ Platform.OS === "ios" ? "ios-close-circle-outline" : "md-close-circle-outline" }
                size={ 36 }
                style={ styles.iconStyle }/>
        </TouchableHighlight>
        <TouchableHighlight
            onPress={ () => {
                search(userLocation.townId || "");
            } }
            style={ { height: 40, width: 40, padding: 1, marginLeft: 2 } }>
            <Ionicons
                name={ Platform.OS === "ios" ? "md-locate" : "md-locate" }
                size={ 36 }
                style={ styles.iconStyle }/>
        </TouchableHighlight>
    </View>
);

