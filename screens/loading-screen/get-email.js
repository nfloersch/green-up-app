/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from './actions';
import {defaultStyles} from '../../styles/default-styles';

const myStyles = {container: {marginTop: '50%', padding: 20}};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class GetEmail extends Component {
    static propTypes = {
        user: PropTypes.object
    };


    constructor(props) {
        super(props);
        this._saveProfile = this._saveProfile.bind(this);
        this.state = {email: null};
    }


    _saveProfile() {
        // this.props.actions.saveProfile(User.create(Object.assign({}, this.props.currentUser, this.state)), this.props.teamMembers || {});
    }

    _changeText(key) {
        return (text) => {
            this.setState({[key]: text});
        };
    }

    render() {

        return (
            <View style={styles.frame}>
                <View style={styles.container}>
                    <Text style={styles.text}>We need an email to finish creating your account.</Text>
                    <Text style={styles.text}>We promise we'll never spam you.</Text>
                    <TextInput
                        placeHolder={'zoe@example.com'}
                        style={[styles.textInput, {marginTop: 10}]}
                        keyBoardType={'default'}
                        value={this.state.email}
                        onChangeText={this._changeText('email')}

                    />
                    <TouchableOpacity style={styles.button} onPress={this._saveProfile}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const user = state.login.user;

    return {user};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GetEmail);
