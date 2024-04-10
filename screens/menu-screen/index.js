// @flow
import React, { Fragment } from "react";
import { StyleSheet, Alert, Linking, ScrollView, PixelRatio, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logout } from "../../action-creators/session-action-creators";
import { defaultStyles } from "../../styles/default-styles";
import * as constants from "../../styles/constants";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { publishDate } from "../../package.json";
import Constants from "expo-constants";
import { getReleaseEnvironment } from "../../libs/releaseEnvironment.js";
import * as Application from "expo-application";
import { PrimaryButton } from "@/components/button";

const myStyles = {};
const styles = StyleSheet.create({...defaultStyles, ...myStyles});
var fontSize = 25;

type PropsType = {
    actions: Object,
    navigation: Object
};

if (PixelRatio.get() <= 2) {
    fontSize = 16 // this is an arbitrary smaller value that might need to be adjusted
}

const MenuScreen = ({ actions, navigation }: PropsType): React$Element<View> => {
    const logoutHandler = () => {
        Alert.alert("Warning", "Are you sure you want to logout?", [
            { text: "No", style: "cancel" },
            { text: "Yes", style: "destructive", onPress: actions.logout }
        ]);
    };

    const envString = getReleaseEnvironment(Constants.expoConfig.extra.firebase.projectId);

    return (<SafeAreaView style={ styles.container }>
        <ScrollView style={ styles.scroll }>
            <View style={ { margin: 20 } }>

                <PrimaryButton
                    onPress={ () => {
                        navigation.navigate("Profile");
                    } }
                >
                    <MaterialCommunityIcons
                        name="account-box"
                        size={ 30 }
                        style={ { marginRight: 10 } }
                        color={ "#555" }
                    />
                    <Text style={ { ...styles.buttonText, fontSize } }>{ "My Profile" }</Text>
                </PrimaryButton>
            </View>

                <View style={ { margin: 20 } }>
                    <PrimaryButton
                        onPress={ ()=>{ Linking.openURL('https://givebutter.com/MT3kA9')}}
                    >
                        <MaterialCommunityIcons
                            name="charity"
                            size={ 30 }
                            style={ { marginRight: 10 } }
                            color={ "#555" }
                        />
                        <Text style={ { ...styles.buttonText, fontSize } }>{ "Donate" }</Text>
                    </PrimaryButton>
                </View>

                <View style={ { margin: 20 } }>
                    <PrimaryButton
                        onPress={ ()=>{ Linking.openURL('https://givebutter.com/GreenUpGear')}}
                    >
                        <MaterialCommunityIcons
                            name="tshirt-crew"
                            size={ 30 }
                            style={ { marginRight: 10 } }
                            color={ "#555" }
                        />
                        <Text style={ { ...styles.buttonText, fontSize } }>{ "Get Green Up Gear!" }</Text>
                    </PrimaryButton>
                </View>

                <View style={ { margin: 20 } }>
                    <PrimaryButton
                        onPress={ ()=>{ Linking.openURL('https://forms.gle/sxmGrZYsXzv9p7FU9')}}
                    >
                        <MaterialCommunityIcons
                            name="comment-alert"
                            size={ 30 }
                            style={ { marginRight: 10 } }
                            color={ "#555" }
                        />
                        <Text style={ { ...styles.buttonText, fontSize } }>{ "Feedback" }</Text>
                    </PrimaryButton>
                </View>
                <View style={ { margin: 20 } }>
                    <PrimaryButton
                        onPress={ ()=>{ Linking.openURL('https://github.com/codeforbtv/green-up-app/blob/master/docs/contributorsGreatAndSmall.md')}}
                    >
                        <MaterialCommunityIcons
                            name="account-group"
                            size={ 30 }
                            style={ { marginRight: 10 } }
                            color={ "#555" }
                        />
                        <Text style={ { ...styles.buttonText, fontSize } }>{ "Who Made This?" }</Text>
                    </PrimaryButton>
                </View>

            <View style={ { margin: 20 } }>
                <PrimaryButton
                    onPress={ () => {
                        navigation.navigate("Legal");
                    } }
                >
                    <Octicons
                        name="law"
                        size={ 30 }
                        style={ { marginRight: 10 } }
                        color={ "#555" }
                    />
                    <Text style={ { ...styles.buttonText, fontSize } }>{ "Legal Stuff" }</Text>
                </PrimaryButton>
            </View>
            <View style={ { margin: 20 } }>

                <PrimaryButton
                    onPress={ logoutHandler }
                >
                    <MaterialCommunityIcons
                        name="logout"
                        size={ 30 }
                        style={ { marginRight: 10 } }
                        color={ "#555" }
                    />
                    <Text style={ { ...styles.buttonText, fontSize } }>{ "Log Out" }</Text>
                </PrimaryButton>
            </View>
            <View style={ { margin: 20 } }>
                <Text style={ { fontSize: 16, color: "#7fa54a", textAlign: "center" } }>{ `v${ Application.nativeApplicationVersion }` }</Text>
                { (envString !== 'Prod') && (
                    <Fragment>
                        <Text style={ { fontSize: 16, color: "#7fa54a", textAlign: "center" } }>{ `Build: ${ Application.nativeBuildVersion }` }</Text>
                        <Text style={ { fontSize: 16, color: "#7fa54a", textAlign: "center" } }>{ `Published: ${ publishDate }` }</Text>
                        {/* Replace with eas update channels ^ */}
                        <Text style={ { fontSize: 16, color: "#7fa54a", textAlign: "center" } }>{ `Environment: ${ envString }` }</Text>
                    </Fragment>
                )}
            </View>
        </ScrollView>
    </SafeAreaView>);
};

MenuScreen.navigationOptions = {
    title: "Menu",
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
const mapStateToProps = (): Object => ({});

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({
    actions: bindActionCreators({ logout }, dispatch)
});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
