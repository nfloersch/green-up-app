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
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "#55683A" // styleConstants.backgroundDark
    },
    buttonImage: { width: "100%", height: "100%" },
    homeButtonBanner: {
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "#FFFFFFCC",
        width: "100%",
        textAlign: "center"
    },
    homeButtonText: {
        padding: 2,
        color: "#55683A",
        fontSize: 22,
        textAlign: "center",
        fontWeight: "bold",
        textShadowColor: "#FFF",
        textShadowOffset: { width: -1, height: -1 },
        textShadowRadius: 3
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
        <View stle={ { borderStyle: "solid", borderWidth: 1, borderColor: "black" } }>
            <Image
                style={ { height: "100%", width: "100%" } }
                capInsets={ { left: 5, right: 5, bottom: 5, top: 5 } }
                source={ backgroundImage }
            />
            <View style={ styles.homeButtonBanner }>
                <DisplayText style={ styles.homeButtonText }>{ label }</DisplayText>
            </View>
        </View>
    </TouchableHighlight>
);