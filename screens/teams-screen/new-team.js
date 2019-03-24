// @flow

import React, {Component} from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {SegmentedControls} from 'react-native-radio-buttons';
import Autocomplete from 'react-native-autocomplete-input';
import * as actions from './actions';
import moment from 'moment';
import {defaultStyles} from '../../styles/default-styles';
import Team from '../../models/team';
import TeamMember from '../../models/team-member';
import * as statuses from '../../constants/team-member-statuses';
import User from '../../models/user';
import {removeNulls} from '../../libs/remove-nulls';
import {Constants, Location, Permissions, MapView} from 'expo';
import MultiLineMapCallout from '../../components/MultiLineMapCallout';
import {TownLocation} from '../../models/town';

const myStyles = {
    selected: {
        opacity: 0.5
    }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);
const freshState = (owner, initialMapLocation = null) => ({
    ...Team.create({owner}),
    startDateTimePickerVisible: false,
    endDateTimePickerVisible: false,
    datePickerVisible: false,
    query: '',
    town: '',
    locations: [],
    initialMapLocation
});

type Props = {
    actions: Object,
    closeModal: any,
    currentUser: User,
    eventSettings: Object,
    locations: Array<TownLocation>,
    owner: User,
    otherCleanAreas: Array<any>,
    vermontTowns: Array<Object>
};

class NewTeam extends Component<Props> {

