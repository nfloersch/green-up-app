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
    ScrollView
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as actions from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {SegmentedControls} from 'react-native-radio-buttons';
import {vermontTowns} from '../../libs/vermont-towns';

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#FFFFFF',
        height: '60%'
    },
    label: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    column: {
        borderWidth: 1,
        borderColor: '#678',
        padding: 3,
        width: '100%'
    }
});

class TeamEditorDetails extends Component {
    static propTypes = {
        actions: PropTypes.object,
        navigation: PropTypes.any,
        selectedTeam: PropTypes.object,
        screenProps: PropTypes.object
    };

    static navigationOptions = {
        title: 'Team Details',
        tabBarLabel: 'Details',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: () => (<MaterialCommunityIcons name='information' size={24} color='blue'/>)
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedTeam: {...props.selectedTeam}
        };
    }

    setSelectedOption(option) {
        this.setTeamValue('isPublic')(option.value);
    }

    saveTeam() {
        this.props.actions.saveTeam(this.state.selectedTeam, this.state.selectedTeam.id);
        this.props.screenProps.stacknav.goBack();
    }

    setTeamValue(key) {
        return (value) => {
            const newSelectedTeam = Object.assign({}, this.state.selectedTeam);
            newSelectedTeam[key] = value;
            this.setState(Object.assign({}, this.state, {selectedTeam: newSelectedTeam}));
        };
    }

    render() {
        this.setTeamValue = this.setTeamValue.bind(this);
        this.setSelectedOption = this.setSelectedOption.bind(this);
        this.saveTeam = this.saveTeam.bind(this);
        const isPublicOptions = [
            {
                label: 'Public',
                value: true
            }, {
                label: 'Private',
                value: false
            }
        ];
       
        return (
            <ScrollView
                automaticallyAdjustContentInsets={false}
                scrollEventThrottle={200}
                style={styles.scrollView}>
                <Button title='Save' onPress={this.saveTeam}/>

                <View style={styles.column}>
                    <Text style={styles.label}>Team Name:</Text>
                    <TextInput
                        keyBoardType={'default'}
                        onChangeText={this.setTeamValue('name')}
                        placeholder={'Team Name'}
                        style={{
                            width: '80%'
                        }}
                        value={this.state.selectedTeam.name}/>
                </View>
                <SegmentedControls
                    options={isPublicOptions}
                    onSelection={this.setSelectedOption}
                    selectedOption={this.state.selectedTeam.isPublic}
                    selectedTint={'#EFEFEF'} tint={'#666666'}
                    extractText={(option) => option.label}
                    testOptionEqual={(selectedValue, option) => selectedValue === option.value}/>
                <View style={styles.column}>
                    <Text style={styles.label}>Clean Up Location:</Text>
                    <Picker
                        selectedValue={this.state.selectedTeam.town}
                        onValueChange={this.setTeamValue('town')}>
                        {vermontTowns.map(town => (<Picker.Item key={town} label={town} value={town}/>))}
                    </Picker>
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Location:</Text>
                    <TextInput keyBoardType={'default'} onChangeText={this.setTeamValue('location')} placeholder={'Location'} style={{
                        width: '80%'
                    }} value={this.state.selectedTeam.location}/>
                </View>

                <View style={styles.column}>
                    <Text style={styles.label}>Start:</Text>
                    <TextInput keyBoardType={'default'} onChangeText={this.setTeamValue('start')} placeholder={'Start'} style={{
                        width: '80%'
                    }} value={this.state.selectedTeam.start}/>
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>End:</Text>
                    <TextInput keyBoardType={'default'} onChangeText={this.setTeamValue('end')} placeholder={'End'} style={{
                        width: '80%'
                    }} value={this.state.selectedTeam.end}/>
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Notes:</Text>
                    <TextInput keyBoardType={'default'} onChangeText={this.setTeamValue('notes')} placeholder={'Notes'} style={{
                        width: '80%'
                    }} value={this.state.selectedTeam.notes}/>
                </View>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    const selectedTeam = state.teams.selectedTeam;
    return {selectedTeam};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamEditorDetails);
