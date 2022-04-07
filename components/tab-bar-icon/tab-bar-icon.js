//  @flow
import React from "react";
//import { Ionicons } from "@expo/vector-icons";
import Ionicons from '@expo/vector-icons/Ionicons';

import colors from "../../constants/colors";

export const TabBarIcon = ({ focused, name }: { focused: boolean, name: string }): React$Element<Ionicons> => (
    <Ionicons
        name={ name }
        size={ 26 }
        style={ { marginBottom: -3 } }
        color={ focused ? colors.tabIconSelected : colors.tabIconDefault }
    />
);