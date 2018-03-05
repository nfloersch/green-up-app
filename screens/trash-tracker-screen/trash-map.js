/**
 /**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Location, MapView, Permissions} from 'expo';
import CheckBox from 'react-native-checkbox';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    StyleSheet,
    Button,
    Modal,
    ScrollView,
    Switch,
    TextInput,
    Text,
    View
} from 'react-native';

import * as turf from '@turf/helpers';
import booleanWithin from '@turf/boolean-within';

import TrashDrop from '../../models/trash-drop';
import * as actions from './actions';
import {defaultStyles} from '../../styles/default-styles';

const myStyles = {
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

// TODO: Load data from the database
const dummyTownData = {
    Winooski: {
        RoadsideDropOffAllowed: true,
        DropOffMessage: 'Leave on roadsides at intersections.',
        DropOffLocationName: 'Monkey House',
        DropOffLocationAddress: '30 Main St, Winooski, VT 05404',
        DropOffLocationCoordinates: {
            latitude: 44.4907233,
            longitude: -73.1865139
        }
    }
};

class TrashMap extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        actions: PropTypes.object,
        drops: PropTypes.array,
        currentUser: PropTypes.object
    };
    static navigationOptions = {
        title: 'Trash Tracker'
    };

    constructor(props) {
        super(props);
        this.state = {
            drop : {
                id: null,
                location: {},
                tags: [],
                bagCount: 1,
                wasCollected: false,
                createdBy: {uid: props.currentUser.uid, email: props.currentUser.email}
            },
            modalVisible: false,
            errorMessage: null,
            initialMapLocation: null,
            showCollectedTrash: false
        };
    }

    componentDidMount() {
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        // TODO: what if the user doesn't grant permission to location
        const {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({});

            const townPolygonsData = require('../../libs/VT_Boundaries__town_polygons.json');
            const currentLocation = turf.point([location.coords.longitude, location.coords.latitude]);
            const town = townPolygonsData.features.find((f) => {
                const feature = turf.feature(f.geometry);
                return booleanWithin(currentLocation, feature);
            });

            this.setState({
                location,
                initialMapLocation: {
                    latitude: Number(location.coords.latitude),
                    longitude: Number(location.coords.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                },
                town: town ? town.properties.TOWNNAMEMC : ''
            });
        }
    };

    _toggleTag = (tag) => () => {
        const hasTag = this.state.drop.tags.indexOf(tag) > -1;
        const tags = hasTag ? this.state.drop.tags.filter(_tag => _tag !== tag) : this.state.drop.tags.concat(tag);
        this.setState({drop: {...this.state.drop, tags}});
    }

    closeModal() {
        this.setState({
            modalVisible: false,
            drop: {
                id: null,
                location: {},
                tags: [],
                bagCount: 1,
                wasCollected: false,
                createdBy: {uid: this.props.currentUser.uid, email: this.props.currentUser.email}
            }
        });
    }

    render() {
        const saveTrashDrop = () => {
            if(this.state.drop.uid) {
                this.props.actions.updateTrashDrop(this.state.drop);
            } else {
                this.props.actions.dropTrash(TrashDrop.create(Object.assign({}, this.state.drop, {location: this.state.location.coords})));
            }

            this.closeModal();
        };

        const collectTrashDrop = () => {
            this.setState(
                {
                    drop: Object.assign({}, this.state.drop, {
                        wasCollected: true,
                        collectedBy: {
                            uid: this.props.currentUser.uid,
                            email: this.props.currentUser.email
                        }})
                }, saveTrashDrop);
        };

        const goToTrashDrop = () => {
            this.setState({modalVisible: true});
        };

        const {drops} = this.props;
        const townInfo = dummyTownData[this.state.town];

        return this.state.errorMessage ? (<Text>{this.state.errorMessage}</Text>)
            : this.state.initialMapLocation && (
                <View style={styles.container}>
                    {townInfo.RoadsideDropOffAllowed === true &&
                        (<View>
                            <Text style={styles.alertInfo}>
                                <Text>You are in {this.state.town} and leaving trash bags on the roadside is allowed.</Text>
                                <Text>{townInfo.DropOffMessage}</Text>
                            </Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                                <Text style={styles.label}>Show Collected Trash</Text>
                                <Switch value={this.state.showCollectedTrash} onValueChange={(value) => this.setState({showCollectedTrash: value})}/>
                            </View>
                        </View>)}
                    {townInfo.RoadsideDropOffAllowed === false &&
                        (<Text style={styles.alertInfo}>
                            <Text>You are in {this.state.town} and leaving trash bags on the roadside is <Text style={{fontWeight: 'bold'}}>not</Text> allowed.
                            Please bring collected trash to the designated drop off location.</Text>
                            <Text>{'\n'}Drop off location: {townInfo.DropOffLocationName}</Text>
                            <Text>{'\n'}Drop off address: {townInfo.DropOffLocationAddress}</Text>
                        </Text>)}
                    <MapView
                        initialRegion={this.state.initialMapLocation}
                        showsUserLocation={true}
                        showsMyLocationButton={true} // TODO: figure out why this doesn't work
                        followsUserLocation={true}
                        showsCompass={true}
                        style={{alignSelf: 'stretch', height: 300}}>
                        {townInfo.RoadsideDropOffAllowed === true && drops && drops.filter(drop => this.state.showCollectedTrash || !drop.wasCollected).map(drop => (
                            <MapView.Marker
                                key={drop.uid}
                                pinColor={drop.wasCollected ? 'wheat' : 'green'} // a limited number of colors are rendered properly on android ;( https://github.com/react-community/react-native-maps/issues/887
                                coordinate={drop.location}
                                title={`${drop.bagCount} bag(s)${drop.tags.length > 0 ? ' & other trash' : ''}`}
                                description={'Tap to view, edit or collect'}
                                onCalloutPress={() => { this.setState({modalVisible: true, drop: drop}); }}
                            />
                        ))}
                        {townInfo.RoadsideDropOffAllowed === false && (
                            <MapView.Marker
                                key={`${this.state.town}DropOffLocation`}
                                pinColor='blue'
                                coordinate={townInfo.DropOffLocationCoordinates}
                                title='Drop Off Location'
                                description={`${townInfo.DropOffLocationName}, ${townInfo.DropOffLocationAddress}`}
                            />
                        )}
                    </MapView>
                    {townInfo.RoadsideDropOffAllowed === true && (
                        <View style={styles.button}>
                            <Button
                                onPress={goToTrashDrop}
                                title='Create Trash Drop' />
                        </View>
                    )}
                    <Modal
                        animationType={'slide'}
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => { this.closeModal(); }}>
                        <ScrollView style={{marginTop: 22}}>
                            <View style={styles.container}>
                                <Text style={styles.heading2}>Number of Bags</Text>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    editable={!this.state.drop.wasCollected}
                                    value={this.state.drop.bagCount.toString()}
                                    keyboardType='numeric'
                                    placeholder='1'
                                    style={styles.textInput}
                                    onChangeText={(text) => this.setState({drop: {...this.state.drop, bagCount: Number(text)}})}
                                />
                                <Text style={styles.heading2}>Other Items</Text>
                                <View style={styles.fieldset}>
                                    <CheckBox
                                        editable={!this.state.drop.wasCollected}
                                        label='Needles/Bio-Waste'
                                        checked={this.state.drop.tags.indexOf('bio-waste') > -1}
                                        onChange={this._toggleTag('bio-waste')}/>
                                    <CheckBox
                                        editable={!this.state.drop.wasCollected}
                                        label='Tires'
                                        checked={this.state.drop.tags.indexOf('tires') > -1}
                                        onChange={this._toggleTag('tires')}/>
                                    <CheckBox
                                        editable={!this.state.drop.wasCollected}
                                        label='Large Object'
                                        checked={this.state.drop.tags.indexOf('large') > -1}
                                        onChange={this._toggleTag('large')}/>
                                </View>
                                {!this.state.drop.wasCollected && this.state.drop.createdBy && this.state.drop.createdBy.uid === this.props.currentUser.uid &&
                                (
                                    <View style={styles.button}>
                                        <Button
                                            onPress={saveTrashDrop}
                                            title={this.state.drop.uid ? 'Update This Spot' : 'Mark This Spot'} />
                                    </View>
                                )}
                                {this.state.drop.uid && !this.state.drop.wasCollected && (
                                    <View style={styles.button}>
                                        <Button
                                            onPress={collectTrashDrop}
                                            title='Collect Trash'/>
                                    </View>
                                )}
                                <View style={styles.button}>
                                    <Button
                                        onPress={() => { this.closeModal(); }}
                                        title='Cancel' />
                                </View>
                            </View>
                        </ScrollView>
                    </Modal>
                </View>
            );
    }
}


function mapStateToProps(state) {
    const drops = Object.keys(state.trashTracker.trashDrops || {})
        .filter(key => !!(state.trashTracker.trashDrops[key].location && state.trashTracker.trashDrops[key].location.longitude && state.trashTracker.trashDrops[key].location.latitude))
        .map(key => ({...state.trashTracker.trashDrops[key], uid: key})); // TODO: Handle default values here

    return {drops: drops, currentUser: state.login.user};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrashMap);
