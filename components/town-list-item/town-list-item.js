// @flow
import React from "react";
import { TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Text, View } from "@shoutem/ui";

type PropsType = { town: { townName: string }, onClick: any => void };

export const TownListItem = ({ town, onClick }: PropsType): React$Element<any> => (
        <TouchableOpacity
            onPress={ onClick }
            style={ {
                flex: 1,
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: "#AAA",
                padding: 20,
                justifyContent: "flex-start"
            } }>

            <Text style={ {
                textAlign: "center",
                fontWeight: "bold",
                color: "#111",
                fontSize: 20,
                fontFamily: "Rubik-Regular",
                flexGrow: 1
            } }>
                { town.townName || "" }
            </Text>
            <SimpleLineIcons
                name={ "arrow-right" }
                size={ 20 }
                color="#333"
            />

        </TouchableOpacity>
    )
;

