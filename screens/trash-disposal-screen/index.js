// @flow
import React, { useState, useEffect, Fragment } from "react";
import { StyleSheet, View, FlatList, TextInput, TouchableHighlight, Platform, Text, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { defaultStyles } from "../../styles/default-styles";
import * as R from "ramda";
import WatchGeoLocation from "../../components/watch-geo-location";
import { Ionicons } from "@expo/vector-icons";
import { searchArray } from "../../libs/search";
import { DisposalSite } from "../../components/disposal-site/disposal-site";
import moment from "moment";
import { dateIsInCurrentEventWindow, getCurrentGreenUpDay } from "../../libs/green-up-day-calucators";
import EnableLocationServices from "../../components/enable-location-services/enable-location-services";
import * as actionCreators from "../../action-creators/map-action-creators";
import { bindActionCreators } from "redux";
import TrashDropForm from "../../components/trash-drop-form";
import User from "../../models/user";
import { removeNulls } from "../../libs/remove-nulls";
import * as constants from "../../styles/constants";
import Coordinates from "../../models/coordinates";

const styles = StyleSheet.create(defaultStyles);
const iconStyle = {
    height: 40,
    width: 40,
    padding: 2,
    color: "white",
    textAlign: "center"
};
const searchableFields = ["name", "townName", "address", "townId"];
type PropsType = {
    actions: Object,
    currentUser: UserType,
    trashCollectionSites: Array<Object>,
    townInfo: Array<Object>,
    userLocation: Object,
    navigation: Object
};


const TrashDisposalScreen = ({ actions, currentUser, navigation, townInfo, userLocation, trashCollectionSites }: PropsType): React$Element<any> => {

    const [searchResults, setSearchResults] = useState(townInfo);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const spotsFound = searchArray(searchableFields, townInfo, searchTerm);
        setSearchResults(spotsFound);
    }, [searchTerm]);


    const guStart = moment(getCurrentGreenUpDay()).subtract(1, "days");
    const guEnd = moment(getCurrentGreenUpDay()).add(4, "days");

    const initialMapLocation = userLocation
        ? Coordinates.create(userLocation.coordinates)
        : null;

    const contents = R.cond([
        [
            () => Boolean(userLocation.error),
            () => (<EnableLocationServices errorMessage={ userLocation.error }/>)
        ],
        [
            () => !Boolean(initialMapLocation),
            () => (
                <View style={ [styles.frame, { display: "flex", justifyContent: "center" }] }>
                    <Text style={ { fontSize: 20, color: "white", textAlign: "center" } }>
                        { "...Locating You" }
                    </Text>
                </View>)
        ],
        [
            () => !dateIsInCurrentEventWindow(guStart.toDate()),
            () => (
                <Fragment>
                    <View style={ { margin: 2 } }>
                        <Text style={ { textAlign: "center" } }>
                            { `Record your trash bags for your team from ${ guStart.format("dddd MM/DD/YYYY") } until ${ guEnd.format("dddd MM/DD/YYYY") }` }
                        </Text>
                    </View>
                    <View style={ { margin: 2 } }>
                        <Text>{ "Each town handles trash bags differently.  Find the rules for your town" }</Text>
                    </View>
                    <View style={ { margin: 10, padding: 0, marginBottom: 2, height: 40 } }>
                        <View style={ { flex: 1, flexDirection: "row", justifyContent: "flex-start" } }>
                            <View style={ { flex: 1, flexDirection: "column" } }>
                                <TextInput
                                    keyBoardType={ "default" }
                                    onChangeText={ setSearchTerm }
                                    placeholder={ "Search" }
                                    style={ [styles.textInput, { alignSelf: "stretch" }] }
                                    value={ searchTerm }
                                    underlineColorAndroid={ "transparent" }
                                />
                            </View>
                            <TouchableHighlight
                                onPress={ () => {
                                    setSearchTerm("");
                                } }
                                style={ { height: 40, width: 40, padding: 1, marginLeft: 2 } }>
                                <Ionicons
                                    name={ Platform.OS === "ios" ? "ios-close-circle-outline" : "md-close-circle-outline" }
                                    size={ 36 }
                                    style={ iconStyle }/>
                            </TouchableHighlight>
                            <TouchableHighlight
                                onPress={ () => {
                                    setSearchTerm(userLocation.townId || "");
                                } }
                                style={ { height: 40, width: 40, padding: 1, marginLeft: 2 } }>
                                <Ionicons
                                    name={ Platform.OS === "ios" ? "md-locate" : "md-locate" }
                                    size={ 36 }
                                    style={ iconStyle }/>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={ {
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "stretch"
                    } }>
                        <FlatList
                            style={ styles.infoBlockContainer }
                            data={ searchTerm ? searchResults : townInfo }
                            keyExtractor={ (item: Object): string => `${ item.id }` }
                            renderItem={ ({ item }: { item: Object }): React$Element<any> => (
                                <DisposalSite item={ item }/>
                            ) }/>
                    </View>
                </Fragment>
            )
        ],
        [
            R.T,
            () => (
                <TrashDropForm
                    currentUser={ currentUser }
                    location={ userLocation }
                    onSave={ (drop) => {
                        actions.dropTrash(drop);
                        navigation.goBack();
                    } }
                    townData={ townInfo }
                    trashCollectionSites={ trashCollectionSites }
                    userLocation={ userLocation }
                />)
        ]
    ])();

    return (
        <SafeAreaView style={ styles.container }>
            <WatchGeoLocation/>
            { contents }
        </SafeAreaView>
    );
};

TrashDisposalScreen.navigationOptions = {
    title: "Trash Disposal",
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
    const trashCollectionSites = Object.values(state.trashCollectionSites.sites).filter((site: Object) => {
        const hasLatitude = typeof (site.coordinates || {}).latitude === "number";
        const hasLongitude = typeof (site.coordinates || {}).longitude === "number";
        return hasLatitude && hasLongitude;
    });

    const townInfo = R.compose(
        R.map((entry): Object => (
            {
                townId: entry[0],
                townName: entry[1].name,
                dropOffInstructions: entry[1].dropOffInstructions,
                allowsRoadside: entry[1].roadsideDropOffAllowed,
                collectionSites: trashCollectionSites.filter((site: Object) => site.townId === entry[0])
            })),
        Object.entries
    )(state.towns.townData);
    const currentUser = User.create({ ...state.login.user, ...removeNulls(state.profile) });
    return (
        {
            currentUser,
            townInfo,
            userLocation: state.userLocation,
            trashCollectionSites
        });
};

const mapDispatchToProps = (dispatch: Dispatch<
Object>
): Object => ({ actions: bindActionCreators(actionCreators, dispatch) });

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(TrashDisposalScreen);

