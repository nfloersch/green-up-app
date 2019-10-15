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


const getLocationAsync = () => Permissions.askAsync(Permissions.LOCATION)
    .then((locationPermission) => {
        if (locationPermission.status !== "granted") {
            throw new Error("Allow access to location for a more accurate map");
        }
        return Location.getCurrentPositionAsync({});
    })
    .then((location) => {
        if (location) {
            return {
                latitude: Number(location.coords.latitude),
                longitude: Number(location.coords.longitude)
            };
        }
        throw new Error("Location is not available");
    });


const placeMarkers = (onPinClick: Object => void, pins: Array<Object>): Array<React.Element> => (
    pins.map((pin: Object, index: Number): React.Element => (
        <MapView.Marker
            coordinate={ pin.coordinates }
            key={ `pin${ index }` }
            pinColor={ pin.color || "red" }
            onCalloutPress={ onPinClick(pin) }
            stopPropagation={ true }
        >
            <MultiLineMapCallout
                title={ pin.title || "Clean Area" }
                description={ pin.description || "Tap to remove" }
            />
        </MapView.Marker>
    ))
);


type PropsType = {
    initialLocation: ?Location,
    pins: Array<Object>,
    onMapClick: typeof Location => void,
    onPinClick: typeof MapPin => void,
    layers: Array<Object>
};

export const MiniMap = ({ initialLocation, onMapClick, onPinClick, pins = [], layers = [] }: PropsType) => {
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
                    .then((location) => {
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


    const _handleMapClick = (e: Event) => {
        onMapClick(e.nativeEvent.coordinate);
    };

    return (
        <View style={ styles.miniMap }>
            { !errorMessage
                ? (
                    <MapView style={ { flex: 1 } }
                             initialRegion={ initialMapLocation }
                             onPress={ _handleMapClick }>
                        { placeMarkers(onPinClick, pins || []) }
                    </MapView>
                )
                : (<Text>{ errorMessage }</Text>)
            }
        </View>


    );
};


