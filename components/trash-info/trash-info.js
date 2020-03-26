// @flow
import React from "react";
import { Text, View } from "react-native";
import moment from "moment";
import { getCurrentGreenUpDay } from "../../libs/green-up-day-calucators";

const guStart = moment(getCurrentGreenUpDay()).subtract(1, "days");
const guEnd = moment(getCurrentGreenUpDay()).add(4, "days");

type PropsType = { style?: Object };

export const TrashInfo = (props: PropsType): React$Element<Text> => {
    const { style = {} } = props;
    return (
        <View style={ { backgroundColor: "white", padding: 20, margin: 10 } }>
            <Text style={ [{ marginBottom: 20, fontSize: 16 }, style] }>
                { `Trash bag tracking starts ${ guStart.format("dddd MM/DD/YYYY") } and ends ${ guEnd.format("dddd MM/DD/YYYY") }` }
            </Text>
            <Text style={ [{ fontSize: 16 }, style] }>
                { "Each town handles trash bags differently. Find the rules for your town" }
            </Text>
        </View>
    );
};
