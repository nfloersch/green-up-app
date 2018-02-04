// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LoginForm from '../../components/login-form';
import * as loginActions from './actions';
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
    linkText: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    link: {}
});
class CreateNewAccount extends Component {

    static propTypes = {
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Create New Account'
    };
    constructor(props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
    }
    onButtonPress() {}

    render() {
        return (
            <View style={styles.container}>
                <Text>Create New Account</Text>
                <LoginForm buttonText='Create Account' onButtonPress={this.props.actions.createUser}/>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {session: state.loginReducer.session};
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewAccount );