import React from "react";
import {
    View,
    StyleSheet,
    Image,
    TouchableHighlight
} from "react-native";
import DisplayText from "../display-text";

const styles = StyleSheet.create({
    homeButton: {
        width: "50%",
        aspectRatio: 1,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#888" // styleConstants.backgroundDark
    },
    buttonImage: { width: "100%", height: "100%" },
    homeButtonText: {
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "#55683ADD",
        width: "100%",
        padding: 2,
        color: "#DDD",
        fontSize: 20,
        textAlign: "center"
    }
});

type PropsType = {
    label: string,
    onPress: any => void,
    backgroundImage: any,
    id?: string
};

export const HomeButton = ({ label, backgroundImage, onPress, id }: PropsType) => (
    <TouchableHighlight
        id={ id }
        style={ styles.homeButton }
        onPress={ onPress }
    >
        <View style={ { borderWidth: 2, borderColor: "#FFF" } }>
            <Image
                style={ { height: "100%", width: "100%" } }
                capInsets={ { left: 5, right: 5, bottom: 5, top: 5 } }
                source={ backgroundImage }
            />
            <DisplayText style={ styles.homeButtonText }>{ label }</DisplayText>
        </View>
    </TouchableHighlight>
);