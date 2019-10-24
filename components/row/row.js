// @flow
import React from "react";
import { StyleSheet, View, Text, TouchableHighlight, Platform } from "react-native";

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
    title: string,
    onPress: any => void,
    platform: any,
    testID?: string
};

export const Row = ({ title, onPress, platform, testID }: PropsType): React$Element<View | TouchableHighlight> => (platform && platform !== Platform.OS)
    ? (<View/>)
    : (
        <TouchableHighlight
            onPress={ onPress }
            testID={ testID }
            underlayColor={ "rgba(0, 0, 0, 0.054)" }
        >
            <View style={ styles.row }>
                <Text style={ styles.text }>{ title }</Text>
            </View>
        </TouchableHighlight>
    );


export default Row;
