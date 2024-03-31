// @flow
import React from "react";
import { Text } from "react-native";
import colors from "@/constants/colors";
type PropsType = { style: Object, children: ?string };

export const Subtitle = (props: PropsType): React$Element<Text> => {
    const { style, children, ...passThroughProps } = props;
    const defaultTitle = {
        fontSize: 15,
        lineHeight: 25,
        fontStyle: "normal",
        fontWeight: "normal",
        backgroundColor: colors.transparent,
        fontFamily: "Rubik-Regular",
        textAlign: "center",
        color: colors.white,
    };
    return (<Text { ...passThroughProps } style={ [defaultTitle, style ] }>{ children }</Text>);
};
