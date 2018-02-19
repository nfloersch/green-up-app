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
    StyleSheet,
    Text,
    View
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MapView, {Polygon} from 'react-native-maps'; 
import {Constants, Location, Permissions} from 'expo';

import {defaultStyles} from  '../../styles/default-styles';
import * as actions from './actions';

export default class TeamEditorMap extends Component {
    static propTypes = {
        actions: PropTypes.object,
        teams: PropTypes.array
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
        // TODO: Get existing markers from props
        this._handleMapClick = this._handleMapClick.bind(this);
        this._removeMarker = this._removeMarker.bind(this);
        this._removeLastMarker = this._removeLastMarker.bind(this);
        this.state = {
            location: null,
            errorMessage: null,
            mapRegion: null,
            markers: []
        };
    }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it again on your ' +
                'device!'
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        const status = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({errorMessage: 'Permission to access location was denied'});
        }

        const location = await Location.getCurrentPositionAsync({});
        this.setState({
            // location,
            ...this.state,
            initialMapLocation: {
                latitude: Number(location.coords.latitude),
                longitude:  Number(location.coords.longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
        });
    };

    _handleMapClick(e) {
        // TODO: dispatch action to save the new marker
        // TODO: make sure unsaved team details don't get lost
        const marker = {
            title: '',
            description: 'clean area limit',
            latlng: e.nativeEvent.coordinate
        };
        const markers = this.state.markers.concat(marker);
        this.setState({
            ...this.state,
            markers
        });
    }

    _removeMarker(marker) {
        return () => {
            const markers = this.state.markers.filter(_marker => (
                marker.latlng.latitude !== _marker.latlng.latitude ||
                marker.latlng.longitude !== _marker.latlng.longitude
            ));

            this.setState({markers});
        };
    }

    _removeLastMarker() {
        var markers = this.state.markers.slice(0, this.state.markers.length - 1);
        this.setState({markers});
    }

    render() {
        var markers = this
            .state
            .markers
            .map((marker, index) => (
                <MapView.Marker coordinate={marker.latlng}
                    key={index}
                    title={marker.title || 'clean area border'}
                    onPress={this.calloutClicked}
                    onCalloutPress={this._removeMarker(marker)}
                    description={marker.descrption || 'tap to remove'}
                />));
        // Let's make the marker conditional on whether we have marker data
        // I believe this refers to the  trash map - and the idea is to display trash on the map
        // this may be an issue considering trash drops do not appear to be persisted
        const mapMarker = !!(this.state.mapMarker)
            ? (
                <MapView.Marker coordinate={this.state.mapMarker.latlng}
                    title={this.state.mapMarker.title}
                    description={this.state.mapMarker.description}
                />
            ) : null;
        return (
            <View style={defaultStyles.container}>
                <Text>
                    Place markers where you want your team to work on. Tap on the marker text box to remove a marker.
                </Text>
                <MapView style={{alignSelf: 'stretch', height: '50%'}}
                    initialRegion={this.state.initialMapLocation}
                    onPress={this._handleMapClick}>

                    {mapMarker}{markers}
                    
                    {this.state.markers.length > 0 && (
                        <Polygon coordinates={this.state.markers.map(m => m.latlng)} fillColor='#ffb3b3'/>
                    )}
                </MapView>
                <Button title={'remove last marker'}
                    onPress={this._removeLastMarker}
                />
            </View>
        );
    }
}
