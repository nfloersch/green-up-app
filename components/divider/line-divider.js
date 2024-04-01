// @flow
import React from "react";
import { View } from "react-native";
import colors from '@/constants/colors';

type PropsType = { style: Object };

export const LineDivider = (props: PropsType): React$Element<View> => {
    const { style, ...passThroughProps } = props;
    const dividerStyle = {
        ...style,
        borderBottomColor: colors.backgroundLight,
        borderTopWidth: 0,
        borderBottomWidth: 0.5,
        margin: 2,
    }
    return (<View { ...passThroughProps } style={ [dividerStyle] }></View>);
};
