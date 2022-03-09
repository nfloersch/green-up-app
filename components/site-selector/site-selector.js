// @flow
import React, { useState } from "react";
import {
    Text,
    View,
    Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MiniMap from "../mini-map";
import { getClosestSite } from "../../libs/geo-helpers";
import ButtonBar from "../button-bar";
import Site from "../site";

type PropsType = {
    onSelect: any => void,
    close: any => void,
    userLocation: ?LocationType,
    sites: ?Array<any>,
    towns: Array<Object>,
    value?: Object
};

export const SiteSelector = ({ sites, towns, userLocation, onSelect, close, value }: PropsType): React$Element<any> => {
    const [selectedSite, setSelectedSite] = useState(value);

    const pins = (sites || []).filter(site => Boolean(site.coordinates)).map(site => ({
        coordinates: site.coordinates,
        title: (towns.find((t: { townId: string }): boolean => t.townId === site.townId) || {}).townName || "",
        id: site.id,
        description: site.name,
        onPress: () => {
            setSelectedSite(site);
        },
        color: "yellow"
    }));

    const town = towns.find((t: { townId: string }): boolean => (t.townId === (selectedSite || {}).townId));
    const headerButtons = [
        {
            text: "Select",
            onClick: () => {
                if (selectedSite) {
                    onSelect(selectedSite);
                }
            }
        },
        { text: "Cancel", onClick: close }
    ];

    return (
        <SafeAreaView>
            <ButtonBar buttonConfigs={ headerButtons }/>
            <View style={ { height: Dimensions.get("window").height - 60 } }>
                <View style={ {
                    backgroundColor: "white",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#EEE",
                    paddingTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    height: 80
                } }>
                    {
                        !selectedSite
                            ? (
                                <View style={ { flex: 1, flexDirection: "row", justifyContent: "center", marginTop: 16 } }>
                                    <Text style={ { fontSize: 20, textAlign: "center" } }>
                                        { "Select A Trash Collection Site" }
                                    </Text>
                                </View>
                            )
                            : (<Site site={ selectedSite } town={ town }/>)
                    }
                </View>
                <MiniMap
                    initialLocation={ {
                        ...((selectedSite || {}).coordinates || getClosestSite(sites, (userLocation || {}).coordinates || {}).site.coordinates),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    } }
                    pinsConfig={ pins }
                    style={ {
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "stretch"
                    } }
                />
            </View>
        </SafeAreaView>
    );
};

export default SiteSelector;
