// @flow
import React from "react";
import { Text as RNText } from "react-native";
import colors from "@/constants/colors";
type PropsType = { style: Object, children: ?string };

export const Text = (props: PropsType): React$Element<Text> => {
    const { style, children, ...passThroughProps } = props;
    const defaultTitle = {
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: "normal",
        backgroundColor: colors.transparent,
        fontFamily: "Rubik-Regular",
        textAlign: "left",
        color: colors.textDark,
    };
    return (<RNText { ...passThroughProps } style={ [defaultTitle, style ] }>{ children }</RNText>);
};
