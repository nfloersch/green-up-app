/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    TextInput,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import NavHeader from '../../components/NavHeader';
import MessageSummaries from './message-summaries';
import MessageDetails from './messge-details';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as messageActions from './messageActions';
import {MaterialIcons} from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%'
    },
    headerButton: {
        // flex: 1,
        width: 32
    },
    messages: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    inputStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 2,
        color: '#262626',
        fontSize: 18,
        fontWeight: '200',
        height: 40,
        width: '100%',
        textAlign: 'left',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        borderStyle: 'solid'
    }
});
class Messages extends Component {
    static propTypes = {
        actions: PropTypes.object,
        messages: PropTypes.array,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        drawerLabel: 'Messages',
        drawerIcon: () => (<MaterialCommunityIcons name='message-alert' size={24} color='blue'/>)
    };

    constructor(props) {
        super(props);
        this._onChangeState = this
            ._onChangeState
            .bind(this);
        this._addMessage = this
            ._addMessage
            .bind(this);
        this._switchView = this
            ._switchView
            .bind(this);
        this.state = {
            isDetailView: false,
            currentMessageId: null,
            newMessage: ''
        };
    }

    componentDidMount() {}

    _addMessage() {
        this
            .props
            .actions
            .addMessage({
                message: this.state.newMessage,
                _id: (new Date()).toISOString()
            });
        this.setState({newMessage: ''});
    }

    _switchView(messageView, messageId) {
        return () => {
            this.setState({messageView, messageId});
        };
    }

    _onChangeState(stateKey) {
        return (value) => {
            let newState = {};
            newState[stateKey] = value;
            this.setState(newState);
        };
    }

    render() {
        var messageView;

        var backButton = (
            <TouchableHighlight
                style={styles.headerButton}
                onPress={this._switchView('summaries', this.state.currentMessageId)}
                underlayColor={'rgba(0, 0, 0, 0.054)'}>
                <View style={styles.back_button}>
                    <MaterialIcons name='keyboardArrowLeft' size={24} color='blue'/>
                    <Text style={[styles.backButtonLabel]}>{'Back'}</Text>
                </View>
            </TouchableHighlight>
        );

        if (this.state.messageView === 'summaries') {
            messageView = (<MessageSummaries messages={this.props.messages} switchView={this._switchView}/>);
        } else {
            messageView = (<MessageDetails
                currentMessageId={this.state.currentMessageId}
                messages={this.props.messages}
                switchView={this._switchView}/>);
        }

        return (
            <View style={styles.container}>
                <NavHeader
                    backButton={backButton}
                    navigation={this.props.navigation}
                    screenTitle='Messages'
                    showBack={this.state.messageView !== 'summaries'}/>
                <TextInput
                    autoCorrect={false}
                    placeholder='new message'
                    value={this.state.newMessage}
                    onChangeText={this._onChangeState('newMessage')}
                    style={styles.inputStyle}/>
                <Button onPress={this._addMessage} title='add message'/>{messageView}
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
