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

import TrashDrop from '../../models/trash-drop';
import * as actions from './actions';
import {defaultStyles} from '../../styles/default-styles';

const myStyles = {
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

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
            this.setState({
                location,
                initialMapLocation: {
                    latitude: Number(location.coords.latitude),
                    longitude: Number(location.coords.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }
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

        return this.state.errorMessage ? (<Text>{this.state.errorMessage}</Text>)
            : this.state.initialMapLocation && (
                <View style={styles.container}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                        <Text style={styles.label}>Show Collected Trash</Text>
                        <Switch value={this.state.showCollectedTrash} onValueChange={(value) => this.setState({showCollectedTrash: value})}/>
                    </View>
                    <MapView
                        initialRegion={this.state.initialMapLocation}
                        showsUserLocation={true}
                        showsMyLocationButton={true} // TODO: figure out why this doesn't work
                        followsUserLocation={true}
                        showsCompass={true}
                        style={{alignSelf: 'stretch', height: 300}}>
                        {drops && drops.filter(drop => this.state.showCollectedTrash || !drop.wasCollected).map(drop => (
                            <MapView.Marker
                                key={drop.uid}
                                pinColor={drop.wasCollected ? 'wheat' : 'green'} // a limited number of colors are rendered properly on android ;( https://github.com/react-community/react-native-maps/issues/887
                                coordinate={drop.location}
                                title={`${drop.bagCount} bag(s)${drop.tags.length > 0 ? ' & other trash' : ''}`}
                                description={'Tap to view, edit or collect'}
                                onCalloutPress={() => { this.setState({modalVisible: true, drop: drop}); }}
                            />
                        ))}
                    </MapView>
                    <View style={styles.button}>
                        <Button
                            onPress={goToTrashDrop}
                            title='Create Trash Drop' />
                    </View>
                    <Modal
                        animationType={'slide'}
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => { this.closeModal(); }}>
                        <ScrollView style={{marginTop: 22}}>
                            <View style={styles.container}>
                                <Text style={styles.label}>Number of Bags</Text>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    editable={!this.state.drop.wasCollected}
                                    value={this.state.drop.bagCount.toString()}
                                    keyboardType='numeric'
                                    placeholder='1'
                                    style={styles.textInput}
                                    onChangeText={(text) => this.setState({drop: {...this.state.drop, bagCount: Number(text)}})}
                                />
                                <Text style={styles.label}>Other Items</Text>
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
                                        onPress={() => { this.closeModal();}}
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
