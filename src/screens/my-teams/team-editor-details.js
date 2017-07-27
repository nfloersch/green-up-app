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
    FlatList
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as teamActions from './team-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {SegmentedControls} from 'react-native-radio-buttons'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%'
    },
    label: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    column: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#678',
        padding: 3,
        width: '100%'
    }
});

class TeamEditorDetails extends Component {
    static propTypes = {
        actions: PropTypes.object,
        selectedTeam: PropTypes.object
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
        this.state = {
            selectedOption: this.options[0],
            selectedTeam: {}
        };
    }

    componentWillMount() {
        this.setState({selectedTeam: this.props.selectedTeam});
    }
    componentWillReceiveProps(nextProps) {
        this.setState({selectedTeam: nextProps.selectedTeam});
    }
    setSelectedOption(option) {
        console.log(option);
        this.setState({selectedOption: option});
    }

    saveTeam() {
        this.props.actions.saveTeam(this.state.selectedTeam);
    }

    setTeamValue(key) {
        let newState = {};
        return (value) => {
            newState[key] = value;
            this.setState({selectedTeam: Object.assign({}, this.state.selectedTeam, newState)});
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <Text style={styles.label}>Team Name:</Text>
                    <TextInput keyBoardType={'default'} onChangeText={this.setTeamValue('name')} placeholder={'Team Name'} style={{
                        width: '80%'
                    }} value={this.state.selectedTeam.name}/>
                </View>
                <SegmentedControls options={this.options} onSelection={this.setSelectedOption} selectedOption={this.state.selectedOption} selectedTint={'#EFEFEF'} tint={'#666666'} extractText={(option) => option.label}/>

                <View style={styles.column}>
                    <Text style={styles.label}>Town:</Text>
                    <TextInput keyBoardType={'default'} onChangeText={this.setTeamValue('town')} placeholder={'Town'} style={{
                        width: '80%'
                    }} value={this.state.selectedTeam.location}/>
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Town:</Text>
                    <TextInput keyBoardType={'default'} onChangeText={this.setTeamValue('town')} placeholder={'Town'} style={{
                        width: '80%'
                    }} value={this.state.selectedTeam.location}/>
                </View>
                <Button title='Save' onPress={this.saveTeam}/>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {selectedTeam: state.teamReducers.selectedTeam};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(teamActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamEditorDetails);
