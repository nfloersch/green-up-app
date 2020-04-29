// @flow
import React, { Fragment } from "react";
import { defaultStyles } from "../../styles/default-styles";
import Address from "../../models/address";
import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import { Subtitle, Text, Title, Divider } from "@shoutem/ui";
import moment from "moment";
import MiniMap from "../mini-map";
import ButtonBar from "../button-bar/";
import Coordinates from "../../models/coordinates";
import TrashCollectionSite from "../../models/trash-collection-site";
import { FontAwesome } from "@expo/vector-icons";

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
            { Boolean(town.notes) &&
            (
                <View style={ { padding: 10, backgroundColor: "white", marginTop: 10 } }>
                    <Text style={ { color: "black" } }>Notes: </Text><Text style={ { color: "black" } }>{ town.notes }</Text>
                </View>
            )
            }
            <View style={ { padding: 10, backgroundColor: "white", marginTop: 10 } }>
                <View style={ { flex: 1, flexDirection: "row" } }>
                    <View style={ { position: "relative", height: 60, width: 60 } }>
                        { !town.allowsRoadside &&
                        <FontAwesome style={ { color: "#AAA", position: "absolute" } } size={ 65 } name={ "ban" }/> }
                        <FontAwesome style={ { color: "#555", position: "absolute", top: 15, left: 12 } } size={ 30 }
                            name={ "road" }/>
                    </View>
                    <View style={ { flexGrow: 1, flexShrink: 1, marginLeft: 5 } }>
                        <View style={ { flex: 1, justifyContent: "center" } }>
                            <Text style={ { fontSize: 19 } }>
                                { town.allowsRoadside ? "You may drop your bags along the roadside." : "Roadside drop-off is not allowed. Please take your trash to the nearest colletion site." }
                            </Text>
                        </View>
                    </View>
                </View>
                { Boolean(town.dropOffInstructions) &&
                (
                    <View style={ { marginTop: 10 } }>
                        <Text>{ town.dropOffInstructions }</Text>
                    </View>)
                }
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
                                    {
                                        Boolean(site.start || site.end) && (
                                            <View style={ { marginTop: 5 } }>
                                                <Text>Hours of Operation </Text>
                                                <Text>{ `${ site.start && moment(site.start).format("MM DD YYYY HH:MM:A") } to ${ site.end && moment(site.end).format("MM DD YYYY HH:MM:A") }` }</Text>
                                            </View>
                                        )
                                    }
                                    {
                                        Boolean(site.notes) && (
                                            <View style={ { marginTop: 5 } }>
                                                <Text>{ site.notes }</Text>
                                            </View>
                                        )
                                    }
                                    <Subtitle style={ { marginTop: 5 } }>{ Address.toString(site.address) }</Subtitle>
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

