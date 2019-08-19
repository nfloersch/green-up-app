import React from "react";
import { Text } from "react-native";

type Props = { style: Object }

export const MonoText = (props: Props) => {
    const { style, ...passThroughProps } = props;
    return (<Text {...passThroughProps} style={[style, { fontFamily: "space-mono" }]}/>);
};

