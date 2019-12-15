// @flow
import React, { useState } from "react";
import {
    SafeAreaView,
    Text,
    View,
    Dimensions
} from "react-native";
import MiniMap from "../mini-map";
import { getClosestSite } from "../../libs/geo-helpers";
import ButtonBar from "../button-bar";
import Site from "../site";

type PropsType = {
    onSelect: any => void,
    onCancel: any => void,
    userLocation: ?LocationType,
    sites: ?Array<any>,
    towns: Array<Object>,
    value?: Object
};

export const SiteSelector = ({ sites, towns, userLocation, onSelect, onCancel, value }: PropsType): React$Element<any> => {
    const [selectedSite, setSelectedSite] = useState(value || getClosestSite(sites, ((userLocation || {}).coordinates) || {}).site);

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

    const town = towns.find((t: { townId: string }): boolean => (t.townId === selectedSite.townId));
    const headerButtons = [
        {
            text: "Select",
            onClick: () => {
                onSelect(selectedSite);
            }
        },
        { text: "Cancel", onClick: onCancel }
    ];

    return (
        <SafeAreaView>
            <ButtonBar buttonConfigs={ headerButtons }/>
            <View style={ { height: Dimensions.get("window").height - 60 } }>
                <View style={ { backgroundColor: "green" } }>
                    {
                        !selectedSite
                            ? <Text>"Select A Trash Collection Site"</Text>
                            : <Site
                                site={ selectedSite }
                                town={ town }/>
                    }
                </View>
                <MiniMap
                    initialLocation={ {
                        ...selectedSite.coordinates,
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
