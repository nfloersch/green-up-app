// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CreateAccountForm from '../../components/create-account-form';
import * as actions from './actions';
import {defaultStyles} from '../../styles/default-styles';

const myStyles = {};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class CreateNewAccount extends Component {

    static propTypes = {
        actions: PropTypes.object,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Create New Account'
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={defaultStyles.frame}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
            >
                <ScrollView style={styles.scroll}>
                    <CreateAccountForm buttonText='Create Account' onButtonPress={this.props.actions.createUser}/>
                    {
                        Platform.OS === 'ios'
                            ? (<View style={defaultStyles.padForIOSKeyboardBig}/>)
                            : null
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state) => ({session: state.login.session});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewAccount);
