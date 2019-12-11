// @flow
import React from "react";
import {
    StyleSheet
} from "react-native";
import * as constants from "../../styles/constants";
import { Button, View, Subtitle } from "@shoutem/ui";

const styles = StyleSheet.create({

    buttonBarHeader: {
        width: "100%",
        height: 55,
        backgroundColor: constants.colorBackgroundHeader,
        borderBottomWidth: 1,
        borderColor: "black"
    }

});

// Make your config objects look like this:
type ButtonConfigType = { text: string, onClick: (() => any) };

type PropsType = {
    buttonConfigs: Array<ButtonConfigType>
};

export const ButtonBar = ({ buttonConfigs }: PropsType): React$Element<any> => (
    <View style={ styles.buttonBarHeader }>
        <View styleName="horizontal flexible">
            {
                buttonConfigs.map((config: ButtonConfigType, index: number): React$Element<any> => (
                    <Button
                        key={ index }
                        styleName="full-width"
                        onPress={ config.onClick }
                    >
                        <Subtitle>{ config.text.toUpperCase() }</Subtitle>
                    </Button>
                ))
            }
        </View>
    </View>
);


