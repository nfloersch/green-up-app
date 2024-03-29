// @flow
import React, { Fragment } from "react";
import { defaultStyles } from "../../styles/default-styles";
import Address from "../../models/address";
import { StyleSheet, ScrollView, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Subtitle, Text, Title } from "@shoutem/ui";
import moment from "moment";
import MiniMap from "../mini-map";
import ButtonBar from "../button-bar/";
import Coordinates from "../../models/coordinates";
import TrashCollectionSite from "../../models/trash-collection-site";
import { FontAwesome } from "@expo/vector-icons";
import * as constants from "../../styles/constants";

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

            <View style={{backgroundColor: "white", height: 30, borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: 20}}>
            <Title
                styleName="sm-gutter-horizontal"
                style={ { color: constants.colorBackgroundDark, textAlign: "center", fontFamily: "Rubik-Bold", marginTop: 5, fontSize: 24} }>
                { town.townName }
            </Title>
            </View>
            {
                // Boolean(town.description) &&
                // (
                //     <View style={ { padding: 10, backgroundColor: "white", marginTop: 5 } }>
                //         <Text style={ { fontSize: 18, fontWeight: "bold", textAlign: "left", color: "black" } }>Description: </Text>
                //         <Text style={ { color: "black", marginLeft: 20 } }>{ town.description }</Text>
                //     </View>
                // )
            }
            { Boolean(town.notes) &&
                (
                    <View style={ { padding: 10, backgroundColor: "white", marginTop: 5 } }>
                        <Text style={ { fontSize: 18, fontWeight: "bold", textAlign: "left", color: "black" } }>Notes: </Text>
                        <Text style={ { color: "black", marginLeft: 20 } }>{ town.notes }</Text>
                    </View>
                )
            }
            { Boolean(town.pickupInstructions) &&
                (
                    <View style={ { padding: 10, backgroundColor: "white", marginTop: 5 } }>
                        <Text style={ { fontSize: 18, fontWeight: "bold", textAlign: "left", color: "black" } }>Pickup Instructions: </Text>
                        <Text style={ { color: "black", marginLeft: 20 } }>{ town.pickupInstructions }</Text>
                    </View>
                )
            }
            <View style={ { padding: 10, backgroundColor: "white", marginTop: 5 } }>
                {
                    town.dropOffInstructions &&
                    (
                        <View style={ { marginTop: 10 } }>
                            <Text style={ { fontSize: 18, fontWeight: "bold", textAlign: "left", color: "black" } }>Drop Off Instructions: </Text>
                            <Text style={ { color: "black", marginLeft: 20 } }>{ town.dropOffInstructions }</Text>
                        </View>
                    )
                }
                <View style={ { flex: 1, flexDirection: "row" } }>
                    <View style={ { position: "relative", height: 60, width: 60 } }>
                        {
                            !(town.allowsRoadside) &&
                            <FontAwesome style={ { color: "#AAA", position: "absolute" } } size={ 65 } name={ "ban" }/>
                        }
                        <FontAwesome style={ { color: "#555", position: "absolute", top: 15, left: 12 } } size={ 30 } name={ "road" }/>
                    </View>
                    <View style={ { flexGrow: 1, flexShrink: 1, marginLeft: 5 } }>
                        <View style={ { flex: 1} }>
                            <Text style={ { fontSize: 19 } }>
                                {
                                    town.allowsRoadside ? "You may drop your bags along the roadside." : "Roadside drop-off is not allowed. Please take your trash to the nearest collection site."
                                }
                            </Text>
                        </View>
                    </View>
                </View>

            </View>

            {
                (town.collectionSites || []).length > 0
                    ? (
                        <Fragment>
                            <View style={ { padding: 10, backgroundColor: "white", marginTop: 5 } }>
                                <Text style={{marginLeft: "auto", marginRight: "auto", width: 300, textAlign: "center", fontFamily: "Rubik-Bold", marginTop: 5, fontSize: 18}}>{ "Please drop trash off at one of the following locations:" }</Text>
                            </View>
                            { (town.collectionSites || []).map(site => (
                                <View key={ site.id } style={ { padding: 10, backgroundColor: "white", marginTop: 5 } }>
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
            { Boolean(town.updated) &&
                (
                    <View style={ { padding: 10, backgroundColor: "white", marginTop: 5, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 } }>
                        <Text style={ { fontSize: 12, fontWeight: "bold", textAlign: "left", color: "black", textAlign: "center" } }>Last Updated: <Text style={ { color: "black", fontSize: 12 } }>{ town.updated }</Text></Text>

                    </View>
                )
            }
        </ScrollView>
        <ButtonBar buttonConfigs={ [{ text: "CLOSE", onClick: closeModal }] }/>
    </SafeAreaView>);

