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

const myStyles = {
    danger: {
        borderWidth: 1,
        borderColor: '#FAA',
        marginTop: 10,
        padding: 10
    },
    dangerText: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center'
    },
    selected: {
        opacity: 0.5
    }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type Props = {
    actions: Object,
    eventSettings: Object,
    goBack: () => void,
    selectedTeam: Object,
    screenProps: Object,
    locations: Array<Object>,
    vermontTowns: Array<Object>
};

class TeamEditorDetails extends Component<Props> {

    static navigationOptions = {
        title: 'Team Details',
        tabBarLabel: 'Details'
    };

    constructor(props) {
        super(props);
        this.state = {
            startDateTimePickerVisible: false,
            endDateTimePickerVisible: false,
            datePickerVisible: false,
            query: '',
            town: this.props.selectedTeam.town
        };
    }

    showStartDateTimePicker = () => this.setState({startDateTimePickerVisible: true});
    showEndDateTimePicker = () => this.setState({endDateTimePickerVisible: true});
    showDatePicker = () => this.setState({datePickerVisible: true});

    hideStartDateTimePicker = () => this.setState({startDateTimePickerVisible: false});
    hideEndDateTimePicker = () => this.setState({endDateTimePickerVisible: false});
    hideDatePicker = () => this.setState({datePickerVisible: false});

    // android returns 24hr time with leading zero and no am/pm designation so
    // we fix it up here to display consistently with ios
    fixAndroidTime = time => {
        const orig = time.split(':');
        const hour = orig[0];
        const hourNum = parseInt(hour, 10);
        const ampm = hourNum > 11 ? 'PM' : 'AM';
        const hr = hour[0] === '0' ? hour[1] : hourNum > 12 ? hourNum - 12 : hour;
        return `${hr}:${orig[1]} ${ampm}`;
    };

    _handleDatePicked = (pickedDate) => {
        const arr = pickedDate.toString().split(' ');
        const date = `${arr[0]} ${arr[1]} ${arr[2]} ${arr[3]}`;
        this.setTeamValue('date')(date);
        this.hideDatePicker();
    };

    _handleStartDatePicked = (date) => {
        let start = date.toLocaleTimeString('en-US', {hour12: true, hour: '2-digit', minute: '2-digit'});
        if (Platform.OS === 'android') {
            start = this.fixAndroidTime(start);
        }
        this.setTeamValue('start')(start);
        this.hideStartDateTimePicker();
    };

    _handleEndDatePicked = (date) => {
        let end = date.toLocaleTimeString('en-US', {hour12: true, hour: '2-digit', minute: '2-digit'});
        if (Platform.OS === 'android') {
            end = this.fixAndroidTime(end);
        }
        this.setTeamValue('end')(end);
        this.hideEndDateTimePicker();
    };

    setSelectedOption = (option) => {
        this.props.actions.setSelectedTeamValue('isPublic', option.value);
    };

    saveTeam = () => {
        const {selectedTeam} = this.props;
        selectedTeam.locations = this.props.locations;
        selectedTeam.town = this.state.town;
        this.props.actions.saveTeam(selectedTeam, selectedTeam.id);
    };

    deleteTeam = () => {
        Alert.alert(
            'DANGER!',
            'Are you really, really sure you want to permanently delete this team?',
            [
                {
                    text: 'No', onPress: () => {
                    }, style: 'cancel'
                },
                {
                    text: 'Yes', onPress: () => {
                        this.props.goBack();
                        this.props.actions.deleteTeam(this.props.selectedTeam.id);
                        // We should do something here?
                    }
                }
            ],
            {cancelable: true}
        );
    };

    setTeamValue = (key) => (value) => {
        this.props.actions.setSelectedTeamValue(key, value);
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

        const {selectedTeam, eventSettings} = this.props;

        // DateTimePicker
        const dateIsSelected = selectedTeam.date === null;
        const endIsSelected = selectedTeam.end === null;
        const startIsSelected = selectedTeam.start === null;

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

        return (
            <KeyboardAvoidingView
                style={defaultStyles.frame}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
            >

                <View style={styles.singleButtonHeader}>
                    <TouchableHighlight
                        style={styles.headerButton}
                        onPress={this.saveTeam}
                    >
                        <Text style={styles.headerButtonText}>
                            {'Save'}
                        </Text>
                    </TouchableHighlight>
                </View>


                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}
                    style={styles.scroll}
                    keyboardShouldPersistTaps={'always'}
                >
                    <View style={styles.infoBlockContainer}>
                        <View>
                            <Text style={styles.labelDark}>Team Name</Text>
                            <TextInput
                                keyBoardType={'default'}
                                onChangeText={this.setTeamValue('name')}
                                placeholder={'Team Name'}
                                style={styles.textInput}
                                value={selectedTeam.name}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={[styles.labelDark, {fontSize: 12}]}>Private groups can only be joined by
                                invitation</Text>
                            <SegmentedControls
                                options={isPublicOptions}
                                onSelection={this.setSelectedOption}
                                selectedOption={selectedTeam.isPublic}
                                selectedTint={'#EFEFEF'} tint={'#666666'}
                                extractText={(option) => option.label}
                                testOptionEqual={(selectedValue, option) => selectedValue === option.value}/>
                        </View>
                        <View style={{marginTop: 10, zIndex: 1}}>
                            <Text style={styles.labelDark}>Select Town/City</Text>
                            <Autocomplete
                                inputContainerStyle={{borderColor: '#000'}}
                                data={query.length > 0 &&
                                comp(query, towns[0] || '') ? [] : towns}
                                defaultValue={this.state.town || ''}
                                onChangeText={text => this.setState({query: text, town: text})}
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
                                value={selectedTeam.location}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={styles.labelDark}>Date</Text>
                            <Text style={[styles.alertInfo, {textAlign: 'left', padding: 5}]}>
                                {
                                    `${moment(eventSettings.date).utc().format('dddd, MMM Do YYYY')} is the next ${eventSettings.name}, ` +
                                    'but teams may choose to work up to one week before or after.'
                                }
                            </Text>
                            <View>
                                <TouchableOpacity onPress={this.showDatePicker}>
                                    <Text style={[styles.textInput, dateIsSelected && styles.selected]}>
                                        {selectedTeam.date || 'Select a Date'}
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
                                        {selectedTeam.start || 'Select a Time'}
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
                                        {selectedTeam.end || 'Select a Time'}
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
                                value={selectedTeam.notes}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                        <View style={{marginTop: 20}}>
                            <TouchableHighlight
                                style={styles.danger}
                                onPress={this.deleteTeam}
                            >
                                <Text style={styles.dangerText}>
                                    {'Delete Team'}
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={defaultStyles.padForIOSKeyboard}/>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state) => {
    const selectedTeam = state.teams.selectedTeam || Team.create({});
    const locations = state.teams.locations;
    const vermontTowns = Object.keys(state.towns.townData).map(key => state.towns.townData[key].name);
    const eventSettings = state.about || {};
    return {selectedTeam, locations, vermontTowns, eventSettings};
};

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(actions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(TeamEditorDetails);
