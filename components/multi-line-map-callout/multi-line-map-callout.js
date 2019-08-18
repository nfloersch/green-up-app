// @flow
import React from "react";
import { Text, View } from "react-native";
import { MapView } from "expo";

type Props = {
    title: String,
    description: String
}

export const MultiLineMapCallout = ({ title, description }: Props) => (
    <MapView.Callout>
        <View>
            <Text style={ { fontWeight: "bold" } }>{title}</Text>
            <Text style={ { minWidth: 100, maxWidth: 250 } } numberOfLines={ 5 }>{description}</Text>
        </View>
    </MapView.Callout>
);
