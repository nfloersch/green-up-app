// @flow
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { defaultStyles } from "../../styles/default-styles";

const myStyles = {
    location: {
        padding: 5,
        width: "100%",
        borderStyle: "solid",
        borderColor: "#BBB",
        borderWidth: 1,
        marginLeft: 2,
        marginRight: 2
    },

    locationName: { fontSize: 24 },
    allowsRoadside: { fontSize: 20, color: "black", marginBottom: 5 },
    townName: { fontSize: 20, color: "#666", width: "100%", marginBottom: 10 }
};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type PropsType = { item: Object };

export const DisposalSite = ({ item }: PropsType): React$Element<any> => (
    <View key={ item.key } style={ styles.infoBlock }>
        <Text style={ styles.locationName }>{ item.name }</Text>
        <Text style={ styles.townName }>{ item.townName }</Text>

        {
            item.address
                ? (
                    <Text style={ [styles.textDark, { fontSize: 14, marginBottom: 5, marginTop: 5 }] }>
                        { item.address }
                    </Text>
                )
                : null
        }
        <Text style={ styles.allowsRoadside }>{ item.allowsRoadside }</Text>
        {
            item.notes
                ? (
                    <Text style={ [styles.textDark, { fontSize: 14, marginBottom: 5, marginTop: 5 }] }>
                        { item.notes }
                    </Text>
                )
                : null
        }

    </View>
);