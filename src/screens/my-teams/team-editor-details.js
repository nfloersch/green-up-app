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
    TouchableHighlight,
    View,
    Picker,
    ScrollView,
    FlatList
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as teamActions from './team-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {SegmentedControls} from 'react-native-radio-buttons';
import {vermontTowns} from '../../libs/vermont-towns';
import Team from '../../models/team';
import {TeamMember} from '../../models/team-member';
import {isDate} from '../../libs/isDate';

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#FFFFFF',
        height: '100%'
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

function createNewTeam(currentUser) {
    const owner = TeamMember.create(Object.assign({}, currentUser, {memberStatus: TeamMember.memberStatuses.ACCEPTED}));
    const members = [owner];
    return Team.create({owner, members});
}

class TeamEditorDetails extends Component {
    static propTypes = {
        actions: PropTypes.object,
        currentUser: PropTypes.object,
        selectedTeamId: PropTypes.string,
        teams: PropTypes.object
    };

    static navigationOptions = {
        title: 'Team Details',
        tabBarLabel: 'Details',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: () => (<MaterialCommunityIcons name='information' size={24} color='blue'/>)
    };

    constructor(props) {
        super(props);
        this.options = [
            {
                label: 'Public',
                value: 'public'
            }, {
                label: 'Private',
                value: 'private'
            }
        ];
        this.setTeamValue = this.setTeamValue.bind(this);
        this.setSelectedOption = this.setSelectedOption.bind(this);
        this.saveTeam = this.saveTeam.bind(this);
        this.state = {
            selectedOption: this.options[0],
            selectedTeamId: {}
        };
    }

    componentWillMount() {

        const selectedTeam = typeof this.props.selectedTeamId === 'string' ? this.props.teams[this.props.selectedTeamId] : createNewTeam(this.props.currentUser);
        this.setState({selectedTeam});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedTeamId !== this.props.selectedTeamId) {
            const selectedTeam = typeof nextProps.selectedTeamId === 'string' ? nextProps.teams[nextProps.selectedTeamId] : createNewTeam(nextProps.currentUser);
            this.setState({selectedTeam});
        }
    }

    setSelectedOption(option) {
        this.setState({selectedOption: option});
    }

    saveTeam() {
        this.props.actions.saveTeam(this.state.selectedTeam, this.props.selectedTeamId);
    }

    setTeamValue(key) {
        let newState = {};
        return (value) => {
            newState[key] = value;
            this.setState({selectedTeam: Object.assign({}, this.state.selectedTeam, newState)});
        };
    }

    render() {
       const selectedTeam = !!this.props.selectedTeamId ? this.props.teams[this.props.selectedTeamId] : Team.create();
        return (
            <ScrollView
                automaticallyAdjustContentInsets={false}
                scrollEventThrottle={200}
                style={styles.scrollView}>
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
                    options={this.options}
                    onSelection={this.setSelectedOption}
                    selectedOption={this.state.selectedOption}
                    selectedTint={'#EFEFEF'} tint={'#666666'}
                    extractText={(option) => option.label}/>

                <View style={styles.column}>
                    <Text style={styles.label}>Clean Up Location:</Text>
                    <Picker
                        selectedValue={this.state.town}
                        onValueChange={(itemValue) => this.setState({town: itemValue})}>
                        {vermontTowns.map(town => (<Picker.Item key={town} label={town} value={town}/>))}
                    </Picker>
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Location:</Text>
                    <TextInput keyBoardType={'default'} onChangeText={this.setTeamValue('location')} placeholder={'Location'} style={{
                        width: '80%'
                    }} value={selectedTeam.location}/>
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Start:</Text>
                    <TextInput keyBoardType={'default'} onChangeText={this.setTeamValue('start')} placeholder={'Start'} style={{
                        width: '80%'
                    }} value={isDate(selectedTeam.start) ? selectedTeam.start.toString() : ''}/>
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>End:</Text>
                    <TextInput keyBoardType={'default'} onChangeText={this.setTeamValue('end')} placeholder={'End'} style={{
                        width: '80%'
                    }} value={isDate(selectedTeam.end) ? selectedTeam.end.toString() : ''}/>
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Notes:</Text>
                    <TextInput keyBoardType={'default'} onChangeText={this.setTeamValue('Notes')} placeholder={'Notes'} style={{
                        width: '80%'
                    }} value={selectedTeam.notes}/>
                </View>
                <Button title='Save' onPress={this.saveTeam}/>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    const currentUser = state.loginReducer.user;
    const teams = state.teamReducers.teams;
    const selectedTeamId = state.teamReducers.selectedTeamId;
    return {selectedTeamId, teams, currentUser};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(teamActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamEditorDetails);
