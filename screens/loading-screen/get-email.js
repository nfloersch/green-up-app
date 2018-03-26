/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {email} from '../../libs/validators';
import * as actions from './actions';
import {defaultStyles} from '../../styles/default-styles';
import {User} from '../../models/user';
import {removeNulls} from '../../libs/remove-nulls';
const myStyles = {container: {marginTop: '50%', padding: 20}};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class GetEmail extends Component {
    static propTypes = {
        actions: PropTypes.object,
        user: PropTypes.object
    };


    constructor(props) {
        super(props);
        this._saveProfile = this._saveProfile.bind(this);
        this.state = {email: null};
    }


    _saveProfile() {
        if(email(this.state.email)) {
            this.props.actions.updateEmail(this.state.email.trim().toLowerCase());
        } else {
            Alert.alert('Please enter a valid email address');
        }
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
    const user = User.create({...state.login.user, ...removeNulls(state.profile)});
    return {user};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GetEmail);
