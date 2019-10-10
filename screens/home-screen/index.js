// @flow
import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../login-screen/actions";
import { defaultStyles } from "../../styles/default-styles";
import {getUsersTeams} from "../../libs/team-helpers";
import User from "../../models/user";
import { removeNulls } from "../../libs/remove-nulls";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type PropsType = {
    actions: Object,
    navigation: Object,
    currentUser: Object,
    myTeams: Array<Object>
};

const HomeScreen = ({actions, navigation, currentUser, myTeams}: PropsType): React$Element<any> => {
    render() {
        const { actions, navigation } = this.props;
        return (
            <View style={ styles.frame }>
                <ScrollView style={ [styles.scroll, { paddingTop: 20, paddingLeft: 20, paddingRight: 20 }] }>
                    <TouchableHighlight
                        style={ styles.button }
                        onPress={ () => navigation.navigate("Towns") }
                    >
                        <Text style={ styles.buttonText }>Messages</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={ styles.button }
                        onPress={ () => navigation.navigate("Towns") }
                    >
                        <Text style={ styles.buttonText }>Start A Team</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={ styles.button }
                        onPress={ () => navigation.navigate("Towns") }
                    >
                        <Text style={ styles.buttonText }>Find A Team</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={ styles.button }
                        onPress={ () => navigation.navigate("Towns") }
                    >
                        <Text style={ styles.buttonText }>What to Do With Your Trash</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={ styles.button }
                        onPress={ () => navigation.navigate("Towns") }
                    >
                        <Text style={ styles.buttonText }>Finding Free Supplies</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={ styles.button }
                        onPress={ () => navigation.navigate("Towns") }
                    >
                        <Text style={ styles.buttonText }>Celebrations</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={ styles.button }
                        onPress={ () => navigation.navigate("Towns") }
                    >
                        <Text style={ styles.buttonText }>About Green Up</Text>
                    </TouchableHighlight>
                    <View style={ { height: 20 } }/>
                </ScrollView>
            </View>
        );
    }
};


HomeScreen.navigationOptions = {
    title: "Menu"
};

const mapStateToProps = (state) => {
    const user = User.create({ ...state.login.user, ...removeNulls(state.profile) });
    const teams = state.teams.teams || {};
    const myTeams = getUsersTeams(user, teams);
    return ({
        user, myTeams
    });
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
