// @flow
import React from "react";
import { StyleSheet, ScrollView, View,
Text

} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Caption } from "@shoutem/ui";
import { defaultStyles } from "@/styles/default-styles";
import moment from "moment";
import Address from "@/models/address";
import MiniMap from "../mini-map";
import ButtonBar from "../button-bar/";
import Coordinates from "@/models/coordinates";
import Divider from "../divider";
import { Title, Subtitle } from "../text";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);
type PropsType = {
    site: Object,
    closeModal: () => void,
    towns: Object
};

export const SupplyDistributionSiteDetails = ({ site, closeModal, towns }: PropsType): React$Element<any> => (
    <SafeAreaView style={ styles.container }>
        <ButtonBar buttonConfigs={ [{ text: "CLOSE", onClick: closeModal }] }/>
        <ScrollView style={ styles.scroll }>
            <View style={ { paddingTop: 10 } }>
                <Title>{ site.name }</Title>
                <Divider
                    styleName="section-header"
                    style={ { backgroundColor: "#FFFFFFAA", marginTop: 20 } }
                >
                    <Caption>{ "INFORMATION" }</Caption>
                </Divider>
                <View style={ { padding: 10, backgroundColor: "white" } }>
                    <Subtitle style={{color: 'black'}}>{ (towns[site.townId] || {}).name }</Subtitle>
                    <Text>{ site.notes }</Text>
                    <Text>{ site.start ? moment(site.start).format("MM DD YYYY HH:MM:A") : null }</Text>
                    <Text>{ site.end ? moment(site.end).format("MM DD YYYY HH:MM:A") : null }</Text>
                </View>
                <Divider
                    styleName="section-header"
                    style={ { backgroundColor: "#FFFFFFAA", marginTop: 20 } }
                >
                    <Caption>{ "Location" }</Caption>
                </Divider>
                <View style={ { padding: 10, backgroundColor: "white" } }>
                    <Subtitle style={{ textAlign: 'left', color: '#222'}}>{ Address.toString(site.address) }</Subtitle>
                    {
                        Boolean((site.coordinates || {}).longitude && (site.coordinates || {}).latitude)
                            ? (
                                <MiniMap
                                    initialLocation={ Coordinates.create(site.coordinates) }
                                    pinsConfig={ [{
                                        title: site.name,
                                        description: Address.toString(site.address),
                                        coordinates: site.coordinates
                                    }] }/>
                            )
                            : null
                    }
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
);


