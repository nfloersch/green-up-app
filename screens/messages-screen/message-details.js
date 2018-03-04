/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import * as actions from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
    label:{
      fontSize: 20,
      paddingTop: 5,
      paddingLeft: 5,
      fontWeight: 'bold'

    },
    data:{
      fontSize: 15,
      fontWeight: '400',

    },
    team:{
      fontSize: 20,
      fontWeight: 'bold',
      paddingLeft: 5
    },
    team_name:{
      fontSize: 20,
      fontWeight: 'bold',
    },
    message:{
      paddingTop: 5,
      paddingLeft: 15,
      borderTopWidth: 1,
      borderTopColor: '#000'

    }
});

class MessageDetails extends Component {
    static propTypes = {
        actions: PropTypes.object,
        messages: PropTypes.object,
        navigation: PropTypes.object,
        teams: PropTypes.object
    };

    static navigationOptions = {
        title: 'Message Details'
    };

    constructor(props) {
        super(props);
    }

    render() {
        const message = this.props.messages[this.props.navigation.state.params.messageId];
        const teamId = message.teamId;
        const team = Object.values(this.props.teams[teamId] || [])
        return (
            <View style={team}>
                {!message
                    ? (<Text>{message || 'Oops, sorry.  We could not find that message'}</Text>)
                    : (
                        <View style={styles.container}>
                          <Text style={styles.label}>
                            <Text>From:{' '}</Text>
                            <Text style={styles.data}>
                              {message.sender.displayName}
                            </Text>
                          </Text>
                          <Text style={styles.label}>
                            <Text>Team:{' '}</Text>
                            <Text style={styles.data}>
                              {team.name}
                            </Text>
                          </Text>
                          <Text style={styles.label}>Message:</Text>
                          <Text style={styles.message}>{message.text}</Text>
                        </View>
                    )
                }
            </View>
        );
    }
}

function mapStateToProps(state) {
    const teams = state.teams.teams;
    return {messages: state.messages.messages, teams: teams};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetails);
