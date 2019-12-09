// @flow

import React, { useState, Fragment } from "react";
import {
    Alert,
    StyleSheet,
    SafeAreaView
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isValidEmail } from "../../libs/validators";
import * as actionCreators from "../../action-creators/session-action-creators";
import { defaultStyles } from "../../styles/default-styles";
import { Button, Text, Title, Subtitle, TextInput, View } from "@shoutem/ui";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as constants from "../../styles/constants";


const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type PropsType = {
    actions: { resetPassword: string=>void },
    navigation: { goBack: any => void }
};

const Index = ({ actions, navigation }: PropsType): React$Element<any> => {

    const [email, setEmail] = useState("");
    const [passwordResetSent, setPasswordResetSent] = useState(false);

    const onButtonPress = () => {
        if (isValidEmail(email)) {
            actions.resetPassword(email);
            setPasswordResetSent(true);
        } else {
            Alert.alert("Please enter a valid email address");
        }
    };

    return (
        <SafeAreaView style={ styles.container }>
            <View style={ { paddingLeft: 20, paddingRight: 20, flex: 1, paddingTop: 50 } }>
                { passwordResetSent
                    ? (
                        <Fragment>
                            <View style={ { ...styles.formControl, marginBottom: 40 } }>
                                <Title style={ {
                                    textAlign: "left",
                                    color: "#FFF"
                                } }>
                                    { "A link to reset your password has been sent to your email." }
                                </Title>
                            </View>
                            <View style={ styles.formControl }>
                                <Button
                                    styleName={ "secondary" }
                                    style={ { padding: 10, paddingLeft: 20, paddingRight: 20 } }
                                    onPress={ () => {
                                        navigation.goBack();
                                    } }
                                >
                                    <Subtitle styleName={ "bold" }
                                              style={ {
                                                  textAlign: "center",
                                                  color: "#FFF"
                                              } }>{ "RETURN TO LOGIN" }</Subtitle>
                                </Button>
                            </View>
                        </Fragment>
                    )
                    : (
                        <Fragment>
                            <View style={ styles.formControl }>
                                <Text style={ styles.label }>{ "Email Address" }</Text>
                                <TextInput
                                    autoCorrect={ false }
                                    value={ email }
                                    keyBoardType="email-address"
                                    placeholder="you@domain.com"
                                    onChangeText={ setEmail }
                                    underlineColorAndroid={ "transparent" }
                                />
                            </View>
                            <View style={ styles.formControl }>
                                <Button onPress={ onButtonPress }
                                        styleName={ "primary" }
                                        style={ {
                                            padding: 10,
                                            paddingLeft: 20,
                                            paddingRight: 20
                                        } }
                                >
                                    <MaterialCommunityIcons
                                        name={ "account-convert" }
                                        style={ { marginRight: 10 } }
                                        size={ 25 }
                                        color="#555"
                                    />
                                    <Subtitle
                                        styleName={ "bold" }
                                        style={ {
                                            textAlign: "center",
                                            color: "#555",
                                            fontFamily: "Rubik-Regular"
                                        } }
                                    >
                                        { "RESET PASSWORD" }
                                    </Subtitle>
                                </Button>
                            </View>
                        </Fragment>
                    )
                }
            </View>
        </SafeAreaView>
    );
};


Index.navigationOptions = {
    title: "Forgot Password",
    headerStyle: {
        backgroundColor: constants.colorBackgroundDark
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        fontFamily: "Rubik-Regular",
        fontWeight: "bold",
        fontSize: 20,
        color: constants.colorHeaderText
    },
    headerBackTitleStyle: {
        fontFamily: "Rubik-Regular",
        fontWeight: "bold",
        fontSize: 20,
        color: constants.colorHeaderText
    }
};

const mapStateToProps = (state: Object): Object => ({ session: state.login.session });

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(Index);
