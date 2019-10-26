// @flow

import React, { useReducer } from "react";
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

type PropsType = {
    actions: { saveProfile: Object => void },
    currentUser: UserType,
    navigation: Object
};

const reducer = (state: Object, action: ActionType): (Object | void) => {
    switch (action.type) {
        case "UPDATE_AVATAR":
            return { ...state, photoURL: action.data };
        case "UPDATE_DISPLAY_NAME":
            return { ...state, displayName: action.data };
        case "UPDATE_BIO":
            return { ...state, bio: action.data };
        default:
            throw new Error();
    }
};


const Profile = ({ actions, currentUser, navigation }: PropsType): React$Element<View> => {

    const [state, dispatch] = useReducer(reducer, currentUser);

    const { photoURL, displayName, bio } = (state || {});
    const saveProfile = () => {
        actions.saveProfile(User.create(Object.assign({}, currentUser, state)));
        navigation.goBack();
    };

    const cancel = navigation.goBack;

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
                                source={ { uri: photoURL } }
                            />
                            <Text style={ [styles.profileName, styles.heading] }>
                                { displayName || "" }
                            </Text>
                        </View>
                        <View style={ { marginTop: 20 } }>
                            <Text style={ styles.labelDark }>{ "My Name" }</Text>
                            <TextInput
                                style={ styles.textInput }
                                keyBoardType={ "default" }
                                multiline={ false }
                                numberOfLines={ 1 }
                                onChangeText={ (_displayName: string) => {
                                    dispatch({ type: "UPDATE_DISPLAY_NAME", data: _displayName });
                                } }
                                placeholder={ "Your name" }
                                value={ displayName || "" }
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
                                onChangeText={ (_bio: string) => {
                                    dispatch({ type: "UPDATE_BIO", data: _bio });
                                } }
                                placeholder={ "Maximum of 144 characters" }
                                value={ bio || "" }
                                underlineColorAndroid={ "transparent" }
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};


Profile.navigationOptions = {
    title: "My Profile"
};

const mapStateToProps = (state: Object): Object => {
    const currentUser = User.create({ ...state.login.user, ...removeNulls(state.profile) });
    return { currentUser };
};

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({ actions: bindActionCreators(actionCreators, dispatch) });

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
