// @flow
// A higher order component for adding geo-location functionality
import React, { Fragment, useEffect, useState } from "react";
import * as turf from "@turf/helpers";
import booleanWithin from "@turf/boolean-within";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import * as actionCreators from "../../action-creators/user-location-action-creators";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

type MapLocationType = {
    coords: {|
        latitude: number,
        longitude: number,
        altitude: number,
        accuracy: number,
        heading: number,
        speed: number,

        // iOS Only
        altitudeAccuracy?: number
    |}
};

type UserLocationType = { coordinates: LocationType, townId: string, lastUpdated: Date, error: string };

type PropsType = { children: React$Element<any>, actions: Object, userLocation: UserLocationType };

const _WatchGeoLocation = ({ children, actions }: PropsType): React$Element<any> => {
    const [removeListener, setRemoveListener] = useState(() => {
    });

    const getTown = (myLocation: MapLocationType): string => {
        const townPolygonsData = require("../../libs/VT_Boundaries__town_polygons.json");
        const currentLocation = turf.point([myLocation.coords.longitude, myLocation.coords.latitude]);
        const town = townPolygonsData.features
            .find((f: Object): boolean => {
                const feature = turf.feature(f.geometry);
                return booleanWithin(currentLocation, feature);
            });
        return town ? town.properties.TOWNNAME : "";
    };

    const getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === "granted") {
            const locationProviderStatus = await Location.getProviderStatusAsync();
            if (locationProviderStatus.locationServicesEnabled === false) {
                actions.userLocationError("Access to the device location is required. Please make sure you have location services on and you grant access when requested.");
            } else {
                const myLocation: MapLocationType = await Location.getCurrentPositionAsync({});
                const newLocation = { coordinates: myLocation.coords, townId: getTown(myLocation) };
                actions.userLocationUpdate(newLocation);
                const removeMePromise = Location.watchPositionAsync({
                    timeInterval: 3000,
                    distanceInterval: 20
                }, (loc: Object) => {
                    const newNewLocation = { coordinates: loc.coords, townId: getTown(loc) };
                    actions.userLocationUpdate(newNewLocation);
                });
                removeMePromise.then(obj => {
                    setRemoveListener(obj.remove);
                });
            }
        } else {
            actions.userLocationError("Access to the device location is required. Please make sure you have location services on and you grant access when requested.");
        }
    };

    useEffect(() => {
        getLocationAsync();
    }, []);

    useEffect((): any => removeListener, [removeListener]);

    return <Fragment>{ children }</Fragment>;
};

const mapStateToProps = (state: Object): Object => ({ userLocation: state.userLocation });


const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({ actions: bindActionCreators(actionCreators, dispatch) });

export const WatchGeoLocation = connect(mapStateToProps, mapDispatchToProps)(_WatchGeoLocation);