// @flow
import React from "react";
import { Text } from "react-native";

type PropsType = { style: Object, children: string };

export const DisplayText = (props: PropsType): React$Element<Text> => {
    const { style, children, ...passThroughProps } = props;
    return (<Text { ...passThroughProps } style={ [style, { fontFamily: "sriracha" }] }>{ children }</Text>);
};
