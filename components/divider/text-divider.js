// @flow
import React from "react";
import { View } from "react-native";
import colors from '@/constants/colors';

type PropsType = { style: Object };

export const TextDivider = (props: PropsType): React$Element<View> => {
    const { style, ...passThroughProps } = props;
    const dividerStyle = {
        border: 0,
        margin: 0,
        padding: 10,
        marginTop: 20,
        marginBottom: 0,
    }
    return (<View { ...passThroughProps } style={ [dividerStyle, style] }></View>);
};
