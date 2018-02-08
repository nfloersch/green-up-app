/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import * as actions from './actions';
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

class MessageDetails extends Component {
    static propTypes = {
        actions: PropTypes.object,
        messages: PropTypes.object,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Message Details'
    };

    constructor(props) {
        super(props);
    }

    render() {
        const message = this.props.messages[this.props.navigation.state.params.messageId];
        return (
            <View style={styles.container}>
                {!message
                    ? (<Text>{message || 'Oops, sorry.  We could not find that message'}</Text>)
                    : (
                        <View>
                            <Text>From : {message.sender.email}</Text>
                            <Text>{message.text}</Text>
                        </View>
                    )
                }
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {messages: state.messages.messages};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetails);
