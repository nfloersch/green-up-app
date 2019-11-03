// @flow
/* eslint-disable no-undefined */
import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Card, Caption, Subtitle, Image } from "@shoutem/ui";

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
        <Card key={ item.key }>
            <Image
                styleName="medium-wide"
                source={ { uri: "https://www.vermont.org/wp-content/uploads/2018/08/vermont_in-the-fall.jpg" } }
                resizeMode="contain"
            />
            <View styleName="content">
                <Subtitle>{ item.name }</Subtitle>
                <Caption>{ item.townName }</Caption>
            </View>
        </Card>
    </TouchableOpacity>
);