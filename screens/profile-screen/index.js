/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    Button,
    Platform
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from './actions';
import {User} from '../../models/user';
import {defaultStyles} from '../../styles/default-styles';

const myStyles = {
    aboutMeInput: {
        height: 80
    }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class Profile extends Component {
    static propTypes = {
        actions: PropTypes.object,
        currentUser: PropTypes.object,
        profile: PropTypes.object,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'My Profile'
    };

    constructor(props) {
        super(props);
        this._saveProfile = this._saveProfile.bind(this);
        this._changeText = this._changeText.bind(this);
        this._cancel = this._cancel.bind(this);
        this.state = Object.assign({}, props.currentUser);
    }


    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.profile) !== JSON.stringify(this.props.profile)) {
            this.setState(nextProps.profile);
        }
    }

    _saveProfile() {
        this.props.actions.saveProfile(User.create(Object.assign({}, this.props.currentUser, this.state)), this.props.teamMembers || {});
        this.props.navigation.goBack();
    }

    _cancel() {
        this.setState(this.props.profile, () => {
            this.props.navigation.goBack();
        });
    }

    _changeText(key) {
        return (text) => {
            this.setState({[key]: text});
        };
    }

    render() {
        const profile = this.props.profile;
        const avatar = profile.photoURL;

        return (
            <KeyboardAvoidingView
                style={defaultStyles.frame}
                behavior='padding'
            >
                <ScrollView style={styles.container}>
                    <View style={styles.profileHeader}>
                        <Image
                            style={{width: 50, height: 50}}
                            source={{uri: avatar}}
                        />
                        <Text style={[styles.profileName, styles.heading]}>
                            {this.state.displayName || ''}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.label}>{'My Name'}</Text>
                        <TextInput
                            style={styles.textInput}
                            keyBoardType={'default'}
                            multiline={false}
                            numberOfLines={1}
                            onChangeText={this._changeText('displayName')}
                            placeholder={'Your name'}
                            value={this.state.displayName}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>About Me</Text>
                        <TextInput
                            style={[styles.textInput, styles.aboutMeInput]}
                            keyBoardType={'default'}
                            multiline={true}
                            numberOfLines={5}
                            maxLength={144}
                            onChangeText={this._changeText('bio')}
                            placeholder={'Maximum of 144 characters'}
                            value={this.state.bio}
                        />
                    </View>
                    <View>
                        <Button
                            style={styles.button}
                            title='Save Profile'
                            onPress={this._saveProfile}/>
                        <TouchableHighlight onPress={this._cancel}>
                            <Text>Cancel</Text>
                        </TouchableHighlight>
                    </View>
                    {
                        Platform.OS === 'ios'
                            ? (<View style={defaultStyles.padForIOSKeyboardBig}/>)
                            : null
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        );

    }
}

function mapStateToProps(state) {
    const user = state.login.user;
    const profile = state.profile;
    const currentUser = User.create(Object.assign({}, user, profile));
    const teamMembers = state.teams.teamMembers;
    return {profile, currentUser, teamMembers};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
