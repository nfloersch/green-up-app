//  @flow
import React from "react";
import { Icon } from "expo";
import colors from "../../constants/colors";

export const TabBarIcon = ({ focused, name }: { focused: boolean, name: string }) => (
    <Icon.Ionicons
        name={ name }
        size={ 26 }
        style={ { marginBottom: -3 } }
        color={ focused ? colors.tabIconSelected : colors.tabIconDefault }
    />
);