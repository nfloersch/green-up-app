// @flow
import React, { useEffect, useState } from "react";
import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    View
} from "react-native";
import { defaultStyles } from "../../styles/default-styles";
import Constants from "expo-constants";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";
import MultiLineMapCallout from "../../components/multi-line-map-callout";
import type Coordinates from "../../models/coordinates";
import {bbox, centroid} from "@turf/distance";

const myStyles = {
    selected: {
        opacity: 0.5
    },
    miniMap: {
        flexGrow: 1,
        backgroundColor: "red"
    }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);

const styles = StyleSheet.create(combinedStyles);

const getLocationAsync = (): Promise<any> => Permissions.askAsync(Permissions.LOCATION)
    .then((locationPermission: Object): Object => {
        if (locationPermission.status !== "granted") {
            throw new Error("Allow access to location for a more accurate map");
        }
        return Location.getCurrentPositionAsync({});
    })
    .then((location: Object): Object => {
        if (location) {
            return {
                latitude: Number(location.coords.latitude),
                longitude: Number(location.coords.longitude)
            };
        }
        throw new Error("Location is not available");
    });


type PropsType = {
    initialLocation?: Coordinates,
    onMapClick?: Object => void,
    pinsConfig: ?Array<Object>,
    layers?: Array<Object>,
    style?: Object,
    refKey: any
};

export const MiniMap = ({ initialLocation, onMapClick, pinsConfig = [], style, refKey }: PropsType): React$Element<any> => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [initialMapLocation, setInitialMapLocation] = useState(initialLocation);
    const [mapReady, setMapReady] = useState(false);
    
    useEffect(() => {
        if (!initialMapLocation) {
            if (Platform.OS === "android" && !Constants.isDevice && false) {
                setErrorMessage("Oops, MiniMap will not work on Sketch or an Android emulator. Try it again on your device!");
            } 
            else {
                getLocationAsync()
                .then(
                    (location: Object) => {
                        
                            //var allMarkers = pinsConfig.push({latitude: location.latitude, longitude: location.longitude});
                            // var initBBpoly = bbox(allMarkers);
                            // var initBBcentroid = centroid(initBBpoly);

                            setInitialMapLocation(
                                {
                                    latitude: Number(location.latitude),
                                    longitude: Number(location.longitude),
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421
                                }
                            );
                        
                        
                    }                        
                )
                .catch(
                    (e: Error) => {
                            // Fail gracefully and set initial location to the Vermont Green Up HQ in Montpelier
                            setInitialMapLocation({
                                latitude: 44.263278,
                                longitude: -72.6534249,
                                latitudeDelta: 0.1,
                                longitudeDelta: 0.1
                            });
                            console.log("Error: " + e);
                            Alert.alert(e);
                        
                    }
                );
            }
        }
    }, [mapReady]);
       
    const placePins = (pins: Array<Object> = []): Array<React$Element<any>> => (
        mapReady?
            (pins || []).map(
                (pin: Object, index: number): React$Element<any> => (
                    <MapView.Marker
                        coordinate={ pin.coordinates }
                        key={ `pin${ index }` }
                        pinColor={ pin.color || "red" }
                        stopPropagation={ true }
                        onPress={ () => {
                            if (pin.onPress) {
                                pin.onPress(index);
                            }
                        } }>
                        {
                            pin.callout ||
                            <MultiLineMapCallout
                                onPress={ () => {
                                    if (pin.onCalloutPress) {
                                        pin.onCalloutPress(index);
                                    }
                                } }
                                title={ pin.title }
                                description={ typeof pin.description === "string" ? pin.description : "" }
                            />
                        }
                    </MapView.Marker>
                )
            ).concat(initialMapLocation
                ? [
                    <MapView.Marker
                        key="userLocation"
                        coordinate={ { latitude: (initialMapLocation.latitude || 0.0), longitude: (initialMapLocation.longitude || 0.0) } }
                        pinColor={ "blue" }/>
                ]
                : []
            )
        : []
    );

    const handleMapClick = (e: SyntheticEvent<any, any>) => {
            if (onMapClick) {
                onMapClick(e.nativeEvent.coordinate);
                placePins(pinsConfig);
            }

    };
    return !errorMessage
        ? (
            <MapView
                onMapReady={ 
                    () => {
                        setMapReady(true);
                    }
                }
                style={ { minHeight: 100, minWidth: 100, height: 300, width: "100%", ...(style || {}) } }
                initialRegion={ initialMapLocation }
                onPress={ handleMapClick }
                pitchEnabled={false}
                refKey={refKey}>
                { 
                    placePins(pinsConfig) 
                }
            </MapView>
        )
        : (
            <View style={ styles.miniMap }>
                <Text style={ { minHeight: 100, minWidth: 100, heigh: 300, width: "100%", ...(style || {}) } }>
                    { errorMessage }
                </Text>
            </View>
        );
};


