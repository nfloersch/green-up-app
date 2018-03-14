/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, ScrollView, View} from 'react-native';
import * as actions from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {defaultStyles} from '../../styles/default-styles';

const myStyles = {messageHeader: {margin: 10}};

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
        const team = this.props.teams[teamId] || {};
        return (
            <View style={styles.frame}>
                {!message
                    ? (<Text>{message || 'Oops, sorry.  We could not find that message'}</Text>)
                    : (
                        <View style={{flex: 1}}>
                            <View style={{
                                borderBottomColor: '#CCC',
                                borderBottomWidth: 1
                            }}>
                                <Text style={styles.messageHeader}>{`From : ${message.sender.displayName}`}</Text>
                                <Text style={styles.messageHeader}>{`To: ${team.name}`}</Text>
                            </View>
                            <ScrollView style={{
                                padding: 10
                            }}>
                                <Text style={styles.data}>{message.text}</Text>
                            </ScrollView>
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
