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
    KeyboardAvoidingView,
    TouchableHighlight,
    TouchableOpacity,
    Modal,
    ScrollView,
    StyleSheet,
    TextInput,
    Text,
    View,
    Platform
} from 'react-native';
import TrashToggles from './trash-toggles';
import * as turf from '@turf/helpers';
import booleanWithin from '@turf/boolean-within';
import TrashDrop from '../../models/trash-drop';
import * as actions from './actions';
import {defaultStyles} from '../../styles/default-styles';
import MultiLineMapCallout from '../../components/MultiLineMapCallout';
import {Ionicons} from '@expo/vector-icons';

const myStyles = {};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class TownInformation extends React.Component {
    static propTypes = {
        townInfo: PropTypes.object,
        town: PropTypes.string
    };

    render() {
        const {townInfo, town} = this.props;
        return (
            <View style={{
                padding: 5,
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: 60,
                width: '100%',
                backgroundColor: 'rgba(255,255,255, 0.8)'
            }}>
                {typeof townInfo.RoadsideDropOffAllowed === 'undefined' && (
                    <Text style={styles.statusBarText}>
                        {'Sorry, we have no information on trash drops for your location. '}
                    </Text>
                )}
                {townInfo.RoadsideDropOffAllowed === true && (
                    <Text style={styles.statusBarText}>
                        <Text>{`You are in ${town} and leaving trash bags on the roadside is allowed.`}</Text>
                    </Text>
                )}
                {townInfo.RoadsideDropOffAllowed === false && (
                    <Text style={styles.statusBarText}>
                        <Text>{`You are in ${town} and leaving trash bags on the roadside is`}
                            <Text style={{fontWeight: 'bold'}}>
                                {' not'}
                            </Text>
                            {' allowed. Please bring collected trash to the designated drop off locations:'}
                        </Text>
                        {townInfo.DropOffLocations.map(d => (
                            <Text>{`\n${d.DropOffLocationName}, ${d.DropOffLocationAddress}`}</Text>
                        ))}
                    </Text>)}
            </View>
        );
    }
}

