// @flow
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { defaultStyles } from "../../styles/default-styles";
import Address from "../../models/address";

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
        <Text style={ styles.townName }>{ item.townName }</Text>
        <Text style={ styles.town }>
            {
                item.allowsRoadside
                    ? `${ item.townName } allows trash bags to be dropped along the road side`
                    : `${ item.townName } does NOT allow trash bags along the road. Please take your bags the nearest collection site`
            }
        </Text>
        <Text style={ styles.townName }>{ item.dropOffInstructions }</Text>


        <View>

            {
                item.collectionSites.map(site => (
                    <View>
                        <Text
                            style={ [styles.textDark, { fontSize: 14, marginBottom: 5, marginTop: 5 }] }>
                            { Address.toString(site.name) }
                        </Text>
                        <Text
                            style={ [styles.textDark, { fontSize: 14, marginBottom: 5, marginTop: 5 }] }>
                            { Address.toString(site.address) }
                        </Text>
                        <Text
                            style={ [styles.textDark, { fontSize: 14, marginBottom: 5, marginTop: 5 }] }>
                            { site.notes }
                        </Text>
                    </View>
                ))
            }
        </View>
            }
    </View>
);