// @flow
import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

const styles = StyleSheet.create({
    row: {
        height: 48,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0, 0, 0, 0.054)"
    },
    text: {
        fontSize: 16
    }
});

type PropsType = {
    errorMessage?: string
};


const enableLocation = () => {
    // TODO: fix this.
};

export const EnableLocationServices = ({ errorMessage }: PropsType): React$Element<View> => (
    <View style={ [styles.frame, { display: "flex", justifyContent: "center" }] }>
        <Text style={ { fontSize: 20, color: "white", textAlign: "center" } }>
            { errorMessage || "Permissions to access your location is required for this feature." }
        </Text>
        <TouchableHighlight
            style={ styles.link }
            onPress={ enableLocation }>
            <Text style={ [styles.linkText, { color: "#333333" }] }>
                { "Enable Location Services" }
            </Text>
        </TouchableHighlight>
    </View>
);


export default EnableLocationServices;
