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
    View,
    StyleSheet
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MapView, {Polygon} from 'react-native-maps';
import {Constants, Location, Permissions} from 'expo';

import Colors from '../../constants/Colors';
import {defaultStyles} from '../../styles/default-styles';
import * as actions from './actions';

const myStyles = {};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class TeamEditorMap extends Component {
    static propTypes = {
        actions: PropTypes.object,
        selectedTeam: PropTypes.object,
        locations: PropTypes.array,
        otherCleanAreas: PropTypes.array
    };

    static navigationOptions = {
        title: 'Team Map',
        tabBarLabel: 'Map',
        // Note: By default the icon is only shown on iOS. Search the showIcon option
        // below.
        tabBarIcon: ({focused}) => (
            <Ionicons name={Platform.OS === 'ios' ? `ios-pin${focused ? '' : '-outline'}` : 'md-pin'}
                size={24}
                color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />)
    };

    constructor(props) {
        super(props);
        this._handleMapClick = this._handleMapClick.bind(this);
        this._removeMarker = this._removeMarker.bind(this);
        this._removeLastMarker = this._removeLastMarker.bind(this);

        const {locations} = this.props;

        // if there are pins on the map, set initial location where the first pin is, otherwise device location will be set on componentWillMount
        const initialMapLocation = locations && locations.length > 0 ? {
            latitude: Number(locations[0].coordinates.latitude),
            longitude: Number(locations[0].coordinates.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        } : null;

        this.state = {
            initialMapLocation: initialMapLocation
        };
    }

    componentWillMount() {
        if (this.state.initialMapLocation === null) {
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
                                longitude: Number(location.longitude),
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
            if (location) {
                return {
                    latitude: Number(location.coords.latitude),
                    longitude: Number(location.coords.longitude)
                };
            }
            throw new Error('location is not available');
        });

    _handleMapClick(e) {
        this.props.actions.saveLocations(this.props.locations.concat({
            title: 'clean area border',
            description: 'tap to remove',
            coordinates: e.nativeEvent.coordinate
        }), this.props.selectedTeam);
    }

    _removeMarker(marker) {
        return () => {
            const locations = this.props.locations.filter(_marker => (
                marker.coordinates.latitude !== _marker.coordinates.latitude ||
                marker.coordinates.longitude !== _marker.coordinates.longitude
            ));
            this.props.actions.saveLocations(locations, this.props.selectedTeam);
        };
    }

    _removeLastMarker() {
        const locations = this.props.locations.slice(0, this.props.locations.length - 1);
        this.props.actions.saveLocations(locations, this.props.selectedTeam);
    }

    render() {
        const teamLocationMarkers = this
            .props
            .locations
            .map((marker, index) => (
                <MapView.Marker coordinate={marker.coordinates}
                    key={index}
                    title={marker.title || 'clean area border'}
                    onPress={this.calloutClicked}
                    onCalloutPress={this._removeMarker(marker)}
                    description={marker.descrption || 'tap to remove'}
                    image={require('../../assets/images/ic_person_pin_circle_white_24dp_2x.png')}
                />));

        return this.state.errorMessage ? (<Text>{this.state.errorMessage}</Text>)
            : this.state.initialMapLocation && ( // only render when the initial location is set, otherwise there's a weird race condition and the map won't always show properly
                <View style={defaultStyles.container}>
                    <Text>
                    Place markers around the area you want your team to work on.
                    Tap on the marker text box to remove a marker.
                    Blue markers represent areas that other teams are cleaning up.
                    </Text>
                    {!this.props.selectedTeam.id && (
                        <Text>
                        The markers will only be saved when you return to the details page and save the team details.
                        </Text>)}
                    <MapView style={{alignSelf: 'stretch', height: '50%'}}
                        initialRegion={this.state.initialMapLocation}
                        onPress={this._handleMapClick}>
                        {this.props.locations.length > 0 && teamLocationMarkers}
                        {this.props.locations.length > 0 && (
                            <Polygon coordinates={this.props.locations.map(m => m.coordinates)} fillColor='#b3e6cc'/>
                        )}
                        {this.props.otherCleanAreas.length > 0 && this.props.otherCleanAreas.map((c, index) =>
                            (<Polygon key={index} coordinates={c} fillColor='#b1c8ed'/>)
                        )}
                    </MapView>
                    <View style={styles.button}>
                      <Button title={'remove last marker'}
                          onPress={this._removeLastMarker}
                      />
                    </View>
                </View>);
    }
}

function mapStateToProps(state) {
    const selectedTeam = state.teams.selectedTeam;
    const locations = state.teams.locations;
    const otherCleanAreas = Object.values(state.teams.teams)
        .filter(team => team.id !== selectedTeam.id)
        .map(team => team.locations.map(l => l.coordinates))
        .filter(v => v.length > 0);
    return {selectedTeam, locations, otherCleanAreas};

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamEditorMap);
