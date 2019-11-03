// @flow
/* eslint-disable no-undefined */
import React from "react";
import { StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { Card, Caption, Subtitle, View } from "@shoutem/ui";
import { defaultStyles } from "../../styles/default-styles";

const myStyles = {
    location: {
        padding: 5,
        width: "100%",
        borderStyle: "solid",
        borderColor: "#BBB",
        borderWidth: 1,
        marginLeft: 2,
        marginRight: 2
    },

    locationName: { fontSize: 24 },
    townName: { fontSize: 20, color: "#666", width: "100%", marginBottom: 10 }
};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type PropsType = { item: Object, onPress: ()=>void };

export const CelebrationLocation = ({ item, onPress }: PropsType): React$Element<any> => (
    <TouchableOpacity
        onPress={ onPress }
        styleName="flexible">
        <Card>
            <ImageBackground
                style={ { width: "100%", height: "75%" } }
                source={ { uri: item.image } }
            />
            <View styleName="content">
                <Subtitle>{ item.name }</Subtitle>
                <Caption>{ item.townName }</Caption>
            </View>
        </Card>
    </TouchableOpacity>
);