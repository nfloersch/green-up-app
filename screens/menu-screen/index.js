/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import * as actions from '../login-screen/actions';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

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

    componentDidMount() {
    }


    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.socialLoginButton}
                    onPress={() => this.props.actions.logout()}
                >
                    <View style={styles.socialLogin}>
                        <Text style={styles.socialLoginText}>Log Out</Text>
                    </View>

                </TouchableHighlight>
            </View>);
    }
}


function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);

