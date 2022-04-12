// @flow
import React, { Fragment } from "react";
import { StyleSheet, Alert, Linking, ScrollView, PixelRatio } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logout } from "../../action-creators/session-action-creators";
import { defaultStyles } from "../../styles/default-styles";
import * as constants from "../../styles/constants";
import { Text, Button, View } from "@shoutem/ui";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { publishDate, version } from "../../package.json";
// import { firebaseConfig } from "../../firebase-config.js";
import { getReleaseEnvironment } from "../../libs/releaseEnvironment.js";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);
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
    
    const envString = getReleaseEnvironment();

    return (<SafeAreaView style={ styles.container }>
        <ScrollView style={ styles.scroll }>
            <View style={ { margin: 20 } }>

                <Button
                    styleName="primary"
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
                </Button>
            </View>

                <View style={ { margin: 20 } }>
                    <Button
                        styleName="primary"
                        onPress={ ()=>{ Linking.openURL('https://www.mightycause.com/story/G00jvf')}}
                    >
                        <MaterialCommunityIcons
                            name="charity"
                            size={ 30 }
                            style={ { marginRight: 10 } }
                            color={ "#555" }
                        />
                        <Text style={ { ...styles.buttonText, fontSize } }>{ "Donate" }</Text>
                    </Button>
                </View>
                
                <View style={ { margin: 20 } }>
                    <Button
                        styleName="primary"
                        onPress={ ()=>{ Linking.openURL('https://www.mightycause.com/story/2g6ckf')}}
                    >
                        <MaterialCommunityIcons
                            name="tshirt-crew"
                            size={ 30 }
                            style={ { marginRight: 10 } }
                            color={ "#555" }
                        />
                        <Text style={ { ...styles.buttonText, fontSize } }>{ "Get Green Up Gear!" }</Text>
                    </Button>
                </View>

                <View style={ { margin: 20 } }>
                    <Button
                        styleName="primary"
                        onPress={ ()=>{ Linking.openURL('https://forms.gle/sxmGrZYsXzv9p7FU9')}} 
                    >
                        <MaterialCommunityIcons
                            name="comment-alert"
                            size={ 30 }
                            style={ { marginRight: 10 } }
                            color={ "#555" }
                        />
                        <Text style={ { ...styles.buttonText, fontSize } }>{ "Feedback" }</Text>
                    </Button>
                </View>
                <View style={ { margin: 20 } }>
                    <Button
                        styleName="primary"
                        onPress={ ()=>{ Linking.openURL('https://github.com/codeforbtv/green-up-app/blob/master/docs/contributorsGreatAndSmall.md')}} 
                    >
                        <MaterialCommunityIcons
                            name="account-group"
                            size={ 30 }
                            style={ { marginRight: 10 } }
                            color={ "#555" }
                        />
                        <Text style={ { ...styles.buttonText, fontSize } }>{ "Who Made This?" }</Text>
                    </Button>
                </View>

            <View style={ { margin: 20 } }>
                <Button
                    styleName="primary"

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
                </Button>
            </View>
            <View style={ { margin: 20 } }>

                <Button
                    styleName="primary"
                    onPress={ logoutHandler }
                >
                    <MaterialCommunityIcons
                        name="logout"
                        size={ 30 }
                        style={ { marginRight: 10 } }
                        color={ "#555" }
                    />
                    <Text style={ { ...styles.buttonText, fontSize } }>{ "Log Out" }</Text>
                </Button>
            </View>
            <View style={ { margin: 20 } }>
                <Text style={ { fontSize: 16, color: "#7fa54a", textAlign: "center" } }>{ `v${ version }` }</Text>
                { (envString !== 'Prod') && (
                    <Fragment>
                        <Text style={ { fontSize: 16, color: "#7fa54a", textAlign: "center" } }>{ `${ publishDate }` }</Text>
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