class TrashMap extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        actions: PropTypes.object,
        drops: PropTypes.array,
        currentUser: PropTypes.object,
        townData: PropTypes.object,
        location: PropTypes.object,
        supplyPickupToggle: PropTypes.bool,
        uncollectedTrashToggle: PropTypes.bool,
        trashDropOffToggle: PropTypes.bool,
        myTrashToggle: PropTypes.bool,
        collectedTrashToggle: PropTypes.bool
    };

    static navigationOptions = {
        title: 'Trash Tracker'
    };

    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.closeToggleModal = this.closeToggleModal.bind(this);
        this._toggleTag = this._toggleTag.bind(this);
        this._getLocationAsync = this._getLocationAsync.bind(this);
        this._getTown = this._getTown.bind(this);
        this.state = {
            drop: {
                id: null,
                location: {},
                tags: [],
                bagCount: 1,
                wasCollected: false,
                createdBy: {uid: props.currentUser.uid, email: props.currentUser.email}
            },
            modalVisible: false,
            toggleModalVisible: false,
            errorMessage: null,
            hackyHeight: 300
        };
    }

    componentWillMount() {
        // Hack to work around known issue where the my location button doesn't show
        // https://github.com/react-community/react-native-maps/issues/1332
        setTimeout(() => this.setState({hackyHeight: 301}), 500);
        setTimeout(() => this.setState({hackyHeight: 300}), 1000);

    }

    componentDidMount() {
        if (!this.props.location) {
            this._getLocationAsync();
        }
    }

    _getTown(location) {
        const townPolygonsData = require('../../libs/VT_Boundaries__town_polygons.json');
        const currentLocation = turf.point([location.coords.longitude, location.coords.latitude]);
        const town = townPolygonsData.features.find((f) => {
            const feature = turf.feature(f.geometry);
            return booleanWithin(currentLocation, feature);
        });

        return town ? town.properties.TOWNNAMEMC : '';
    }

    _getLocationAsync = async () => {
        // TODO: what if the user doesn't grant permission to location
        const {status} = await Permissions.askAsync(Permissions.LOCATION);

        if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({});
            this.props.actions.locationUpdated(location);

            Location.watchPositionAsync({timeInterval: 3000, distanceInterval: 20}, (l) => {
                this.props.actions.locationUpdated(l);
            });
        }
    };

    _toggleTag = (tag) => () => {
        const hasTag = this.state.drop.tags.indexOf(tag) > -1;
        const tags = hasTag ? this.state.drop.tags.filter(_tag => _tag !== tag) : this.state.drop.tags.concat(tag);
        this.setState({drop: {...this.state.drop, tags}});
    };

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


    closeToggleModal() {
        this.setState({
            toggleModalVisible: false
        });
    }

    render() {
        const saveTrashDrop = () => {
            if (this.state.drop.uid) {
                this.props.actions.updateTrashDrop(this.state.drop);
            } else {
                this.props.actions.dropTrash(TrashDrop.create(Object.assign({}, this.state.drop, {location: this.props.location.coords})));
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
                        }
                    })
                }, saveTrashDrop);
        };

        const goToTrashDrop = () => {
            this.setState({modalVisible: true});
        };

        const {drops, townData} = this.props;

        // by convention, we're importing town names as upper case, any characters different
        // than uppercase letters replaced with underscore
        const town = this.props.location ? this._getTown(this.props.location) : '';
        const encodedTownName = town.toUpperCase().replace(/[^A-Z]/g, '_');
        const townInfo = townData[encodedTownName] || {};
        const trashDropOffLocations = Object.getOwnPropertyNames(townData).reduce((acc, p) => acc.concat(townData[p].DropOffLocations), []).filter(l => l.DropOffLocationCoordinates);
        const supplyPickupLocations = Object.getOwnPropertyNames(townData).reduce((acc, p) => acc.concat(townData[p].PickupLocations), []).filter(l => l.PickupLocationCoordinates);
        const initialMapLocation = this.props.location ? {
            latitude: Number(this.props.location.coords.latitude),
            longitude: Number(this.props.location.coords.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        } : null;

        const showFirstButton = !this.state.drop.wasCollected && this.state.drop.createdBy && this.state.drop.createdBy.uid === this.props.currentUser.uid;

        const collectedTrash = (drops || []).filter(drop => (this.state.showCollectedTrash && drop.wasCollected === true)).map(drop => (
            <MapView.Marker
                key={drop.uid}
                // image={collectedTrashIcon}
                pinColor={'gray'}
                coordinate={drop.location}
                title={`${drop.bagCount} bag(s)${drop.tags.length > 0 ? ' & other trash' : ''}`}
                description={'Tap to view collected trash'}
                onCalloutPress={() => {
                    this.setState({modalVisible: true, drop: drop});
                }}
                stopPropagation={true}/>
        ));

        const myTrash = (drops || []).filter(drop => (this.props.myTrashToggle && !drop.wasCollected && drop.createdBy && drop.createdBy.uid === this.props.currentUser.uid)).map(drop => (
            <MapView.Marker
                key={drop.uid}
                // image={myUncollectedTrashIcon}
                pinColor={'yellow'}
                coordinate={drop.location}
                title={`${drop.bagCount} bag(s)${drop.tags.length > 0 ? ' & other trash' : ''}`}
                description={'Tap to view, edit or collect'}
                onCalloutPress={() => {
                    this.setState({modalVisible: true, drop: drop});
                }}
                stopPropagation={true}
            />
        ));

        const unCollectedTrash = (drops || []).filter(drop => (this.props.uncollectedTrashToggle && !drop.wasCollected && drop.createdBy && drop.createdBy.uid !== this.props.currentUser.uid)).map(drop => (
            <MapView.Marker
                key={drop.uid}
                // image={uncollectedTrashIcon}
                pinColor={'red'}
                coordinate={drop.location}
                title={`${drop.bagCount} bag(s)${drop.tags.length > 0 ? ' & other trash' : ''}`}
                description={'Tap to view or collect'}
                onCalloutPress={() => {
                    this.setState({modalVisible: true, drop: drop});
                }}
                stopPropagation={true}
            />
        ));

        const dropOffLocations = (this.props.trashDropOffToggle && trashDropOffLocations || []).map((d, i) => (
            <MapView.Marker
                key={`${town}DropOffLocation${i}`}
                // image={trashDropOffLocationIcon}
                pinColor={'blue'}
                coordinate={d.DropOffLocationCoordinates}
                stopPropagation={true}>
                <MultiLineMapCallout
                    title='Drop Off Location'
                    description={`${d.DropOffLocationName}, ${d.DropOffLocationAddress}`}
                />
            </MapView.Marker>
        ));

        const pickupLocations = (this.props.supplyPickupToggle && supplyPickupLocations || []).map((d, i) => (
            <MapView.Marker
                key={`supplyPickup${i}`}
                // image={supplyPickupLocationIcon}
                pinColor={'green'}
                coordinate={d.PickupLocationCoordinates}
                stopPropagation={true}>
                <MultiLineMapCallout
                    title='Supply Pickup Location'
                    description={`${d.PickupLocationName}, ${d.PickupLocationAddress}`}
                />
            </MapView.Marker>
        ));


        const allMarkers = pickupLocations.concat(dropOffLocations).concat(unCollectedTrash).concat(myTrash).concat(collectedTrash);


        return this.state.errorMessage ? (<Text>{this.state.errorMessage}</Text>)
            : initialMapLocation &&
            (
                <View style={styles.frame}>


                    <MapView
                        initialRegion={initialMapLocation}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        showsCompass={true}
                        style={{
                            position: 'absolute',
                            top: 50,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: '100%',
                            width: '100%',
                            margin: 0,
                            padding: 0
                        }}
                    >
                        {allMarkers}
                    </MapView>

                    <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: 50,
                        width: '100%',
                        flex: 1,
                        flexDirection: 'row',
                        padding: 0,
                        justifyContent:'flex-end'
                    }}>


                        {townInfo.RoadsideDropOffAllowed
                            ? (
                                <TouchableHighlight
                                    style={[styles.headerButton, {backgroundColor: '#EEE', paddingTop: 13, height: 50, flex: 1}]}
                                    onPress={goToTrashDrop}>
                                    <Text style={styles.headerButtonText}>
                                        {'Drop A Trash Bag Here'}
                                    </Text>
                                </TouchableHighlight>)
                            : null}
                        <TouchableHighlight
                            style={{height: 50, width: 50, padding: 5, backgroundColor: 'rgba(255,255,255,0.8)'}}
                            onPress={() => {
                                this.setState({
                                    toggleModalVisible: true
                                });
                            }}>
                            <Ionicons
                                name={Platform.OS === 'ios' ? 'ios-options-outline' : 'md-options'}
                                size={40}
                                color='#333'
                            />
                        </TouchableHighlight>
                    </View>

                    <TownInformation townInfo={townInfo} town={town}/>
                    <Modal
                        animationType={'slide'}
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.closeModal();
                        }}>
                        <View style={styles.frame}>
                            <View style={[styles.buttonBarHeader, {backgroundColor: '#EEE', marginTop: 30}]}>
                                <View style={styles.buttonBar}>
                                    {
                                        showFirstButton
                                            ? (
                                                <View style={styles.buttonBarButton}>
                                                    <TouchableOpacity
                                                        style={styles.headerButton}
                                                        onPress={saveTrashDrop}
                                                    >
                                                        <Text style={styles.headerButtonText}>
                                                            {this.state.drop.uid ? 'Update This Spot' : 'Mark This Spot'}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                            : null
                                    }


                                    <View style={styles.buttonBarButton}>
                                        <TouchableOpacity style={styles.headerButton} onPress={this.closeModal}>
                                            <Text style={styles.headerButtonText}>{'Cancel'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <KeyboardAvoidingView
                                style={defaultStyles.frame}
                                behavior={Platform.OS === 'ios' ? 'padding' : null}
                            >
                                <ScrollView style={styles.scroll}>
                                    <View style={styles.infoBlockContainer}>
                                        <Text style={styles.labelDark}>Number of Bags</Text>
                                        <TextInput
                                            underlineColorAndroid='transparent'
                                            editable={!this.state.drop.wasCollected}
                                            value={this.state.drop.bagCount.toString()}
                                            keyboardType='numeric'
                                            placeholder='1'
                                            style={styles.textInput}
                                            onChangeText={(text) => this.setState({
                                                drop: {
                                                    ...this.state.drop,
                                                    bagCount: Number(text)
                                                }
                                            })}
                                        />
                                        <Text style={styles.labelDark}>Other Items</Text>
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

                                    </View>
                                    {
                                        this.state.drop.uid && !this.state.drop.wasCollected && (
                                            <View style={{width: '100%', height: 60}}>
                                                <TouchableHighlight
                                                    style={[styles.button, {width: '100%'}]}
                                                    onPress={collectTrashDrop}
                                                >
                                                    <Text style={styles.buttonText}>{'Collect Trash'}</Text>
                                                </TouchableHighlight>
                                            </View>
                                        )
                                    }
                                </ScrollView>
                            </KeyboardAvoidingView>
                        </View>
                    </Modal>
                    <Modal
                        animationType={'slide'}
                        transparent={false}
                        visible={this.state.toggleModalVisible}
                        onRequestClose={() => {
                            this.closeToggleModal();
                        }}>
                        <TrashToggles close={this.closeToggleModal}/>
                    </Modal>
                </View>
            );
    }
}

function mapStateToProps(state) {
    const drops = Object.keys(state.trashTracker.trashDrops || {})
        .filter(key => !!(state.trashTracker.trashDrops[key].location && state.trashTracker.trashDrops[key].location.longitude && state.trashTracker.trashDrops[key].location.latitude))
        .map(key => ({...state.trashTracker.trashDrops[key], uid: key}));
    const townData = state.trashBagFinder.townData;
    const collectedTrashToggle = state.trashTracker.collectedTrashToggle;
    const supplyPickupToggle = state.trashTracker.supplyPickupToggle;
    const uncollectedTrashToggle = state.trashTracker.uncollectedTrashToggle;
    const trashDropOffToggle = state.trashTracker.trashDropOffToggle;
    const myTrashToggle = state.trashTracker.myTrashToggle;
    return {
        drops: drops,
        currentUser: state.login.user,
        townData,
        location: state.trashTracker.location,
        collectedTrashToggle,
        supplyPickupToggle,
        uncollectedTrashToggle,
        trashDropOffToggle,
        myTrashToggle
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrashMap);
