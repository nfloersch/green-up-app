// @flow
import React from "react";
import {
    Image,
    Switch,
    Text,
    View
} from "react-native";

const styles = {
    toggle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#FFF",
        padding: 10
    },
    icon: {
        height: 40,
        width: 40
    },
    label: {
        marginLeft: 3,
        color: "#333",
        fontSize: 18,
        padding: 0,
        width: 200,
        lineHeight: 40,
        backgroundColor: "transparent"
    }
};


type PropsType = {
    icon: any,
    label: string,
    value: boolean,
    onValueChange: any => void
};

export const Toggle = ({ icon, label, value, onValueChange }: PropsType): React$Element<View> => (
    <View style={ styles.toggle }>
        <View style={ { justifyContent: "flex-start", flex: 1, flexDirection: "row", alignItems: "flex-start" } }>
            <Image style={ styles.icon } source={ icon }/>
            <View style={ { flex: 1, justifyContent: "center", alignItems: "flex-start" } }>
                <Text style={ styles.label }>{ label }</Text>
            </View>
        </View>
        <View style={ { flex: 1, justifyContent: "center", alignItems: "flex-end" } }>

            <Switch
                style={ { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] } }
                value={ value }
                onValueChange={ (v: string) => {
                    onValueChange(v);
                } }
            />
        </View>
    </View>
);
