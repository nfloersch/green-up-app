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
import MapPin from "../../models/map-pin";

const myStyles = {
    selected: {
        opacity: 0.5
    },
    miniMap: {
        width: "100%",
        minHeight: 10
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
const placePins = (onPinClick: number => void, pins: Array<Object>): Array<React$Element> => (
    pins.map((pin: Object, index: number): React$Element => (
        <MapView.Marker
            coordinate={ pin.coordinates }
            key={ `pin${ index }` }
            pinColor={ pin.color || "red" }
            onCalloutPress={ () => {
                onPinClick(index);
            } }
            stopPropagation={ true }
        >
            <MultiLineMapCallout
                title={ pin.title || "Clean Area" }
                description={ pin.description || "Tap to remove" }
            />
        </MapView.Marker>
    ))
);

const placeOtherMarkers = (markers: Array<Object>): Array<React$Element> => (
    markers.map((marker: Object, index: number): React$Element => (
        <MapView.Marker
            coordinate={ marker.coordinates }
            key={ `marker${ index }` }
            pinColor={ marker.color || "yellow" }
            stopPropagation={ true }
        >
            <MultiLineMapCallout
                title={ marker.title || "" }
                description={ marker.description || "Claimed Area" }
            />
        </MapView.Marker>
    ))
);

type PropsType = {
    initialLocation: ?Location,
    markers: Array<Object>,
    pins: Array<Object>,
    onMapClick: typeof Location => void,
    onPinClick: typeof MapPin => void,
    layers: Array<Object>,
    style?: Object
};

export const MiniMap = ({ initialLocation, onMapClick, onPinClick, markers = [], pins = [], style }: PropsType): React$Element<any> => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [initialMapLocation, setInitialMapLocation] = useState(initialLocation);
    useEffect(() => {
        if (!initialMapLocation) {
            if (Platform.OS === "android" && !Constants.isDevice) {
                setErrorMessage({
                    errorMessage: "Oops, this will not work on Sketch or an Android emulator. Try it again on your device!"
                });
            } else {
                getLocationAsync()
                    .then((location: Object) => {
                        setInitialMapLocation({
                            latitude: Number(location.latitude),
                            longitude: Number(location.longitude),
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        });
                    })
                    .catch((e: Error) => {
                        // Fail gracefully and set initial location to the Vermont Green Up HQ in Montpelier
                        setInitialMapLocation({
                            latitude: 44.263278,
                            longitude: -72.6534249,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1
                        });
                        Alert.alert(e);
                    });
            }
        }
    }, []);

    const handleMapClick = (e: Event) => {
        onMapClick(e.nativeEvent.coordinate);
    };

    return (
        <View style={ styles.miniMap }>
            { !errorMessage
                ? (
                    <MapView
                        style={ { minHeight: 300, minWidth: "100%", ...(style || {}) } }
                        initialRegion={ initialMapLocation }
                        onPress={ handleMapClick }
                    >
                        { placePins(onPinClick, pins || []) }
                        { placeOtherMarkers(markers) }
                    </MapView>
                )
                : (<Text>{ errorMessage }</Text>)
            }
        </View>
    );
};


