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
    TouchableOpacity,
    Platform
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from './actions';
import User from '../../models/user';
import {defaultStyles} from '../../styles/default-styles';
import {removeNulls} from '../../libs/remove-nulls';

const myStyles = {
    aboutMeInput: {
        minHeight: 120
    }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class Profile extends Component {
    static propTypes = {
        actions: PropTypes.object,
        currentUser: PropTypes.object,
        profile: PropTypes.object,
        navigation: PropTypes.object,
        teamMembers: PropTypes.object
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
            <View style={styles.frame}>
                <View style={styles.buttonBarHeader}>
                    <View style={styles.buttonBar}>
                        <View style={styles.buttonBarButton}>
                            <TouchableOpacity style={styles.headerButton} onPress={this._saveProfile}>
                                <Text style={styles.headerButtonText}>{'Save Profile'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonBarButton}>
                            <TouchableOpacity style={styles.headerButton} onPress={this._cancel}>
                                <Text style={styles.headerButtonText}>{'Cancel'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <KeyboardAvoidingView
                    style={defaultStyles.frame}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <ScrollView style={styles.scroll}>
                        <View style={[styles.infoBlockContainer, {height: 400}]}>
                            <View style={[styles.profileHeader, {backgroundColor: 'white'}]}>
                                <Image
                                    style={{width: 50, height: 50}}
                                    source={{uri: avatar}}
                                />
                                <Text style={[styles.profileName, styles.heading]}>
                                    {this.state.displayName || ''}
                                </Text>
                            </View>
                            <View style={{marginTop: 20}}>
                                <Text style={styles.labelDark}>{'My Name'}</Text>
                                <TextInput
                                    style={styles.textInput}
                                    keyBoardType={'default'}
                                    multiline={false}
                                    numberOfLines={1}
                                    onChangeText={this._changeText('displayName')}
                                    placeholder={'Your name'}
                                    value={this.state.displayName}
                                    underlineColorAndroid={'transparent'}
                                />
                            </View>
                            <View style={{marginTop: 20}}>
                                <Text style={styles.labelDark}>About Me</Text>
                                <TextInput
                                    style={[styles.textInput, styles.aboutMeInput]}
                                    keyBoardType={'default'}
                                    multiline={true}
                                    textAlignVertical='top'
                                    numberOfLines={5}
                                    maxLength={144}
                                    onChangeText={this._changeText('bio')}
                                    placeholder={'Maximum of 144 characters'}
                                    value={this.state.bio}
                                    underlineColorAndroid={'transparent'}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const profile = state.profile;
    const currentUser = User.create({...state.login.user, ...removeNulls(state.profile)});
    const teamMembers = state.teams.teamMembers;
    return {profile, currentUser, teamMembers};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
