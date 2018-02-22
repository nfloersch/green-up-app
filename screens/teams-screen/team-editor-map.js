/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Platform,
    Text,
    View
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MapView, {Polygon} from 'react-native-maps';
import {Constants, Location, Permissions} from 'expo';

import {defaultStyles} from '../../styles/default-styles';
import * as actions from './actions';

class TeamEditorMap extends Component {
    static propTypes = {
        actions: PropTypes.object,
        selectedTeam: PropTypes.object
    };

    static navigationOptions = {
        title: 'Team Map',
        tabBarLabel: 'Map',
        // Note: By default the icon is only shown on iOS. Search the showIcon option
        // below.
        tabBarIcon: () => (<MaterialCommunityIcons name='map-marker' size={24} color='blue'/>)
    };

    constructor(props) {
        super(props);
        this._handleMapClick = this._handleMapClick.bind(this);
        this._removeMarker = this._removeMarker.bind(this);
        this._removeLastMarker = this._removeLastMarker.bind(this);

        const {locations} = this.props.selectedTeam;

        // if there are pins on the map, set initial location where the first pin is, otherwise device location will be set on componentWillMount
        const initialMapLocation = locations && locations.length > 0 ? {
            latitude: Number(locations[0].coordinates.latitude),
            longitude:  Number(locations[0].coordinates.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        } : null;

        this.state = {
            locations: locations,
            initialMapLocation: initialMapLocation
        };
    }

    componentWillMount() {
        if(this.state.initialMapLocation === null) {
            if (Platform.OS === 'android' && !Constants.isDevice) {
                this.setState({
                    errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it again on your ' +
                    'device!'
                });
            } else {
                this._getLocationAsync()
                    .then((location) => {
                        this.setState({
                            initialMapLocation: {
                                latitude: Number(location.latitude),
                                longitude:  Number(location.longitude),
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421
                            }
                        });
                    }, () => {
                        // Fail gracefully and set initial location to the Vermont Green Up HQ in Montpelier
                        this.setState({
                            initialMapLocation: {
                                latitude: 44.263278,
                                longitude: -72.6534249,
                                latitudeDelta: 0.1,
                                longitudeDelta: 0.1
                            }
                        });
                    });
            }
        }
    }

    _getLocationAsync = () => Permissions.askAsync(Permissions.LOCATION)
        .then((locationPermission) => {
            if (locationPermission.status !== 'granted') {
                throw new Error('allow access to location for a more accurate map');
            }

            return Location.getCurrentPositionAsync({});
        })
        .then((location) => {
            if(location) {
                return {
                    latitude: Number(location.coords.latitude),
                    longitude:  Number(location.coords.longitude)
                };
            }
            throw new Error('location is not available');
        });

    _handleMapClick(e) {
        // TODO: dispatch action to save the new marker
        // TODO: make sure unsaved team details don't get lost
        const marker = {
            name: '',
            description: 'clean area limit',
            coordinates: e.nativeEvent.coordinate
        };

        const newState = {
            ...this.state,
            locations: this.state.locations.concat(marker)
        };

        actions.saveLocations(newState.locations, this.props.selectedTeam);

        // move this to an action and handle through redux
        this.setState(newState);
    }

    _removeMarker(marker) {
        return () => {
            const locations = this.state.locations.filter(_marker => (
                marker.coordinates.latitude !== _marker.coordinates.latitude ||
                marker.coordinates.longitude !== _marker.coordinates.longitude
            ));
            actions.saveLocations(locations, this.props.selectedTeam);
            this.setState({locations});
        };
    }

    _removeLastMarker() {
        var locations = this.state.locations.slice(0, this.state.locations.length - 1);
        actions.saveLocations(locations, this.props.selectedTeam);
        this.setState({locations});
    }

    render() {
        var teamLocationMarkers = this
            .state
            .locations
            .map((marker, index) => (
                <MapView.Marker coordinate={marker.coordinates}
                    key={index}
                    title={marker.title || 'clean area border'}
                    onPress={this.calloutClicked}
                    onCalloutPress={this._removeMarker(marker)}
                    description={marker.descrption || 'tap to remove'}
                />));

        return this.state.errorMessage ? (<Text>{this.state.errorMessage}</Text>)
            : this.state.initialMapLocation && ( // only render when the initial location is set, otherwise there's a weird race condition and the map won't always show properly
                <View style={defaultStyles.container}>
                    <Text>
                        Place markers where you want your team to work on. Tap on the marker text box to remove a marker.
                    </Text>
                    <MapView style={{alignSelf: 'stretch', height: '50%'}}
                        initialRegion={this.state.initialMapLocation}
                        onPress={this._handleMapClick}>
                        {/* TODO: Show areas other teams have defined */}
                        {this.state.locations.length > 0 && teamLocationMarkers}
                        {this.state.locations.length > 0 && (
                            <Polygon coordinates={this.state.locations.map(m => m.coordinates)} fillColor='#ffb3b3'/>
                        )}
                    </MapView>
                    <Button title={'remove last marker'}
                        onPress={this._removeLastMarker}
                    />
                </View>);
    }
}

function mapStateToProps(state) {
    const selectedTeam = state.teams.selectedTeam;
    return {selectedTeam};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamEditorMap);
