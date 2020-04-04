// @flow
import React from "react";
import { Text } from "@shoutem/ui";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type PropsType = { tag: string, text: string, onToggle: string => void, drop: Object, style?: Object };

export const TagToggle = ({ tag, drop, text, onToggle, style = {} }: PropsType): React$Element<any> => (
    <TouchableOpacity
        onPress={ () => onToggle(tag) }
        style={ Object.assign({
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white"
        }, style) }>
        <View style={ { width: 200 } }>
            <View style={ {
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center"
            } }>
                <MaterialCommunityIcons
                    name={ (drop.tags || []).includes(tag) ? "circle-slice-8" : "circle-outline" }
                    size={ 30 }/>
                <Text style={ { textAlign: "left", marginLeft: 20 } }>{ text }</Text>
            </View>
        </View>
    </TouchableOpacity>);