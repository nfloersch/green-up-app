/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {onNavigatorEvent, navButtons} from '../../libs/navigation-switch';
import * as messageActions from './messageActions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});
class Messages extends Component {
    static navigatorButtons = navButtons;
    static propTypes = {
        navigator: PropTypes.object
    };
    constructor(props) {
        super(props);
        this.toMessageDetail = this.toMessageDetail.bind(this);
        this._addMessage = this._addMessage.bind(this);
        this.props.navigator.setOnNavigatorEvent(onNavigatorEvent(this.props.navigator).bind(this));
    }
    componentDidMount() {
        this.props.navigator.setButtons(navButtons);
    }
    toMessageDetail() {}

    _addMessage() {
        this.props.actions.addMessage("foo bar");
    }
    render() {
        var myMessages = (this.props.messages || []).map(message => (
            <TouchableHighlight key={message._id}>
                <View onPress={this.toMessageDetail}>
                    <Text style={styles.welcome}>{message.message}</Text>
                </View>
            </TouchableHighlight>
        ));
        return (
            <View style={styles.container}>
                <Button onPress={this._addMessage} title='Add Message'/>{myMessages}
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {messages: state.messageReducer.messages};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(messageActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
