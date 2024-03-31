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
        textTransform: "uppercase",
        letterSpacing: 0.5,
        backgroundColor: colors.transparent,
        fontFamily: "Rubik-Regular",
        textAlign: "left",
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 0,
        marginTop: 0,
        color: colors.inputText,
    };
    return (<RNText { ...passThroughProps } style={ [defaultTitle, style ] }>{ children }</RNText>);
};
