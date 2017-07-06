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
import {MaterialCommunityIcons} from '@expo/vector-icons';
import NavHeader from '../../components/NavHeader';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as messageActions from './messageActions';
let myID = 1235; // FOR TESTING ONLY DELETE ME
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%'
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
    static propTypes = {
        navigation: PropTypes.object
    };

    static navigationOptions = {
        drawerLabel: 'Messages',
        drawerIcon: ({tintColor}) => (
            <MaterialCommunityIcons name="message-alert" size={24} color="blue" />
        )
    };

    constructor(props) {
        super(props);
        this.toMessageDetail = this.toMessageDetail.bind(this);
        this._addMessage = this._addMessage.bind(this);
    }

    componentDidMount() {
    }

    toMessageDetail() {
    }

    _addMessage() {
        var id = myID += 1;
        this.props.actions.addMessage({message: "foo bar", _id: id});
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
                <NavHeader navigation={this.props.navigation}/>
                <Button
                    onPress={(() => {
                        this.props.navigation.navigate('DrawerOpen');
                    })}
                    title="open drawer"
                />
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
