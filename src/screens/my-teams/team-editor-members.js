/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import * as teamActions from './team-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

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
class TeamEditorMembers extends Component {
    static propTypes = {
        actions: PropTypes.object,
        teams: PropTypes.array,
        stackNav: PropTypes.object
    };

    static navigationOptions = {
        title: 'Team Members',
        tabBarLabel: 'Members',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({tintColor}) => (<FontAwesome name='users' size={24} color='blue'/>)
    };
    constructor(props) {
        super(props);
        this.inviteContacts = this.inviteContacts.bind(this);
        this.inviteForm = this.inviteForm.bind(this);
    }

    inviteContacts() {
        this.props.screenProps.stacknav.navigate('InviteContacts');
    }

    inviteForm() {
        this.props.screenProps.stacknav.navigate('InviteForm');
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Team Editor Members Screen</Text>
                <Button onPress={this.inviteContacts} title='Invite Contacts'/>
                <Button onPress={this.inviteForm} title='Invite to Team'/>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {teams: state.teamReducers.teams};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(teamActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamEditorMembers);
