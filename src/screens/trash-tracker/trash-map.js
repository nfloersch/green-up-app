/**
 /**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, TouchableHighlight, StyleSheet, Text, View, Platform} from 'react-native';
import {Constants, Location, MapView, Permissions } from 'expo';
import TrashDrop from './trash-drop';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'space-around',
        backgroundColor: 'white',
        borderColor: 'white',
        borderLeftWidth: 20,
        borderRightWidth: 20,
        justifyContent: 'flex-start'
    },
    text: {
        fontSize: 30,
        justifyContent: 'flex-start',
        fontWeight: 'bold',
        margin: 10
    },
    options: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    }
});
export default class TrashMap extends Component {

    static propTypes = {
        navigation: PropTypes.object
    };
    static navigationOptions = {
        title: 'Trash Tracker'
    };
    constructor(props) {
        super(props);
        this.state = {
            location: Location.getCurrentPositionAsync({}),
            errorMessage: null,
            mapRegion: Location.getCurrentPositionAsync({}),
            mapMarker: {
                latlng:{}
            },
            markers: []
        };
        this._goToTrashDrop = this
            ._goToTrashDrop
            .bind(this);
    }

    componentDidMount() {}

    _goToTrashDrop() {
        this
            .props
            .navigation
            .navigate('TrashDrop');
    }

    _getLocationAsync = async () => {
        const {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                location: Location.getLocationAsync({})
                // errorMessage: 'Permission to determine location was denied'
            });
            this.setState({
              location: Location.getLocationAsync({})
            });
        }

        const location = await Location.getCurrentPositionAsync({});
        const newLat = Number(location.coords.latitude);
        const newLong = Number(location.coords.longitude);
        this.setState({location,
            mapMarker: {title: TrashDrop.marker, description: TrashDrop.marker.bagCount, latlng: {
                longitude: newLong, latutude: newLat}},
            mapRegion: {
                latitude: newLat,
                longitude: newLong,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }});
    };

    handleMapRegionChange(mapRegion) {
        this.setState({mapRegion});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Trash Map</Text>
                <MapView
                    zoomEnabled={true}
                    style={{alignSelf: 'stretch', height: 200}}
                    region={this.state.mapRegion}
                    initialRegion={{
                        latitude: 44.4615298,
                        longitude: -73.218605,
                        latitudeDelta: 0.0002,
                        longitudeDelta: 0.0001
                    }}
                    onRegionChange={this._handleMapRegionChange}
                >
                    <MapView.Marker
                        coordinate={this.state.mapMarker.latlng}
                        title={this.state.mapMarker.title}
                        description={this.state.mapMarker.description}
                    />
                </MapView>

                <TouchableHighlight onPress={this._goToTrashDrop}>
                    <View>
                        <Text style={styles.text}>Drop Trash</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}
