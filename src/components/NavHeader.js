// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 20,
        justifyContent: 'space-between',
        borderBottomColor: '#E1E1E1',
        borderBottomWidth: 1
    },
    headerButton: {
        // flex: 1,
        width: 32
    },
    whitespace: {
        flex: 1
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    backButtonLabel: {
        color: '#397CA9',
        fontSize: 20
    },
    headerText: {
        flex: 1,
        alignSelf: 'center'
    },
    headerTextLabel: {
        fontSize: 20,
        textAlign: 'center'
    }
});
class NavHeader extends React.Component {
    static propTypes = {
        backButton: PropTypes.object,
        navigation: PropTypes.object,
        previousScreenName: PropTypes.string,
        screenTitle: PropTypes.string,
        showBackButton: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this._onPressButton = this
            ._onPressButton
            .bind(this);
        this._onNavigatorEvent = this
            ._onNavigatorEvent
            .bind(this);
        this.state = {
            drawerState: 'close'
        };
    }

    _onPressButton(drawerState : string) {
        function openClose(drawerAction) {
            return function () {
                if (drawerAction === 'close') {
                    this
                        .props
                        .navigation
                        .navigate('DrawerClose');
                } else {
                    this
                        .props
                        .navigation
                        .navigate('DrawerOpen');
                }
            };
        }

        if (drawerState === 'open' || drawerState === 'closed') {
            return () => {
                this.setState({
                    drawerState: drawerState
                }, openClose(drawerState));
            };
        }
        let newState = this.state.drawerState === 'open'
            ? 'close'
            : 'open';
        return this.setState({
            drawerState: newState
        }, openClose(newState));
    }

    _onNavigatorEvent() {
        this
            .props
            .navigation
            .pop();
    }

    render() {
        var defaultBackButton = (
            <TouchableHighlight
                style={styles.headerButton}
                onPress={this._onNavigatorEvent}
                underlayColor={'rgba(0, 0, 0, 0.054)'}>
                <View style={styles.back_button}>
                    <MaterialIcons name='keyboardArrowLeft' size={24} color='blue'/>
                    <Text style={[styles.backButtonLabel]}>{this.props.previousScreenName || 'back'}</Text>
                </View>
            </TouchableHighlight>
        );

        var backButton = this.props.showBackButton
            ? (this.props.backButton || defaultBackButton)
            : null;

        return (
            <View style={styles.header}>
                {backButton}
                <View style={styles.headerText}>
                    <Text style={styles.headerTextLabel}>{this.props.screenTitle || ' '}</Text>
                </View>
                <TouchableHighlight
                    style={styles.headerButton}
                    onPress={this._onPressButton('open')}
                    underlayColor={'rgba(0, 0, 0, 0.054)'}>
                    <MaterialIcons name='menu' size={32} color='black'/>
                </TouchableHighlight>
            </View>
        );
    }
}
export default NavHeader;
