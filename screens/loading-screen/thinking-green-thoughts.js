// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    Image, ScrollView, StyleSheet, Text, View, Alert
} from 'react-native';

import * as actions from './actions';
import logo from '../../assets/images/green-up-logo.png';
import {defaultStyles} from '../../styles/default-styles';


const myStyles = {
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40
    },
    linkText: {
        textAlign: 'center',
        color: '#333',
        fontSize: 10,
        marginBottom: 5
    }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class ThinkingGreenThoughts extends Component {

    static propTypes = {
        actions: PropTypes.object,
        loginError: PropTypes.any,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Log In'
    };

    constructor(props) {
        super(props);
    }


    componentWillReceiveProps(nextProps) {
        if (!!nextProps.loginError) {
            this.props.actions.isLoggingInViaSSO(false);
            Alert.alert(
                '',
                (nextProps.loginError.message || 'Login Failed'),
                [
                    {
                        text: 'OK', onPress: () => {
                        }
                    }
                ],
                {cancelable: false}
            );
        }
    }

    render() {
        return (
            <ScrollView style={styles.frame}>
                <View style={{paddingTop: 60}}>
                    <View style={styles.logo}>
                        <Image source={logo} style={{height: 120, width: 120}}/>
                    </View>
                    <View style={{width: '100%'}}>
                        <Text style={[styles.text, {textAlign: 'center'}]}>{'Thinking green thoughts...'}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.login.user,
    initialAuthChecked: state.login.initialAuthChecked,
    loginError: state.login.loginError
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ThinkingGreenThoughts);
