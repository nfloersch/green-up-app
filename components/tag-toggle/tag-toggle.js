// @flow
import React from "react";
import { Button, Text } from "@shoutem/ui";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type PropsType = { tag: string, text: string, onToggle: string => void, drop: Object };

export const TagToggle = ({ tag, drop, text, onToggle }: PropsType): React$Element<any> => (
    <Button
        styleName={ "full-width" }
        onPress={ () => onToggle(tag) }>
        <View style={ {
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        } }>
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
        </View>
    </Button>);