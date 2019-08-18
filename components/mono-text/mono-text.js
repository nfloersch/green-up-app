import React from "react";
import { Text } from "react-native";

type Props = { style: Object, children: string }

export const MonoText = (props: Props) => {
    const { style, children, ...passThroughProps } = props;
    return (<Text { ...passThroughProps } style={ [style, { fontFamily: "space-mono" }] }>{children}</Text>);
};
