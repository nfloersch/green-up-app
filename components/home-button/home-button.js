import React from "react";
import {
    StyleSheet,
    ImageBackground,
    Text,
    TouchableHighlight
} from "react-native";

const styles = StyleSheet.create({
    homeButton: { width: "50%", aspectRatio: 1 },
    buttonImage: { width: "100%", height: "100%" },
    homeButtonText: {
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "#FA774EAA",
        width: "100%",
        padding: 2,
        color: "#FFF",
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
        <ImageBackground
            style={ styles.buttonImage }
            source={ backgroundImage }
        >
            <Text style={ styles.homeButtonText }>{ label }</Text>
        </ImageBackground>
    </TouchableHighlight>
);