// @flow
import React from "react";

import { Text, Linking } from "react-native";

type Props = { children: React.Node, href: string, onPress?: any => void };

const Anchor = (props: Props) => {
    const { children, href, onPress, ...rest } = props;
    const _handlePress = () => {
        Linking.openURL(href);
        if (onPress) {
            onPress();
        }
    };
    return (
        <Text { ...rest } onPress={ _handlePress }>
            {children}
        </Text>
    );
};

export default Anchor;