    constructor(props) {
        super(props);
        this._handleMapClick = this._handleMapClick.bind(this);
        this._removeMarker = this._removeMarker.bind(this);
        this._removeLastMarker = this._removeLastMarker.bind(this);
        this._createTeam = this._createTeam.bind(this);
        this._handleMapClick = this._handleMapClick.bind(this);
        const {locations} = this.props;

        // if there are pins on the map, set initial location where the first pin is, otherwise device location will be set on componentWillMount
        const initialMapLocation = locations && locations.length > 0 ? {
            latitude: Number(locations[0].coordinates.latitude),
            longitude: Number(locations[0].coordinates.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        } : null;

        this.state = freshState(props.owner, initialMapLocation);
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
        this.setState({
            locations: this.state.locations.concat({
                title: 'Clean Area',
                description: 'tap to remove',
                coordinates: e.nativeEvent.coordinate
            })
        });
    }

    _removeMarker(marker) {
        return () => {
            const locations = this.state.locations.filter(_marker => (
                marker.coordinates.latitude !== _marker.coordinates.latitude ||
                marker.coordinates.longitude !== _marker.coordinates.longitude
            ));
            this.setState({locations});
        };
    }

    _removeLastMarker() {
        const locations = this.state.locations.slice(0, this.state.locations.length - 1);
        this.setState({locations});
    }

    showStartDateTimePicker = () => {
        this.setState({startDateTimePickerVisible: true});
    };

    showEndDateTimePicker = () => {
        this.setState({endDateTimePickerVisible: true});
    };

    showDatePicker = () => {
        this.setState({datePickerVisible: true});
    };

    hideStartDateTimePicker = () => {
        this.setState({startDateTimePickerVisible: false});
    };

    hideEndDateTimePicker = () => {
        this.setState({endDateTimePickerVisible: false});
    };

    hideDatePicker = () => {
        this.setState({datePickerVisible: false});
    };

    _cancel = () => {
        this.setState(freshState(this.props.owner), this.props.closeModal);
    };

    _createTeam = () => {
        const team = Team.create({...this.state, owner: this.props.owner});
        if (!team.name) {
            Alert.alert('Please give your team a name.');
        } else {
            this.props.actions.createTeam(team, this.props.currentUser);
            this.setState(freshState(this.props.owner), this.props.closeModal);
        }
    };

    // android returns 24hr time with leading zero and no am/pm designation so
    // we fix it up here to display consistently with ios
    fixAndroidTime = time => {
        const orig = time.split(':');
        const hour = orig[0];
        const hourNum = parseInt(hour, 10);
        const ampm = hourNum > 11 ? 'PM' : 'AM';
        const hr = hour[0] === '0' ? hour[1] : hourNum > 12 ? hourNum - 12 : hour; // TODO: Refactor this nested ternary :-(
        return `${hr}:${orig[1]} ${ampm}`;
    };

    _handleDatePicked = pickedDate => {
        const arr = pickedDate.toString().split(' ');
        const date = `${arr[0]} ${arr[1]} ${arr[2]} ${arr[3]}`;
        this.setTeamValue('date')(date);
        this.hideDatePicker();
    };

    _handleStartDatePicked = date => {
        let start = date.toLocaleTimeString('en-US', {hour12: true, hour: '2-digit', minute: '2-digit'});
        if (Platform.OS === 'android') {
            start = this.fixAndroidTime(start);
        }
        this.setTeamValue('start')(start);
        this.hideStartDateTimePicker();
    };

    _handleEndDatePicked = date => {
        let end = date.toLocaleTimeString('en-US', {hour12: true, hour: '2-digit', minute: '2-digit'});
        if (Platform.OS === 'android') {
            end = this.fixAndroidTime(end);
        }
        this.setTeamValue('end')(end);
        this.hideEndDateTimePicker();
    };

    setSelectedOption = option => {
        this.setState({isPublic: option.value});
    };

    setTeamValue = (key) => (value) => {
        this.setState({[key]: value});
    };

    findTown = query => {
        if (query === '') {
            return [];
        }
        return this.props.vermontTowns.filter(x => x.toLowerCase().indexOf(query.toLowerCase()) > -1);
    };

    render() {
        const isPublicOptions = [
            {
                label: 'Public',
                value: true
            }, {
                label: 'Private',
                value: false
            }
        ];

        // DateTimePicker
        const dateIsSelected = this.state.date === null;
        const endIsSelected = this.state.end === null;
        const startIsSelected = this.state.start === null;
        const {eventSettings} = this.props;

        function applyDateOffset(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }

        const minDate = applyDateOffset(eventSettings.date, -5);
        const maxDate = applyDateOffset(eventSettings.date, 5);

        // Autocomplete
        const {query} = this.state;
        const towns = this.findTown(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        const {otherCleanAreas} = this.props;
        return (
            <KeyboardAvoidingView
                style={[styles.frame, {paddingTop: 30}]}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
            >
                <View style={[styles.buttonBarHeader, {backgroundColor: '#EEE', marginTop: 10}]}>
                    <View style={styles.buttonBar}>
                        <TouchableHighlight style={styles.headerButton} onPress={this._createTeam}>
                            <Text style={styles.headerButtonText}>{'Save'}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.headerButton} onPress={this._cancel}>
                            <Text style={styles.headerButtonText}>{'Cancel'}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <ScrollView
                    style={styles.scroll}
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}
                    keyboardShouldPersistTaps={'always'}
                >
                    <View style={styles.infoBlockContainer}>
                        <View style={{marginTop: 10}}>
                            <Text style={styles.labelDark}>Team Name</Text>
                            <TextInput
                                keyBoardType={'default'}
                                onChangeText={this.setTeamValue('name')}
                                placeholder={'Team Name'}
                                style={styles.textInput}
                                value={this.state.name}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={[styles.labelDark, {fontSize: 12}]}>Private groups can only be joined by
                                invitation</Text>

                            <SegmentedControls
                                options={isPublicOptions}
                                onSelection={this.setSelectedOption}
                                selectedOption={this.state.isPublic}
                                selectedTint={'#EFEFEF'} tint={'#666666'}
                                extractText={(option) => option.label}
                                testOptionEqual={(selectedValue, option) => selectedValue === option.value}/>
                        </View>
                        <View style={{zIndex: 1, marginTop: 10}}>
                            <Text style={styles.labelDark}>Select Town/City</Text>
                            <Autocomplete
                                inputContainerStyle={{borderColor: '#000'}}
                                data={query.length > 0 &&
                                comp(query, towns[0] || '') ? [] : towns}
                                defaultValue={this.state.town || ''}
                                onChangeText={text => this.setState({query: text, town: text})}
                                underlineColorAndroid={'transparent'}
                                renderItem={town => (
                                    <TouchableOpacity
                                        style={styles.suggestion}
                                        onPress={() => {
                                            this.setState({query: '', town: town});
                                        }}>
                                        <Text>{town}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={styles.labelDark}>Clean Up Site</Text>
                            <TextInput
                                keyBoardType={'default'}
                                onChangeText={this.setTeamValue('location')}
                                placeholder={'Location'}
                                style={styles.textInput}
                                value={this.state.location}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={[styles.alertInfo, {textAlign: 'left'}]}
                                {
                                    `${moment(eventSettings.date).utc().format('dddd, MMM Do YYYY')} is the next ${eventSettings.name}, ` +
                                    'but teams may choose to work up to one week before or after.'
                                }
                            </Text>
                            <Text style={styles.labelDark}>Date</Text>
                            <View>
                                <TouchableOpacity onPress={this.showDatePicker}>
                                    <Text style={[styles.textInput, dateIsSelected && styles.selected]}>
                                        {this.state.date || 'Select a Date'}
                                    </Text>
                                </TouchableOpacity>
                                <DateTimePicker
                                    mode='date'
                                    date={new Date(eventSettings.date)}
                                    minimumDate={minDate}
                                    maximumDate={maxDate}
                                    isVisible={this.state.datePickerVisible}
                                    onConfirm={this._handleDatePicked}
                                    onCancel={this.hideDatePicker}
                                />
                            </View>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={styles.labelDark}>Start Time</Text>
                            <View>
                                <TouchableOpacity onPress={this.showStartDateTimePicker}>
                                    <Text style={[styles.textInput, startIsSelected && styles.selected]}>
                                        {this.state.start || 'Select a Time'}
                                    </Text>
                                </TouchableOpacity>
                                <DateTimePicker
                                    mode='time'
                                    isVisible={this.state.startDateTimePickerVisible}
                                    onConfirm={this._handleStartDatePicked}
                                    onCancel={this.hideStartDateTimePicker}
                                    is24Hour={false}
                                />
                            </View>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={styles.labelDark}>End Time</Text>
                            <View>
                                <TouchableOpacity onPress={this.showEndDateTimePicker}>
                                    <Text style={[styles.textInput, endIsSelected && styles.selected]}>
                                        {this.state.end || 'Select a Time'}
                                    </Text>
                                </TouchableOpacity>
                                <DateTimePicker
                                    mode='time'
                                    isVisible={this.state.endDateTimePickerVisible}
                                    onConfirm={this._handleEndDatePicked}
                                    onCancel={this.hideEndDateTimePicker}
                                    is24Hour={false}
                                />
                            </View>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={styles.labelDark}>Team Description</Text>
                            <TextInput
                                keyBoardType={'default'}
                                multiline={true}
                                numberOfLines={20}
                                textAlignVertical='top'
                                onChangeText={this.setTeamValue('notes')}
                                placeholder={'Tell us about your team'}
                                style={styles.textArea}
                                value={this.state.notes}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                    </View>
                    <View style={[styles.infoBlockContainer, {height: 450}]}>
                        <Text style={[styles.statusBar, {maxHeight: 63}]}>
                            Place a marker where you want your team to work. Other markers are areas claimed by other
                            teams.
                        </Text>
                        <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'red'}}>
                            <MapView style={{flex: 1}}
                                initialRegion={this.state.initialMapLocation}
                                onPress={this._handleMapClick}>
                                {this.state.locations.length > 0 && this.state.locations.map((marker, index) => (
                                    <MapView.Marker coordinate={marker.coordinates}
                                        key={`location${index}`}
                                        pinColor={'red'}
                                        onCalloutPress={this._removeMarker(marker)}
                                        stopPropagation={true}>
                                        <MultiLineMapCallout title={marker.title || 'Clean Area'}
                                            description={marker.description || 'Tap to remove'}/>
                                    </MapView.Marker>
                                ))}
                                {otherCleanAreas.length > 0 && otherCleanAreas.map((a, i) =>
                                    (<MapView.Marker
                                        key={i}
                                        coordinate={a.coordinates}
                                        // image={otherTeamsLocationImage}
                                        pinColor={'yellow'}
                                        title={a.title}
                                        stopPropagation={true}>
                                        <MultiLineMapCallout title={a.title} description={a.description}/>
                                    </MapView.Marker>
                                    ))}
                            </MapView>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={this._removeLastMarker}>
                            <Text style={styles.buttonText}>{'remove marker'}</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        Platform.OS === 'ios'
                            ? (<View style={defaultStyles.padForIOSKeyboardBig}/>)
                            : null
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state) => {
    const profile = state.profile;
    const currentUser = User.create({...state.login.user, ...removeNulls(state.profile)});
    const owner = TeamMember.create({...currentUser, ...profile, memberStatus: statuses.OWNER});
    const eventSettings = state.about || {};
    const otherCleanAreas = Object.values(state.teams.teams).reduce((areas, team) => areas.concat(team.locations.map(l => Object.assign({}, {
        key: '',
        coordinates: l.coordinates,
        title: `${team.name}`,
        description: 'claimed this area'
    }))), []);
    const vermontTowns = Object.keys(state.towns.townData).map(key => state.towns.townData[key].name);

    return {owner, currentUser, otherCleanAreas, vermontTowns, eventSettings};
};

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(actions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(NewTeam);
