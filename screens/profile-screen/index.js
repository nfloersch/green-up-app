/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Image, TextInput, TouchableHighlight} from 'react-native';
import * as actions from './actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {User} from '../../models/user';

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 10,
        color: '#000',
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
    },
    buttonRow: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        marginTop: 10
    },
    button: {
        width: '49%',
        backgroundColor: '#F00',
        justifyContent: 'center',
        padding: 10,
        marginLeft: 3
    },
    inputRow: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        margin: 10
    },
    inputRowLabel: {
        width: '20%',
        margin: 5
    },
    inputRowControl: {
        width: '75%',
        margin: 5,
        borderStyle: 'solid',
        borderColor: '#AAA',
        borderWidth: 1,
        padding: 5
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
        title: 'Person'
    };

    constructor(props) {
        super(props);
        this._saveProfile = this._saveProfile.bind(this);
        this._changeText = this._changeText.bind(this);
        this._cancel = this._cancel.bind(this);
        this.state = Object.assign({}, props.profile);
    }


    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.profile) !== JSON.stringify(this.props.profile)) {
            this.setState(nextProps.profile);
        }
    }

    _saveProfile() {
        this.props.actions.saveProfile(this.state);
    }

    _cancel() {
        this.setState(this.props.profile, () => {
            this.props.navigation.goBack('Main');
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
            <View style={styles.container}>
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri: avatar}}
                />
                <View style={styles.inputRow}>
                    <Text style={styles.inputRowLabel}>{'My Name:'}</Text>
                    <TextInput
                        keyBoardType={'default'}
                        multiline={false}
                        numberOfLines={1}
                        onChangeText={this._changeText('displayName')}
                        placeholder={'your name'}
                        value={this.state.displayName}
                        style={styles.inputRowControl}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.inputRowLabel}>{'About Me:'}</Text>
                    <TextInput
                        keyBoardType={'default'}
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={this._changeText('bio')}
                        placeholder={'Maximum of 144 characters'}
                        value={this.state.bio}
                        style={styles.inputRowControl}
                    />
                </View>
                <View style={styles.buttonRow}>
                    <TouchableHighlight style={styles.button} onPress={this._saveProfile}>
                        <Text style={styles.buttonText}>Save Profile</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.button} onPress={this._cancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );

    }
}

function mapStateToProps(state) {
    const user = state.login.user;
    const profile = state.profile;
    const currentUser = User.create(Object.assign({}, user, profile));
    return {profile, currentUser};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
