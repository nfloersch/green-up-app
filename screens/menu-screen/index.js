/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableHighlight, StyleSheet, Linking, ScrollView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../login-screen/actions';
import {defaultStyles} from '../../styles/default-styles';

const myStyles = {
    menuButton: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#EEE',
        paddingTop: 8,
        marginBottom: 10
    },
    menuButtonText: {
        fontSize: 18,
        color: '#007AFF',
        textAlign: 'center',
        height: 40
    }
};

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
                <ScrollView style={[styles.scroll, {paddingTop: 20}]}>
                    <TouchableHighlight
                        style={styles.menuButton}
                        onPress={() => {
                            Linking.openURL('https://www.razoo.com/organization/Vermont-Green-Up');
                        }}
                    >
                        <View>
                            <Text style={styles.menuButtonText}>Support Green Up Day</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.menuButton}
                        onPress={() => this.props.navigation.navigate('About')}
                    >
                        <View>
                            <Text style={styles.menuButtonText}>About Green Up Day</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.menuButton}
                        onPress={() => this.props.navigation.navigate('TrashBagFinder')}
                    >
                        <View>
                            <Text style={styles.menuButtonText}>Find Bags & Get Town Info</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.menuButton}
                        onPress={() => this.props.navigation.navigate('Profile')}
                    >
                        <View>
                            <Text style={styles.menuButtonText}>My Profile</Text>
                        </View>
                    </TouchableHighlight>


                    <TouchableHighlight
                        style={styles.menuButton}
                        onPress={this.props.actions.logout}
                    >
                        <View>
                            <Text style={styles.menuButtonText}>Log Out</Text>
                        </View>
                    </TouchableHighlight>
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
