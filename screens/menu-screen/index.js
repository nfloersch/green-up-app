// @flow
import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logout } from "../../action-creators/session-action-creators";
import { defaultStyles } from "../../styles/default-styles";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type PropsType = {
    actions: Object,
    navigation: Object
};

const MenuScreen = ({ actions, navigation }: PropsType): React$Element<View> => (
    <View style={ styles.frame }>
        <ScrollView style={ [styles.scroll, { paddingTop: 20, paddingLeft: 20, paddingRight: 20 }] }>
            <TouchableOpacity
                style={ styles.button }
                onPress={ () => {
                    navigation.navigate("Towns");
                } }
            >
                <Text style={ styles.buttonText }>{ "Town Info" }</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={ styles.button }
                onPress={ () => {
                    navigation.navigate("About");
                } }
            >
                <Text style={ styles.buttonText }>{ "About Green Up Day" }</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={ styles.button }
                onPress={ () => {
                    navigation.navigate("Profile");
                } }
            >
                <Text style={ styles.buttonText }>{ "My Profile" }</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={ styles.button }
                onPress={ () => {
                    navigation.navigate("Legal");
                } }
            >
                <Text style={ styles.buttonText }>{ "Legal" }</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={ styles.button }
                onPress={ actions.logout }
            >
                <Text style={ styles.buttonText }>{ "Log Out" }</Text>
            </TouchableOpacity>
            <View style={ { height: 20 } }/>
        </ScrollView>
    </View>
);

MenuScreen.navigationOptions = {
    title: "Menu"
};
const mapStateToProps = (): Object => ({});

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({
    actions: bindActionCreators({ logout }, dispatch)
});

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
