// @flow
import React from "react";
import { SafeAreaView } from "react-native";
import MiniMap from "../mini-map";
import Address from "../../models/address";

type PropsType = {
    onSelect: any => void,
    sites: ?Array<any>
};

export const SiteSelector = ({ sites, onSelect }: PropsType): React$Element<any> => {
    const markers = (sites || []).filter(site => Boolean(site.coordinates)).map(site => ({
        coordinates: site.coordinates,
        title: site.name,
        description: Address.toString(site.address),
        id: site.id
    }));
    return (
        <SafeAreaView>
            <MiniMap
                pins={ [] }
                markers={ markers }
                onPinClick={ onSelect }/>
        </SafeAreaView>

    );
};


export default SiteSelector;
