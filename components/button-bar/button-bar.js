// @flow
import React from "react";
import {
    StyleSheet,
    View,
    Text
} from "react-native";
import * as constants from "@/styles/constants";
import { PrimaryButton } from "@/components/button";

const styles = StyleSheet.create({
    buttons: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: '100%',
        height: '100%',
    },
    buttonBarHeader: {
        width: "100%",
        height: 55,
        backgroundColor: constants.colorBackgroundHeader,
        borderBottomWidth: 1,
        borderColor: "black",
        borderTopWidth: 1,
        borderTopColor: constants.colorBackgroundDark
    }

});

// Make your config objects look like this:
type ButtonConfigType = { text: string, onClick: (() => any) };

type PropsType = {
    buttonConfigs: Array<ButtonConfigType>
};

export const ButtonBar = ({ buttonConfigs }: PropsType): React$Element<any> => (
    <View style={ styles.buttonBarHeader }>
        <View style={ styles.buttons }>
            {
                buttonConfigs.map((config: ButtonConfigType, index: number): React$Element<any> => (
                    <PrimaryButton
                        key={ index }
                        onPress={ config.onClick }
                    >
                        <Text>{ config.text.toUpperCase() }</Text>
                    </PrimaryButton>
                ))
            }
        </View>
    </View>
);


