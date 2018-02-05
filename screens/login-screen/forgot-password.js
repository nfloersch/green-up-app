// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import * as loginActions from './actions';
import {bindActionCreators} from 'redux';
import {connect, bindActionCreators} from 'react-redux';
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

class ForgotPassword extends Component {

    static propTypes = {
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Forgot Password'
    };
    constructor(props) {
        super(props);
        this.onButtonPress = this.onButtonPress.bind(this);
    }
    onButtonPress() {}

    render() {
        return (
            <View style={styles.container}>
                <Text>FORGOT PASSWORD</Text>
            </View>
        );
    }
}



function mapStateToProps(state, ownProps) {
    return {session: state.login.session};
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);