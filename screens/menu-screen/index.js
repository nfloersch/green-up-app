/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native';
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
										style={styles.menuItem}
                    onPress={() => this.props.actions.logout()}
                >
                	<Text>Log Out</Text>
                </TouchableHighlight>
            </View>);
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
