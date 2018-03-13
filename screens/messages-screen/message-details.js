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
import {defaultStyles} from '../../styles/default-styles';

const myStyles = {};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

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
            <View style={styles.container}>
                {!message
                    ? (<Text>{message || 'Oops, sorry.  We could not find that message'}</Text>)
                    : (
                        <View style={{alignSelf: 'flex-start'}}>
                          <Text style={styles.dataBlock}>
                            <Text style={styles.label}>{'From: '}</Text>
                            <Text style={styles.data}>
                              {message.sender.displayName}
                            </Text>
                          </Text>
                          <Text style={styles.dataBlock}>
                            <Text style={styles.label}>{'Team: '}</Text>
                            <Text style={styles.data}>
                              {team.name}
                            </Text>
                          </Text>
                          <Text style={styles.dataBlock}>
                            <Text style={styles.label}>{'Message: '}</Text>
                            <Text style={styles.data}>{message.text}</Text>
                          </Text>
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
