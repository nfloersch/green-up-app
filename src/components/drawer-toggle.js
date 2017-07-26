// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

const styles = StyleSheet.create({

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
class DrawerToggle extends React.Component {
    static propTypes = {
        navigation: PropTypes.object
    };

    constructor(props) {
        super(props);
        this._onPressButton = this
            ._onPressButton
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

    render() {

        return (
            <TouchableHighlight
                style={styles.headerButton}
                onPress={this._onPressButton('open')}
                underlayColor={'rgba(0, 0, 0, 0.054)'}>
                <MaterialIcons name='menu' size={32} color='black'/>
            </TouchableHighlight>
        );
    }
}
export default DrawerToggle;
