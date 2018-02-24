/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableHighlight, StyleSheet, Linking} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../login-screen/actions';
import {defaultStyles} from  '../../styles/default-styles';

const myStyles = {
	menuItem: {
		justifyContent: 'center',
		alignItems: 'center'
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
            <View style={styles.container}>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() => {
                        Linking.openURL('https://www.razoo.com/organization/Vermont-Green-Up');
                    }}
                >
                    <View style={styles.socialLogin}>
                        <Text style={styles.buttonText}>Support Green Up Day</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('About')}
                >
                    <View style={styles.socialLogin}>
                        <Text style={styles.buttonText}>About Green Up Day</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('Profile')}
                >
                    <View style={styles.socialLogin}>
                        <Text style={styles.buttonText}>Profile</Text>
                    </View>
                </TouchableHighlight>


                <TouchableHighlight
                    style={styles.button}
                    onPress={() => this.props.actions.logout()}
                >
                    <View style={styles.socialLogin}>
                        <Text style={styles.buttonText}>Log Out</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    return {
		};
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
