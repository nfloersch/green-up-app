// @flow
import React from "react";
import { Text, Linking } from "react-native";

type PropsType = { children: React$Element<any>, href: string, onPress?: any => void };

export const Anchor = (props: PropsType): React$Element<any> => {
    const { children, href, onPress, ...rest } = props;
    const _handlePress = () => {
        Linking.openURL(href);
        if (onPress) {
            onPress();
        }
    };
    return (
        <Text { ...rest } onPress={ _handlePress }>
            { children }
        </Text>
    );
};


