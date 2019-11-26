// @flow
import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, SafeAreaView } from "react-native";
import MiniMap from "../mini-map";

const myStyles = {
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 1
    },
    labelDark: {
        color: "#333",
        fontSize: 16,
        shadowColor: "#FFF",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
        marginTop: 5
    },
    suggestion: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        borderColor: "#ABABAB",
        borderBottomWidth: 1
    }
};

const styles = StyleSheet.create(myStyles);

type PropsType = {
    label: ?string,
    onSelect: any => void,
    value: ?string,
    sites: ?Array<any>
};

export const SiteSelector = ({ value, sites, onSelect, label }: PropsType): React$Element<any> => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <View style={ { zIndex: 1, marginTop: 10 } }>
            <Text style={ styles.labelDark }>{ label || "Select" }</Text>
            <TouchableOpacity onPrews={ () => {
                setIsModalVisible(true);
            } }>
                <Text>{ value }</Text>
            </TouchableOpacity>
            <Modal
                animationType={ "slide" }
                onRequestClose={ () => {
                    setIsModalVisible(false);
                } }
                transparent={ false }
                visible={ isModalVisible }>
                <SafeAreaView>
                    <TouchableOpacity onPress={ () => {
                        setIsModalVisible(false);
                    } }>
                        <Text>{ "X" }</Text>
                    </TouchableOpacity>
                    <MiniMap/>
                </SafeAreaView>
            </Modal>
        </View>
    );
};

export default SiteSelector;
