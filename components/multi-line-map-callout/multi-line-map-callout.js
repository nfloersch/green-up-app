// @flow
import React from "react";
import { Text, View } from "react-native";
import MapView, { Callout } from 'react-native-maps';

type PropsType = {
    title: string,
    description: string,
    onPress?: any => void
};

export const MultiLineMapCallout = ({ title, description, onPress }: PropsType): React$Element<MapView.Callout> => (
    <Callout onPress={ onPress }>
        <View style={ { padding: 1 } }>
            <Text style={ { fontWeight: "bold", textAlign: "center" } }>{ title }</Text>
            <Text style={ { minWidth: 100, maxWidth: 250 } } numberOfLines={ 5 }>{ description }</Text>
        </View>
    </Callout>
);