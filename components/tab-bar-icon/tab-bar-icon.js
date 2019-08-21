//  @flow
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

export const TabBarIcon = ({ focused, name }: { focused: boolean, name: string }) => (
    <Ionicons
        name={ name }
        size={ 26 }
        style={ { marginBottom: -3 } }
        color={ focused ? colors.tabIconSelected : colors.tabIconDefault }
    />
);