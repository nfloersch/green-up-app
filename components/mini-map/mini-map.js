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

const placePins = (pins?: Array<Object>): Array<React$Element<any>> => (
    (pins || []).map((pin: Object, index: number): React$Element<any> => (
        <MapView.Marker
            coordinate={ pin.coordinates }
            key={ `pin${ index }` }
            pinColor={ pin.color || "red" }
            stopPropagation={ true }
            onPress={ () => {
                if (pin.onPress) {
                    pin.onPress(index);
                }
            } }
        >
            { pin.callout ||
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
    ))
);


type PropsType = {
    initialLocation?: LocationType,
    onMapClick?: Object => void,
    pinsConfig: ?Array<Object>,
    layers?: Array<Object>,
    style?: Object
};

export const MiniMap = ({ initialLocation, onMapClick, pinsConfig = [], style }: PropsType): React$Element<any> => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [initialMapLocation, setInitialMapLocation] = useState(initialLocation);
    useEffect(() => {
        if (!initialMapLocation) {
            if (Platform.OS === "android" && !Constants.isDevice) {
                setErrorMessage("Oops, MiniMap will not work on Sketch or an Android emulator. Try it again on your device!");
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

    const handleMapClick = (e: SyntheticEvent<any, any>) => {
        if (onMapClick) {
            onMapClick(e.nativeEvent.coordinate);
        }
    };
    return !errorMessage
        ? (
            <MapView
                style={ { minHeight: 300, minWidth: "100%", ...(style || {}) } }
                initialRegion={ initialMapLocation }
                onPress={ handleMapClick }
            >
                { placePins(pinsConfig) }
            </MapView>
        )
        : (
            <View style={ styles.miniMap }>
                <Text style={ { minHeight: 300, minWidth: "100%", ...(style || {}) } }>
                    { errorMessage }
                </Text>
            </View>
        );
};


