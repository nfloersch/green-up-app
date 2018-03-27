/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableOpacity, StyleSheet, Linking, ScrollView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../login-screen/actions';
import {defaultStyles} from '../../styles/default-styles';

const myStyles = {};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class MenuScreen extends Component {
    static propTypes = {
        actions: PropTypes.object,
        messages: PropTypes.array,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Menu'
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.frame}>
                <ScrollView style={[styles.scroll, {paddingTop: 20, paddingLeft: 20, paddingRight: 20}]}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            Linking.openURL('https://www.razoo.com/organization/Vermont-Green-Up');
                        }}
                    >
                        <Text style={styles.buttonText}>Support Green Up Day</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('About')}
                    >
                        <Text style={styles.buttonText}>About Green Up Day</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('TrashBagFinder')}
                    >
                        <Text style={styles.buttonText}>Town Info</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Profile')}
                    >
                        <Text style={styles.buttonText}>My Profile</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.props.actions.logout}
                    >
                        <Text style={styles.buttonText}>Log Out</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}


const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
