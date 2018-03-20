/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    TouchableHighlight,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Platform,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {SegmentedControls} from 'react-native-radio-buttons';
import Autocomplete from 'react-native-autocomplete-input';
import {Ionicons} from '@expo/vector-icons';

import * as actions from './actions';
import {vermontTowns} from '../../libs/vermont-towns';
import {defaultStyles} from '../../styles/default-styles';
import Team from '../../models/team';
import {TeamMember} from '../../models/team-member';
import * as statuses from '../../constants/team-member-statuses';
import Colors from '../../constants/Colors';

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
    datePickerVisible: false,
    query: '',
    town: ''
});

class NewTeam extends Component {
    static propTypes = {
        actions: PropTypes.object,
        closeModal: PropTypes.any, // TODO : this should be of type 'fun' but we get a prop warning.  Fix this hack. (JN)
        owner: PropTypes.object,
        locations: PropTypes.array
    };

    static navigationOptions = {
        title: 'Team Details',
        tabBarLabel: 'Details',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({focused}) => (<Ionicons
            name={Platform.OS === 'ios' ? `ios-information-circle${focused ? '' : '-outline'}` : 'md-information'}
            size={24}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />)
    };

    constructor(props) {
        super(props);
        this.state = freshState(props.owner);
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
        console.log('CREATE TEAM!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        const team = Team.create({...this.state, locations: this.props.locations, owner: this.props.owner});
        if (!team.name) {
            Alert.alert('Please give your team a name.');
        } else {
            this.props.actions.createTeam(team);
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
        const hr = hour[0] === '0' ? hour[1] : hourNum > 12 ? hourNum - 12 : hour;
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
        return vermontTowns.filter(x => x.indexOf(query) > -1);
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

        // Autocomplete
        const {query} = this.state;
        const towns = this.findTown(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        return (
            <KeyboardAvoidingView
                style={[styles.frame, {paddingTop: 30}]}
                behavior ={Platform.OS === 'ios' ? 'padding' : null}
            >
                <View style={[styles.buttonBarHeader, {backgroundColor: '#EEE'}]}>
                    <View style={styles.buttonBar}>
                        <View style={styles.buttonBarButton}>
                            <TouchableHighlight style={styles.button} onPress={this._createTeam}>
                                <Text style={styles.headerButton}>{'Save'}</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.buttonBarButton}>
                            <TouchableHighlight style={styles.button} onPress={this._cancel}>
                                <Text style={styles.headerButton}>{'Cancel'}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <ScrollView
                    style={styles.scroll}
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}
                    keyboardShouldPersistTaps={'always'}
                >
                    <View>
                        <Text style={styles.label}>Team Name</Text>
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
                        <SegmentedControls
                            options={isPublicOptions}
                            onSelection={this.setSelectedOption}
                            selectedOption={this.state.isPublic}
                            selectedTint={'#EFEFEF'} tint={'#666666'}
                            extractText={(option) => option.label}
                            testOptionEqual={(selectedValue, option) => selectedValue === option.value}/>
                    </View>

                    <View style={{zIndex: 1}}>
                        <Text style={styles.label}>Select Town/City</Text>
                        <Autocomplete
                            inputContainerStyle={{borderColor: '#000'}}
                            data={query.length > 0 &&
                            comp(query, towns[0] || '') ? [] : towns}
                            defaultValue={this.state.town || ''}
                            onChangeText={text => this.setState({query: text})}
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

                    <View>
                        <Text style={styles.label}>Clean Up Site</Text>
                        <TextInput
                            keyBoardType={'default'}
                            onChangeText={this.setTeamValue('location')}
                            placeholder={'Location'}
                            style={styles.textInput}
                            value={this.state.location}
                            underlineColorAndroid={'transparent'}
                        />
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
                            multiline={true}
                            numberOfLines={20}
                            textAlignVertical='top'
                            onChangeText={this.setTeamValue('notes')}
                            placeholder={'Notes'}
                            style={styles.textArea}
                            value={this.state.notes}
                            underlineColorAndroid={'transparent'}
                        />
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
    const user = state.login.user;
    const owner = TeamMember.create({...user,...profile, memberStatus: statuses.OWNER});
    const locations = state.teams.locations;
    return {locations, owner};
};

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(actions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(NewTeam);
