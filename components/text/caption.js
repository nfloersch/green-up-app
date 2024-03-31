// @flow
import React from "react";
import { Text as RNText } from "react-native";
import colors from "@/constants/colors";
type PropsType = { style: Object, children: ?string };

export const Caption = (props: PropsType): React$Element<Text> => {
    const { style, children, ...passThroughProps } = props;
    const defaultTitle = {
        fontSize: 12,
        lineHeight: 25,
        fontStyle: "normal",
        fontWeight: "normal",
        letterSpacing: 0.5,
        backgroundColor: colors.transparent,
        fontFamily: "Rubik-Regular",
        textAlign: "left",
        color: colors.inputText,
    };
    return (<RNText { ...passThroughProps } style={ [defaultTitle, style ] }>{ children }</RNText>);
};
