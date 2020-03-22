// @flow
import React, { Fragment } from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";
import { defaultStyles } from "../../styles/default-styles";

const styles = StyleSheet.create(defaultStyles);

type PropsType = {
    townInfo: Object,
    town: string,
    hideOnError: ?boolean
};

export const TownInformation = ({ hideOnError = false, townInfo, town }: PropsType): React$Element<any> => {
    const hasError = typeof townInfo.roadsideDropOffAllowed === "undefined";
    return hideOnError && hasError
        ? (<Fragment/>)
        : (
            <View style={ {
                padding: 5,
                height: 60,
                width: "100%",
                marginTop: 20,
                backgroundColor: "rgba(255,255,255, 0.8)"
            } }>
                { hasError && (
                    <Text style={ styles.statusBarText }>
                        { "Sorry, we have no information on trash drops for your location. " }
                    </Text>
                ) }
                { townInfo.roadsideDropOffAllowed === true && (
                    <Text style={ styles.statusBarText }>
                        <Text>{ `You are in ${ town } and leaving trash bags on the roadside is allowed.` }</Text>
                    </Text>
                ) }
                { townInfo.roadsideDropOffAllowed === false && (
                    <View style={ styles.statusBarText }>
                        <Text>{ `You are in ${ town } and leaving trash bags on the roadside is` }
                            <Text style={ { fontWeight: "bold" } }>
                                { " not" }
                            </Text>
                            <Text>
                                { " allowed. Please take your trash to a designated drop off." }
                            </Text>
                        </Text>
                        { townInfo.dropOffLocations.map((d: Object, i: number): React$Element<Text> => (
                            <Text key={ i }>{ `\n${ d.name }, ${ d.address }` }</Text>
                        )) }
                    </View>) }
            </View>
        );
};