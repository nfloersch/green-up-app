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
    teams: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});
export default class TeamEditorDetails extends Component {
    static propTypes = {
        actions: PropTypes.object,
        teams: PropTypes.array
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
        this.setSelectedOption = this.setSelectedOption.bind(this);
        this.state = {
            selectedOption: this.options[0]
        };
    }

    setSelectedOption(option) {
        console.log(option);
        this.setState({selectedOption: option});
    }

    render() {

        return (
            <View style={styles.container}>
                <SegmentedControls options={this.options} onSelection={this.setSelectedOption} selectedOption={this.state.selectedOption} selectedTint={'#EFEFEF'} tint={'#666666'} extractText={(option) => option.label}/>
            </View>
        );
    }
}
