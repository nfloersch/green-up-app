import React from "react";
import { Pressable } from "react-native";
import {buttons} from '@/styles/buttons';

type PropsType = { style: Object };

export const PrimaryButton = (props: PropsType): React$Element<Pressable> => {
    const { style, children, ...passThroughProps } = props;
    const buttonStyle = {
        ...buttons.primaryButton,
        ...style
    }
    return (<Pressable { ...passThroughProps } style={ [buttonStyle] }>{children}</Pressable>);
};

export const SecondaryButton = (props: PropsType): React$Element<Pressable> => {
    const { style, children, ...passThroughProps } = props;
    const buttonStyle = {
        ...buttons.secondaryButton,
        ...style
    }
    return (<Pressable { ...passThroughProps } style={ [buttonStyle] }>{children}</Pressable>);
};
