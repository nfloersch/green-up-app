// @flow
import React from "react";
import { Text, View } from "react-native";
import MapView from "react-native-maps";

type PropsType = {
    title: string,
    description: string
};

export const MultiLineMapCallout = ({ title, description }: PropsType): React$Element<MapView.Callout> => (
    <MapView.Callout>
        <View>
            <Text style={ { fontWeight: "bold" } }>{ title }</Text>
            <Text style={ { minWidth: 100, maxWidth: 250 } } numberOfLines={ 5 }>{ description }</Text>
        </View>
    </MapView.Callout>
);
