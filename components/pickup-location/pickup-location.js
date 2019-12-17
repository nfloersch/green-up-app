// @flow
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { defaultStyles } from "../../styles/default-styles";
import Address from "../../models/address";
import { SimpleLineIcons } from "@expo/vector-icons";

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
    townName: { fontSize: 20, color: "#666", width: "100%", marginBottom: 10 }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);

const styles = StyleSheet.create(combinedStyles);

type PropsType = { item: Object, onClick: any => void };

export const PickupLocation = ({ item, onClick }: PropsType): React$Element<any> => (
    <TouchableOpacity onPress={ onClick }>
        <View style={ {
            flex: 1,
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: "#AAA",
            paddingTop: 10,
            paddingBottom: 10
        } }>
            <View style={ {
                flex: 1,
                flexDirection: "column",
                padding: 10,
                justifyContent: "center",
                alignItems: "center"
            } }>
                <View>
                    <Text style={ {
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#111",
                        fontSize: 16,
                        fontFamily: "Rubik-Regular"
                    } }>
                        { item.name || "" }
                    </Text>
                </View>
                <View>
                    <Text style={ {
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#111",
                        fontSize: 12,
                        fontFamily: "Rubik-Regular"
                    } }>
                        { Address.toString(item.address) || "" }
                    </Text>
                </View>
            </View>
            <View>
                <View style={ { flex: 1, justifyContent: "center", marginLeft: 20, marginRight: 10 } }>
                    <SimpleLineIcons
                        name={ "arrow-right" }
                        size={ 20 }
                        color="#333"
                    />
                </View>
            </View>
        </View>
    </TouchableOpacity>
);


