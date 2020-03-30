// @flow
import React from "react";
import { Text, View } from "react-native";

type PropsType = {
    greenUpStartDate: string,
    greenUpEndDate: string
};

export const TrashInfo = ({ greenUpStartDate, greenUpEndDate }: PropsType): React$Element<any> => (
    <View style={ { backgroundColor: "white", padding: 20, margin: 10 } }>
        <Text style={ { fontSize: 20 } }>
            { "Each town handles trash bags differently. Find the rules for your town" }
        </Text>
        <Text style={ { marginTop: 20, fontSize: 16 } }>
            { `Trash bag tracking starts ${ greenUpStartDate } and ends ${ greenUpEndDate }` }
        </Text>

    </View>
);