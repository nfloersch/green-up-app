import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { defaultStyles } from "../../styles/default-styles";

const newLineRegex = /\r?\n|\r/g;
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

    town: { marginBottom: 20, borderWidth: 1, borderColor: "#EEE", padding: 5 },
    townName: { fontSize: 24, color: "#666", width: "100%", marginBottom: 10 }
};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type Props = { item: Object };

export class TownItem extends Component<Props> {

    render() {
        const item = this.props.item;
        return (
            <View key={ item.key } style={ styles.infoBlock }>
                <Text style={ styles.townName }>{item.name}</Text>
                <Text style={ [styles.textDark, { fontSize: 16, marginBottom: 5 }] }>
                    {`Road-side trash drops ${item.roadsideDropOffAllowed ? "ARE" : "ARE NOT"} allowed`}
                </Text>
                {
                    item.description
                        ? (
                            <Text style={ [styles.textDark, { fontSize: 14, marginBottom: 5, marginTop: 5 }] }>
                                {item.description}
                            </Text>
                        )
                        : null
                }
                <Text style={ [styles.textDark, { fontSize: 18, marginTop: 5 }] }>
                    {"Supply Pickup Locations"}
                </Text>
                {
                    ((item.pickupLocations || []).length === 0)
                        ? (
                            <View style={ styles.location }>
                                <Text style={ [styles.textDark, { marginBottom: 5, fontSize: 14 }] }>
                                    {"No trash bag pickup locations in this town"}
                                </Text>
                            </View>
                        )
                        : item.pickupLocations.map((loc, i) => (
                            <View key={ i } style={ styles.location }>
                                {Boolean(loc.name) ? (
                                    <Text style={ [styles.textDark, { marginBottom: 5, fontSize: 14 }] }>
                                        {loc.name.replace(newLineRegex, " ").replace(/\s\s/g, " ")}
                                    </Text>) : null}
                                {Boolean(loc.address) ? (
                                    <Text style={ [styles.textDark, { marginBottom: 5, fontSize: 14 }] }>
                                        {loc.address.replace(newLineRegex, " ").replace(/\s\s/g, " ")}
                                    </Text>) : null}
                                {Boolean(loc.notes) ? (
                                    <Text style={ [styles.textDark, { marginBottom: 0, fontSize: 14 }] }>
                                        {loc.notes.replace(newLineRegex, " ").replace(/\s\s/g, " ")}
                                    </Text>) : null}
                            </View>
                        ))
                }
                <Text style={ [styles.textDark, { fontSize: 18, marginTop: 10 }] }>
                    {"Trash Drop-off Locations"}
                </Text>
                {
                    ((item.dropOffLocations || []).length === 0)
                        ? (
                            <View style={ styles.location }>
                                <Text style={ [styles.textDark, { marginBottom: 5, fontSize: 14 }] }>
                                    {"No trash drop-off locations in this town"}
                                </Text>
                            </View>
                        )
                        : item.dropOffLocations.map((loc, i) => (
                            <View key={ i } style={ [styles.location, { borderStyle: "solid" }] }>
                                {Boolean(loc.name) ? (
                                    <Text style={ [styles.textDark, { marginBottom: 5, fontSize: 14 }] }>
                                        {loc.name.replace(newLineRegex, " ").replace(/\s\s/g, " ")}
                                    </Text>) : null}
                                {Boolean(loc.address) ? (
                                    <Text style={ [styles.textDark, { marginBottom: 5, fontSize: 14 }] }>
                                        {loc.address.replace(newLineRegex, " ").replace(/\s\s/g, " ")}
                                    </Text>) : null}
                                {Boolean(loc.notes) ? (
                                    <Text style={ [styles.textDark, { marginBottom: 0, fontSize: 14 }] }>
                                        {loc.notes.replace(newLineRegex, " ").replace(/\s\s/g, " ")}
                                    </Text>) : null}
                            </View>
                        ))
                }
            </View>
        );
    }
}
