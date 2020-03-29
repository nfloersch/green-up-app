// @flow
import React from "react";
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView
} from "react-native";
import { connect } from "react-redux";
import { defaultStyles } from "../../styles/default-styles";
import * as R from "ramda";
import WatchGeoLocation from "../../components/watch-geo-location";
import { dateIsInCurrentEventWindow } from "../../libs/green-up-day-calucators";
import EnableLocationServices from "../../components/enable-location-services/enable-location-services";
import * as actionCreators from "../../action-creators/map-action-creators";
import { bindActionCreators } from "redux";
import TrashDropForm from "../../components/trash-drop-form";
import User from "../../models/user";
import { removeNulls } from "../../libs/remove-nulls";
import * as constants from "../../styles/constants";
import Coordinates from "../../models/coordinates";
import DisposalSiteSelector from "../../components/disposal-site-selector";

const styles = StyleSheet.create(defaultStyles);

type PropsType = {
    actions: Object,
    currentUser: UserType,
    trashCollectionSites: Array<Object>,
    townInfo: Array<Object>,
    userLocation: Object,
    navigation: Object
};


const TrashDisposalScreen = ({ actions, currentUser, navigation, townInfo, userLocation, trashCollectionSites }: PropsType): React$Element<any> => {

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
            () => !dateIsInCurrentEventWindow(), //   () => !dateIsInCurrentEventWindow(moment(getCurrentGreenUpDay()).subtract(1, "days").toDate()), // Hack to force GU Day window
            () => (
                <DisposalSiteSelector userLocation={ userLocation } townInfo={ townInfo }/>
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
                notes: entry[1].notes,
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

const mapDispatchToProps = (dispatch: Dispatch<Object>
): Object => ({ actions: bindActionCreators(actionCreators, dispatch) });

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(TrashDisposalScreen);

