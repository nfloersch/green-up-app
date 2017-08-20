/**
 /**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, StyleSheet,
    Modal, ScrollView, TextInput, Text, View} from 'react-native';
import MapView from 'react-native-maps';
import {Location, Permissions} from 'expo';
import CheckBox from 'react-native-checkbox';

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
            latitude: 44.04,
            longitude: 162.7093,
            errorMessage: null,
            mapRegion: Location.getCurrentPositionAsync({}),
            mapMarker: {latlng:{}}
        };
        this._getLocationAsync = this._getLocationAsync.bind(this);
        this._goToTrashDrop = this._goToTrashDrop.bind(this);
        this.state = {modalVisible: false};
    }

    componentDidMount() {
    }

    _goToTrashDrop() {
        this.setState({modalVisible: true});
    }

    _getLocationAsync = async () => {
        const {status} = await Permissions.askAsync(Permissions.LOCATION);
        if ( status === 'granted') {
            this.setState({
                location: Location.getCurrentPositionAsync({})
            });
            this.setState({
                latitude: 44.04,
                longitude: -72.7093,
                latitudeDelta: 1,
                longitudeDelta: 2
            });
        }

        const location = await Location._getLocationAsync({});
        const newLat = Number(location.coords.latitude);
        const newLong = Number(location.coords.longitude);
        this.setState({location,
            mapMarker:{
                title:'X',
                pinColor:'blue',
                description:'X',
                coordinate:{longitude: -72.7093, latitude: 44.04}
            },
            mapRegion: {
                latitude: newLat,
                longitude: newLong,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            }
        });
    };

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Trash Map</Text>
                <MapView
                    zoomEnabled={true}
                    showsUserLocation={true}
                    showsMyLocatonButton={true}
                    showsScale={true}
                    followsUserLocation={true}
                    showsCompass={true}
                    style={{alignSelf: 'stretch', height: 300}}
                >

                    <MapView.Marker
                        coordinate={{longitude: -72.7093, latitude: 44.04}}
                        title={'test'}
                    />

                </MapView>
                <TouchableHighlight onPress={this._goToTrashDrop}>
                    <View>
                        <Text style={styles.text}>Drop Trash</Text>
                    </View>
                </TouchableHighlight>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <ScrollView style={{marginTop: 22}}>
                        <View>
                            <TextInput
                                keyboardType='numeric'
                                placeholder=' 1'
                                style={{
                                    height: 40,
                                    borderColor: 'gray',
                                    borderWidth: 1
                                }}
                                onChangeText={(text) => this.setState({text})}
                            />
                            <Text style={styles.text}>Other Items</Text>
                            <CheckBox checked={this.state.hasNone} label='None'
                                onPress={() => {
                                    this.setState({hasNone: !this.state.hasNone});
                                }} />
                            <CheckBox checked={this.state.hasMattress} label='Mattress(s)'
                                onPress={() => {
                                    this.setState({hasMattress: !this.state.hasMattress});
                                }}
                            />
                            <CheckBox checked={this.state.hasTires} label='Tire(s)'
                                onPress={() => {
                                    this.setState({hasTires: !this.state.hasTires});
                                }}
                            />
                            <CheckBox checked={this.state.hasHazardous} label='Hazardous Waste'
                                onPress={() => {
                                    this.setState({hasHazardous: !this.state.hasHazardous});
                                }}
                            />
                            <CheckBox checked={this.state.hasLarge} label='Large Object(s)'
                                onPress={() => {
                                    this.setState({hasLarge: !this.state.hasLarge});
                                }}
                            />
                            <TouchableHighlight onPress={() => {
                                this.setState({modalVisible: false})
                            }}>
                                <Text style={styles.text}>Mark the Spot</Text>
                            </TouchableHighlight>

                        </View>
                    </ScrollView>
                </Modal>
            </View>
        );
    }
}
