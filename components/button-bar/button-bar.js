// @flow
import React from "react";
import {
    View,
    StyleSheet, TouchableHighlight, Text
} from "react-native";
import * as constants from "../../styles/constants";

const styles = StyleSheet.create({
    buttonBar: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    buttonBarButton: {
        flexGrow: 1,
        textAlign: "center"
    },
    buttonBarHeader: {
        width: "100%",
        height: 60,
        backgroundColor: constants.colorBackgroundHeader,
        borderBottomWidth: 1,
        borderColor: "black"
    },
    headerButtonText: {
        fontSize: 18,
        color: "#007AFF",
        textAlign: "center"
    },
    headerButton: {
        height: 60,
        paddingTop: 20
    }
});

// Make your config objects look like this:
type ButtonConfigType = { text: string, onClick: (() => any) };

type PropsType = {
    buttonConfigs: Array<ButtonConfigType>
};

export const ButtonBar = ({ buttonConfigs }: PropsType): React$Element<any> => (
    <View style={ [styles.buttonBarHeader, {}] }>
        <View style={ styles.buttonBar }>
            { buttonConfigs.map((config: ButtonConfigType, index: number): React$Element<any> => (
                <TouchableHighlight
                    key={ index }
                    style={ styles.headerButton }
                    onPress={ config.onClick }
                >
                    <Text style={ styles.headerButtonText }>{ config.text }</Text>
                </TouchableHighlight>
            ))
            }
        </View>
    </View>
);


