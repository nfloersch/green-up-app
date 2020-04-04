// @flow
import React from "react";
import { Text, View } from "react-native";
import moment from "moment";
import { greenUpWindowStart, greenUpWindowEnd } from "../../libs/green-up-day-calucators";

export const TrashInfo = (): React$Element<any> => (
    <View style={ { backgroundColor: "white", padding: 20, margin: 10 } }>
        <Text style={ { fontSize: 20 } }>
            { "Each town handles trash bags differently. Find the rules for your town" }
        </Text>
        <Text style={ { marginTop: 20, fontSize: 16 } }>
            { `Trash bag tracking starts ${ moment(greenUpWindowStart()).format("dddd MM/DD/YYYY") } and ends ${ moment(greenUpWindowEnd()).format("dddd MM/DD/YYYY") }` }
        </Text>

    </View>
);
