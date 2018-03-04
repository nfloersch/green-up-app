/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
    Picker,
    Platform,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {SegmentedControls} from 'react-native-radio-buttons';
import * as actions from './actions';
import {vermontTowns} from '../../libs/vermont-towns';
import {defaultStyles} from '../../styles/default-styles';
import Team from '../../models/team';

const myStyles = {
    selected: {
        opacity: 0.5
    }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class TeamEditorDetails extends Component {
    static propTypes = {
        actions: PropTypes.object,
        navigation: PropTypes.any,
        selectedTeam: PropTypes.object,
        screenProps: PropTypes.object,
        locations: PropTypes.array
    };

    static navigationOptions = {
        title: 'Team Details',
        tabBarLabel: 'Details',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({focused}) => (<Ionicons
            name={Platform.OS === 'ios' ? `ios-information-circle${focused ? '' : '-outline'}` : 'md-information'}
            size={24} color='blue'/>)
    };

    constructor(props) {
        super(props);
        this.state = {
            startDateTimePickerVisible: false,
            endDateTimePickerVisible: false,
            datePickerVisible: false
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
        this.props.actions.createTeam(selectedTeam, selectedTeam.id);
        this.props.screenProps.stacknav.goBack();
    };

    setTeamValue = (key) => (value) => {
        this.props.actions.setSelectedTeamValue(key, value);
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

        const {selectedTeam} = this.props;
        const dateIsSelected = selectedTeam.date === null;
        const endIsSelected = selectedTeam.end === null;
        const startIsSelected = selectedTeam.start === null;


        return (
            <ScrollView
                automaticallyAdjustContentInsets={false}
                scrollEventThrottle={200}
                style={styles.container}>

                <View>
                    <Text style={styles.label}>Team Name</Text>
                    <TextInput
                        keyBoardType={'default'}
                        onChangeText={this.setTeamValue('name')}
                        placeholder={'Team Name'}
                        style={styles.textInput}
                        value={selectedTeam.name}/>
                </View>

                <View style={{marginTop: 10}}>
                    <SegmentedControls
                        options={isPublicOptions}
                        onSelection={this.setSelectedOption}
                        selectedOption={selectedTeam.isPublic}
                        selectedTint={'#EFEFEF'} tint={'#666666'}
                        extractText={(option) => option.label}
                        testOptionEqual={(selectedValue, option) => selectedValue === option.value}/>
                </View>

                <View>
                    <Text style={styles.label}>Select Town/City</Text>
                    <Picker
                        itemStyle={{height: 45}}
                        selectedValue={selectedTeam.town}
                        onValueChange={this.setTeamValue('town')}>
                        {vermontTowns.map(town =>
                            (<Picker.Item key={town} label={town} value={town} style={{fontSize: 2}}/>))}
                    </Picker>
                </View>

                <View>
                    <Text style={styles.label}>Clean Up Site</Text>
                    <TextInput
                        keyBoardType={'default'}
                        onChangeText={this.setTeamValue('location')}
                        placeholder={'Location'}
                        style={styles.textInput}
                        value={selectedTeam.location}/>
                </View>

                <View>
                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.alertInfo}>
                        May 5th is the official Green Up Day, but teams
                        may choose to work up to one week before or after.
                    </Text>
                    <View>
                        <TouchableOpacity onPress={this.showDatePicker}>
                            <Text style={[styles.textInput, dateIsSelected && styles.selected]}>
                                {selectedTeam.date || 'Select a Date'}
                            </Text>
                        </TouchableOpacity>
                        <DateTimePicker
                            mode='date'
                            date={new Date('5/5/2018')}
                            minimumDate={new Date('4/28/2018')}
                            maximumDate={new Date('5/13/2018')}
                            isVisible={this.state.datePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this.hideDatePicker}
                        />
                    </View>
                </View>

                <View>
                    <Text style={styles.label}>Start Time</Text>
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

                <View>
                    <Text style={styles.label}>End Time</Text>
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

                <View>
                    <Text style={styles.label}>Notes</Text>
                    <TextInput
                        keyBoardType={'default'}
                        onChangeText={this.setTeamValue('notes')}
                        placeholder={'Notes'}
                        style={styles.textInput}
                        value={selectedTeam.notes}/>
                </View>

                <View style={styles.button}>
                    <Button
                        title='Save'
                        onPress={this.saveTeam}/>
                </View>

            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    const selectedTeam = state.teams.selectedTeam || Team.create({});
    const locations = state.teams.locations;
    return {selectedTeam, locations};
};

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(actions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(TeamEditorDetails);
