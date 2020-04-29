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
        flexBasis: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#000",
        alignItems: "center",
        paddingLeft: 5,
        borderRadius: 40,
        marginTop: 10
    },
    icon: {
        height: 40,
        width: 40
    },
    label: {
        marginLeft: 3,
        color: "#333",
        fontSize: 18,
        paddingTop: 0,
        
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
        <View style={ { justifyContent: "flex-start", flex: 1, flexDirection: "row", alignItems: "center", borderWidth: 0, borderColor: "#F00" } }>
            <View style={ { justifyContent: "center", alignContent: "center", flexBasis: 50, flexGrow: 0, alignItems: "center", borderWidth: 0, borderColor: "#0F0"  } }>
                <Image style={ styles.icon } source={ icon }/>
            </View>
            <View style={ { flex: 1, justifyContent: "center", alignItems: "flex-start", borderWidth: 0, borderColor: "#00F"  } }>
                <Text style={ styles.label }>{ label }</Text>
            </View>
        </View>
        <View style={ { flexBasis: 60, justifyContent: "center", alignItems: "flex-end", borderWidth: 0, borderColor: "#000" } }>
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
