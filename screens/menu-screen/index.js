// @flow
import React from "react";
import { StyleSheet, SafeAreaView, Alert } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logout } from "../../action-creators/session-action-creators";
import { defaultStyles } from "../../styles/default-styles";
import * as constants from "../../styles/constants";
import { Text, Button, View } from "@shoutem/ui";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { publishDate, version } from "../../package.json";
import { firebaseConfig } from "../../firebase-config.js";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);
const fontSize = 25;

type PropsType = {
    actions: Object,
    navigation: Object
};


const MenuScreen = ({ actions, navigation }: PropsType): React$Element<View> => {
    const logoutHandler = () => {
        Alert.alert("Warning", "Are you sure you want to logout?", [
            { text: "No", style: "cancel" },
            { text: "Yes", style: "destructive", onPress: actions.logout }
        ]);
    };

    return (<SafeAreaView style={ styles.container }>
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
            <Text style={ { fontSize: 16, color: "#7fa54a", textAlign: "center" } }>{ `${ version }` }</Text>
            <Text style={ { fontSize: 16, color: "#7fa54a", textAlign: "center" } }>{ `${ publishDate }` }</Text>
            <Text style={ { fontSize: 16, color: "#7fa54a", textAlign: "center" } }>{ `Firebase Target: ${ firebaseConfig.projectId }` }</Text>
        </View>

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
