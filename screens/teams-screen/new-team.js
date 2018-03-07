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
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {SegmentedControls} from 'react-native-radio-buttons';
import * as actions from './actions';
import {vermontTowns} from '../../libs/vermont-towns';
import {defaultStyles} from '../../styles/default-styles';
import Team from '../../models/team';
import {TeamMember} from '../../models/team-member';
import * as statuses from '../../constants/team-member-statuses';

const myStyles = {
    selected: {
        opacity: 0.5
    }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);
const freshState = (owner) => ({
    ...Team.create({owner}),
    startDateTimePickerVisible: false,
    endDateTimePickerVisible: false,
    datePickerVisible: false
});

class NewTeam extends Component {
    static propTypes = {
        actions: PropTypes.object,
        closeModal: PropTypes.any, // TODO : this should be of type 'fun' but we get a prop warning.  Fix this hack. (JN)
        owner: PropTypes.object,
        locations: PropTypes.array
    };

    static navigationOptions = {
        title: 'Create A Team Details'
    };

    constructor(props) {
        super(props);
        this._cancel = this._cancel.bind(this);
        this._createTeam = this._createTeam.bind(this);
        this.showStartDateTimePicker = this.showStartDateTimePicker.bind(this);
        this.showEndDateTimePicker = this.showEndDateTimePicker.bind(this);
        this.hideStartDateTimePicker = this.hideStartDateTimePicker.bind(this);
        this.hideEndDateTimePicker = this.hideEndDateTimePicker.bind(this);
        this.showDatePicker = this.showDatePicker.bind(this);
        this.hideDatePicker = this.hideDatePicker.bind(this);
        this.fixAndroidTime = this.fixAndroidTime.bind(this);
        this._handleDatePicked = this._handleDatePicked.bind(this);
        this._handleStartDatePicked = this._handleStartDatePicked.bind(this);
        this._handleEndDatePicked = this._handleEndDatePicked.bind(this);
        this.setSelectedOption = this.setSelectedOption.bind(this);
        this.setTeamValue = this.setTeamValue.bind(this);
        this.state = freshState(props.owner);
    }

    showStartDateTimePicker() {
        this.setState({startDateTimePickerVisible: true});
    }

    showEndDateTimePicker() {
        this.setState({endDateTimePickerVisible: true});
    }

    showDatePicker() {
        this.setState({datePickerVisible: true});
    }

    hideStartDateTimePicker() {
        this.setState({startDateTimePickerVisible: false});
    }

    hideEndDateTimePicker() {
        this.setState({endDateTimePickerVisible: false});
    }

    hideDatePicker() {
        this.setState({datePickerVisible: false});
    }

    _cancel() {
        this.setState(freshState(this.props.owner), this.props.closeModal);
    }

    _createTeam() {
        console.log('CREATE TEAM!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        const team = Team.create({...this.state, locations: this.props.locations, owner: this.props.owner});
        this.props.actions.createTeam(team);
        this.setState(freshState(this.props.owner), this.props.closeModal);
    }

    // android returns 24hr time with leading zero and no am/pm designation so
    // we fix it up here to display consistently with ios
    fixAndroidTime(time) {
        const orig = time.split(':');
        const hour = orig[0];
        const hourNum = parseInt(hour, 10);
        const ampm = hourNum > 11 ? 'PM' : 'AM';
        const hr = hour[0] === '0' ? hour[1] : hourNum > 12 ? hourNum - 12 : hour;
        return `${hr}:${orig[1]}${ampm}`;
    }

    _handleDatePicked(pickedDate) {
        const arr = pickedDate.toString().split(' ');
        const date = `${arr[0]}${arr[1]}${arr[2]}${arr[3]}`;
        this.setTeamValue('date')(date);
        this.hideDatePicker();
    }

    _handleStartDatePicked(date) {
        let start = date.toLocaleTimeString('en-US', {hour12: true, hour: '2-digit', minute: '2-digit'});
        if (Platform.OS === 'android') {
            start = this.fixAndroidTime(start);
        }
        this.setTeamValue('start')(start);
        this.hideStartDateTimePicker();
    }


    _handleEndDatePicked(date) {
        let end = date.toLocaleTimeString('en-US', {hour12: true, hour: '2-digit', minute: '2-digit'});
        if (Platform.OS === 'android') {
            end = this.fixAndroidTime(end);
        }
        this.setTeamValue('end')(end);
        this.hideEndDateTimePicker();
    }


    setSelectedOption(option) {
        this.setState({isPublic: option.value});
    }


    setTeamValue = (key) => (value) => {
        this.setState({[key]: value});
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

        const dateIsSelected = this.state.date === null;
        const endIsSelected = this.state.end === null;
        const startIsSelected = this.state.start === null;


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
                        value={this.state.name}/>
                </View>
                <View style={{marginTop: 10}}>
                    <SegmentedControls
                        options={isPublicOptions}
                        onSelection={this.setSelectedOption}
                        selectedOption={this.state.isPublic}
                        selectedTint={'#EFEFEF'} tint={'#666666'}
                        extractText={(option) => option.label}
                        testOptionEqual={(selectedValue, option) => selectedValue === option.value}/>
                </View>

                <View>
                    <Text style={styles.label}>Select Town/City</Text>
                    <Picker
                        itemStyle={{height: 45}}
                        selectedValue={this.state.town}
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
                        value={this.state.location}/>
                </View>

                <View>
                    <Text style={styles.alertInfo}>
                        May 5th is the official Green Up Day, but teams
                        may choose to work up to one week before or after.
                    </Text>
                    <Text style={styles.label}>Date</Text>
                    <View>
                        <TouchableOpacity onPress={this.showDatePicker}>
                            <Text style={[styles.textInput, dateIsSelected && styles.selected]}>
                                {this.state.date || 'Select a Date'}
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

                <View>
                    <Text style={styles.label}>End Time</Text>
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

                <View>
                    <Text style={styles.label}>Notes</Text>
                    <TextInput
                        keyBoardType={'default'}
                        onChangeText={this.setTeamValue('notes')}
                        placeholder={'Notes'}
                        style={styles.textInput}
                        value={this.state.notes}/>
                </View>

                <View style={styles.button}>
                    <Button
                        title='Save'
                        onPress={this._createTeam}/>
                </View>
                <View style={styles.button}>
                    <Button
                        title='Cancel'
                        onPress={this._cancel}/>
                </View>

            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    const profile = state.profile;
    const user = state.login.user;
    const owner = TeamMember.create({...profile, ...user, memberStatus: statuses.OWNER});
    const locations = state.teams.locations;
    return {locations, owner};
};

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(actions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(NewTeam);
