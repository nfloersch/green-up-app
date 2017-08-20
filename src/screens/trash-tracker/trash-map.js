/**
 /**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    TouchableHighlight, StyleSheet,
    Button, Modal, ScrollView, TextInput, Text, View
} from 'react-native';
import {Location, MapView, Permissions} from 'expo';
import TrashDrop from './trash-drop';
import CheckBox from 'react-native-checkbox';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as trashTrackerActions from './trash-tracker-actions';


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

var addTrashDrop = Symbol();
function _addTrashDrop (marker){
    this.props.actions.dropTrash(marker);
}

class TrashMap extends Component {

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
            markers: []
        };
        this._getLocationAsync = this._getLocationAsync.bind(this);
        this[addTrashDrop] = _addTrashDrop.bind(this);
        this._goToTrashDrop = this
            ._goToTrashDrop
            .bind(this);
        this.state = {modalVisible: false};
    }

    componentDidMount() {
    }

    _goToTrashDrop() {
        this.setState({modalVisible: true});
        // this
        //     .props
        //     .navigation
        //     .navigate('TrashDrop');
    }

    _getLocationAsync = async () => {
        const {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            this.setState({
                location: Location.getCurrentPositionAsync({})
            });
            this.setState({
                latitude: 44.3,
                longitude: 47.33,
                latitudeDelta: 1,
                longitudeDelta: 2
            });
        }

        const location = await Location._getLocationAsync({});
        const newLat = Number(location.coords.latitude);
        const newLong = Number(location.coords.longitude);
        const marker = this.state.marker.concat({
            title: TrashDrop.toTrashMap.marker,
            description: Number(TrashDrop.toTrashMap.marker.bagCount),
            latlng: {
                longitude: newLong,
                latutude: newLat
            }
        });
        this.setState({
            location,
            marker,
            mapRegion: {
                latitude: newLat,
                longitude: newLong,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            }
        });
    };

    render() {

        function myMarkers(marker) {
            return (
                <MapView.Marker
                    coordinate={marker.latlng}
                    title={marker.title}
                    description={marker.description}
                />
            );
        }


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
                    // initialRegion={this.setState()}
                >
                    {myMarkers}
                </MapView>

                <TouchableHighlight onPress={this._goToTrashDrop}>
                    <View>
                        <Text style={styles.text}>Drop Trash</Text>
                    </View>
                </TouchableHighlight>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.modalVisible}
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
                            <CheckBox label='None' onPress={() => {
                            }}/>
                            <CheckBox
                                checked={this.state.hasMattress} label='Mattress(s)'
                                onPress={() => {
                                    this.setState({hasMattress: !this.state.hasMattress});
                                }}
                            />
                            <CheckBox label='Tires' onPress={() => {
                            }}/>
                            <CheckBox label='Hazardous Waste' onPress={() => {
                            }}/>
                            <CheckBox label='Large Object(s)' onPress={() => {
                            }}/>
                            <Button
                                onPress={this[addTrashDrop]}
                                title='Mark the Spot'
                                color='green'/>

                            <TouchableHighlight onPress={() => {
                                this.setState({modalVisible: false});
                            }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>

                        </View>
                    </ScrollView>
                </Modal>
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {messages: state.trashTrackerReducers.message};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(trashTrackerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrashMap);
