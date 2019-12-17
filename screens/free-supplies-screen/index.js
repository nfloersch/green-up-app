// @flow
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    SafeAreaView, Modal
} from "react-native";
import { connect } from "react-redux";
import { defaultStyles } from "../../styles/default-styles";
import PickupLocation from "../../components/pickup-location";
import * as R from "ramda";
import WatchGeoLocation from "../../components/watch-geo-location";
import { searchArray } from "../../libs/search";
import SupplyDistributionSite from "../../models/supply-distribution-site";
import * as constants from "../../styles/constants";
import SearchBar from "../../components/search-bar";
import { ListView, View, Subtitle } from "@shoutem/ui";
import SupplyDistributionSiteDetails from "../../components/supply-distribution-site-details";

const myStyles = {
    details: {
        fontWeight: "bold"
    },
    noTeamsFound: {
        flex: 1,
        justifyContent: "center"
    },
    noTeamsFoundWrapper: {
        backgroundColor: "#FFFFFF44",
        width: "100%",
        padding: 20
    },
    noTeamsFoundText: {
        fontSize: 30,
        color: constants.colorTextThemeLight,
        textShadowColor: `${ constants.colorTextThemeDark }`,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 4,
        lineHeight: 36
    },
    teamDetail: {
        color: constants.colorTextThemeLight,
        fontSize: 14
    }
};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

const searchableFields = ["name", "address", "townId"];
type PropsType = {
    pickupSpots: Array<Object>,
    userLocation: Object,
    towns: Object
};

const FreeSupplies = ({ pickupSpots, userLocation, towns }: PropsType): React$Element<any> => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchResults, setSearchResults] = useState(pickupSpots);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSite, setSelectedSite] = useState(null);

    useEffect(() => {
        const spotsFound = searchArray(searchableFields, pickupSpots, searchTerm);
        setSearchResults(spotsFound);
    }, [searchTerm]);

    const hasResults = searchResults.length > 0;

    return (
        <SafeAreaView style={ styles.container }>
            <WatchGeoLocation/>
            <SearchBar searchTerm={ searchTerm } search={ setSearchTerm } userLocation={ userLocation }/>
            <View style={ {
                flex: 1,
                backgroundColor: constants.colorBackgroundLight
            } }>
                { hasResults
                    ? (
                        <ListView
                            data={ searchResults }
                            renderRow={ item => (
                                <PickupLocation
                                    item={ item }
                                    onClick={ () => {
                                        setSelectedSite(item);
                                        setIsModalVisible(true);
                                    } }/>
                            ) }
                        />
                    )
                    : (
                        <View>
                            <Subtitle style={ styles.noTeamsFoundText }>
                                { "Sorry, we couldn't find any matching supply sites." }
                            </Subtitle>
                            <Subtitle style={ { marginTop: 10 } }>
                                { "Try a different search" }
                            </Subtitle>
                        </View>
                    )
                }
            </View>
            <Modal
                animationType={ "slide" }
                onRequestClose={ (): string => ("this function is required. Who knows why?") }
                transparent={ false }
                visible={ isModalVisible }>
                <SupplyDistributionSiteDetails
                    site={ selectedSite }
                    closeModal={ () => {
                        setIsModalVisible(false);
                    } }
                    towns={ towns }/>
            </Modal>
        </SafeAreaView>
    );
};

FreeSupplies.navigationOptions = {
    title: "Bags, Gloves and Stuff",
    headerStyle: {
        backgroundColor: constants.colorBackgroundDark
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        fontFamily: "Rubik-Regular",
        fontWeight: "bold",
        fontSize: 20,
        color: constants.colorHeaderText
    },
    headerBackTitleStyle: {
        fontFamily: "Rubik-Regular",
        fontWeight: "bold",
        fontSize: 20,
        color: constants.colorHeaderText
    }
};

const mapStateToProps = (state: Object): Object => {
    const pickupSpots = R.compose(
        R.map(entry => SupplyDistributionSite.create(entry[1], entry[0])),
        Object.entries
    )(state.supplyDistributionSites.sites);
    return ({
        pickupSpots,
        userLocation: state.userLocation,
        towns: state.towns
    });
};

// $FlowFixMe
export default connect(mapStateToProps)(FreeSupplies);
