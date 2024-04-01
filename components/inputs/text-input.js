import React from "react";
import { TextInput as RNTextInput } from "react-native";
import { controls } from '@/styles/controls';
import colors from '@/constants/colors';

type PropsType = { style: Object };

export const TextInput = (props: PropsType): React$Element<RNTextInput> => {
    const { style, children, ...passThroughProps } = props;
    const inputStyle = {
        ...controls.textInput,
        ...style
    }
    return (<RNTextInput { ...passThroughProps } placeholderTextColor={colors.placeholderText} style={ [inputStyle] }>{children}</RNTextInput>);
};
