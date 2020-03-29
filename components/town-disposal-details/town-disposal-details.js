// @flow
import React, { Fragment } from "react";
import { defaultStyles } from "../../styles/default-styles";
import Address from "../../models/address";
import { StyleSheet, ScrollView, View, SafeAreaView, Platform } from "react-native";
import { Subtitle, Text, Title, Divider } from "@shoutem/ui";
import moment from "moment";
import MiniMap from "../mini-map";
import ButtonBar from "../button-bar/";
import Coordinates from "../../models/coordinates";
import TrashCollectionSite from "../../models/trash-collection-site";
import { Ionicons } from "@expo/vector-icons";

const myStyles = {
    location: {
        padding: 5,
        width: "100%",
        borderStyle: "solid",
        borderColor: "#BBB",
        borderWidth: 1,
        marginLeft: 2,
        marginRight: 2
    },

    locationName: { fontSize: 24 },
    allowsRoadside: { fontSize: 20, color: "black", marginBottom: 5 },
    townName: { fontSize: 20, color: "#666", width: "100%", marginBottom: 10 }
};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);


type PropsType = {
    town: {
        townName: ?string,
        notes: ?string,
        allowsRoadside: boolean,
        townId: string,
        dropOffInstructions: ?string,
        collectionSites: TrashCollectionSite[]
    },
    closeModal: () => void
};

export const TownDisposalDetails = ({ town, closeModal }: PropsType): React$Element<any> => (
    <SafeAreaView style={ styles.container }>
        <ButtonBar buttonConfigs={ [{ text: "CLOSE", onClick: closeModal }] }/>
        <ScrollView style={ styles.scroll }>
            <Title
                styleName="sm-gutter-horizontal"
                style={ { color: "white", textAlign: "center", marginTop: 20 } }>
                { town.townName }
            </Title>
            { town.notes && (
                <View style={ { padding: 10, backgroundColor: "white", marginTop: 10 } }>
                    <Text style={ { color: "black" } }>{ town.notes }</Text>
                </View>
            )
            }
            <View style={ { padding: 10, backgroundColor: "white", marginTop: 10 } }>
                <View style={ { flex: 1, flexDirection: "row" } }>
                    <Ionicons
                        style={ { color: "#AAA" } }
                        name={ town.allowsRoadside ? (Platform.OS === "ios" ? "ios-thumbs-up" : "md-thumbs-up") : (Platform.OS === "ios" ? "ios-thumbs-down" : "md-thumbs-down") }
                        size={ 40 }/>
                    <View style={ { flexGrow: 1, marginLeft: 20 } }>
                        <View style={ { flex: 1, justifyContent: "center" } }>
                            <Text
                                style={ { fontSize: 18 } }>{ `Roadside drop-off ${ town.allowsRoadside ? "IS" : "IS NOT" } allowed` }
                            </Text>
                        </View>
                    </View>
                </View>
                { town.dropOffInstructions && (
                    <View style={ { marginTop: 10 } }>
                        <Text>{ town.dropOffInstructions }</Text>
                    </View>) }
            </View>
            {
                (town.collectionSites || []).length > 0
                    ? (
                        <Fragment>
                            <Divider style={ {
                                backgroundColor: "#888",
                                marginTop: 10,
                                height: 2,
                                borderColor: "#AAA",
                                borderTopWidth: 1,
                                borderStyle: "solid",
                                padding: 0
                            } }/>
                            <View style={ { padding: 10, backgroundColor: "white", marginTop: 10 } }>
                                <Text>{ "Please drop trash off at one of the following locations:" }</Text>
                            </View>
                            { (town.collectionSites || []).map(site => (
                                <View key={ site.id } style={ { padding: 10, backgroundColor: "white", marginTop: 10 } }>
                                    <Subtitle>{ site.name }</Subtitle>
                                    <Text>{ site.start ? moment(site.start).format("MM DD YYYY HH:MM:A") : null }</Text>
                                    <Text>{ site.end ? moment(site.end).format("MM DD YYYY HH:MM:A") : null }</Text>
                                    <Text>{ site.notes }</Text>
                                    <Subtitle>{ Address.toString(site.address) }</Subtitle>
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
                            )) }
                        </Fragment>
                    )
                    : null
            }
        </ScrollView>
    </SafeAreaView>);

