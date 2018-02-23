/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import * as actions from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
    button: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 10,
        color: '#000',
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 10
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%'
    },
    headerButton: {
        // flex: 1,
        width: 32
    },
    message: {
        fontSize: 20,
        textAlign: 'left',
        margin: 15,
        color: 'red'
    },
    messageRead: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#555'
    },
    inputStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        paddingBottom: 2,
        color: '#262626',
        fontSize: 18,
        fontWeight: '200',
        height: 40,
        width: '100%',
        textAlign: 'left',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        borderStyle: 'solid'
    }
});

class Profile extends Component {
    static propTypes = {
        actions: PropTypes.object,
        currentUser: PropTypes.object,
        profile: PropTypes.object,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Person',
    };

    constructor(props) {
        super(props);
        this._updateProfile = this._updateProfile.bind(this);
    }



    _updateProfile() {

    }

    render() {
        const profile = this.props.profile;

        return (
            <View style={styles.container}>
                 <Text>Profile</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const currentUser = state.login.user;
    return {profile: state.profile.profile, currentUser};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
