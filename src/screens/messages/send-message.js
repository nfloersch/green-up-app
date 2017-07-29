/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as messageActions from './messageActions';
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
    messages: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});
class SendMessage extends Component {
    static propTypes = {
        actions: PropTypes.object,
        messages: PropTypes.array
    };

    static navigationOptions = {
        title: 'Send Message'
    };
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Send Message Screen</Text>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {messages: state.messageReducer.session.user.messages};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(messageActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);
