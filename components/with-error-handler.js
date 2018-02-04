// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';

const styles = StyleSheet.create({
    hasError: {
        height: 48,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.5,
        backgroundColor: 'red',
        width: '100%'
    },
    text: {
        fontSize: 16
    },
    noError: {
        height: 0
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%'
    }
});

const handleError = Symbol();
const dismissError = Symbol();

function _handleError(error: any) {
    let hasError = false;
    let errorMessage = '';

    switch (true) {
        case (typeof error === 'string' && error.trim().length > 0) :
            hasError = true;
            errorMessage = error;
            break;
        case (typeof error === 'object' && typeof error.message === 'string') :
            hasError = true;
            errorMessage = error.message;
            break;
        default:
            hasError = false;
            errorMessage = '';
    }
    console.warn(`ERROR: ${errorMessage}`);
    this.setState({hasError, error: errorMessage});
}

function _dismissError() {
    this.setState({hasError: false, error: ''});
}

export default function withErrorHandler(WrappedComponent) {

    return class WithErrorHandler extends Component {

        static PropTypes = {
            Component: PropTypes.object.isRequired
        };

        constructor(props) {
            super(props);
            this[handleError] = _handleError.bind(this);
            this[dismissError] = _dismissError.bind(this);
            this.state = {hasError: false, error: 'oops'};
        }

        render() {
            return (
                <View style={styles.container}>
                    <TouchableHighlight
                        onPress={this[dismissError]}
                        underlayColor={'rgba(255, 0, 0, 0.054)'}
                        style={this.state.hasError ? styles.hasError : styles.noError}
                    >
                        <View style={styles.row}>
                            <Text style={styles.text}>{this.state.error}</Text>
                        </View>
                    </TouchableHighlight>
                    <WrappedComponent {...this.props} handleError={this[handleError]}/>
                </View>
            );
        }
    };
}


