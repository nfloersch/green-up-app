// @flow

import React, { Component } from "react";
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
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "./actions";
import User from "../../models/user";
import { defaultStyles } from "../../styles/default-styles";
import { removeNulls } from "../../libs/remove-nulls";

const myStyles = {
    aboutMeInput: {
        minHeight: 120
    }
};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type Props = {
    actions: {saveProfile: Object => void},
    currentUser: Object,
    profile: Object,
    navigation: Object
};

class Profile extends Component<Props> {

    static navigationOptions = {
        title: "My Profile"
    };

    constructor(props) {
        super(props);
        this.state = Object.assign({}, props.currentUser);
    }


    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.profile) !== JSON.stringify(this.props.profile)) {
            this.setState(nextProps.profile);
        }
    }


    render() {
        const { profile, actions, currentUser, navigation } = this.props;
        const avatar = profile.photoURL;
        const saveProfile = () => {
            actions.saveProfile(User.create(Object.assign({}, currentUser, this.state)));
            navigation.goBack();
        };

        const cancel = () => {
            this.setState(profile, () => {
                navigation.goBack();
            });
        };

        const changeText = (key) => (text) => {
            this.setState({ [key]: text });
        };

        return (
            <View style={ styles.frame }>
                <View style={ styles.buttonBarHeader }>
                    <View style={ styles.buttonBar }>
                        <View style={ styles.buttonBarButton }>
                            <TouchableOpacity style={ styles.headerButton } onPress={ saveProfile }>
                                <Text style={ styles.headerButtonText }>{ "Save Profile" }</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={ styles.buttonBarButton }>
                            <TouchableOpacity style={ styles.headerButton } onPress={ cancel }>
                                <Text style={ styles.headerButtonText }>{ "Cancel" }</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <KeyboardAvoidingView
                    style={ defaultStyles.frame }
                    behavior={ Platform.OS === "ios" ? "padding" : null }
                >
                    <ScrollView style={ styles.scroll }>
                        <View style={ [styles.infoBlockContainer, { height: 400 }] }>
                            <View style={ [styles.profileHeader, { backgroundColor: "white" }] }>
                                <Image
                                    style={ { width: 50, height: 50 } }
                                    source={ { uri: avatar } }
                                />
                                <Text style={ [styles.profileName, styles.heading] }>
                                    { this.state.displayName || "" }
                                </Text>
                            </View>
                            <View style={ { marginTop: 20 } }>
                                <Text style={ styles.labelDark }>{ "My Name" }</Text>
                                <TextInput
                                    style={ styles.textInput }
                                    keyBoardType={ "default" }
                                    multiline={ false }
                                    numberOfLines={ 1 }
                                    onChangeText={ changeText("displayName") }
                                    placeholder={ "Your name" }
                                    value={ this.state.displayName }
                                    underlineColorAndroid={ "transparent" }
                                />
                            </View>
                            <View style={ { marginTop: 20 } }>
                                <Text style={ styles.labelDark }>About Me</Text>
                                <TextInput
                                    style={ [styles.textInput, styles.aboutMeInput] }
                                    keyBoardType={ "default" }
                                    multiline={ true }
                                    textAlignVertical="top"
                                    numberOfLines={ 5 }
                                    maxLength={ 144 }
                                    onChangeText={ changeText("bio") }
                                    placeholder={ "Maximum of 144 characters" }
                                    value={ this.state.bio }
                                    underlineColorAndroid={ "transparent" }
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
    const currentUser = User.create({ ...state.login.user, ...removeNulls(state.profile) });
    return { profile, currentUser };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
