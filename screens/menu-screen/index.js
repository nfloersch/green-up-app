// @flow
import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../login-screen/actions";
import { defaultStyles } from "../../styles/default-styles";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);


type Props = {
    actions: Object,
    navigation: Object
};

class MenuScreen extends Component<Props> {

    static navigationOptions = {
        title: "Menu"
    };

    render() {
        const { actions, navigation } = this.props;
        return (
            <View style={ styles.frame }>
                <ScrollView style={ [styles.scroll, { paddingTop: 20, paddingLeft: 20, paddingRight: 20 }] }>
                    <TouchableOpacity
                        style={ styles.button }
                        onPress={ () => navigation.navigate("Towns") }
                    >
                        <Text style={ styles.buttonText }>Events, Supplies & Info</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ styles.button }
                        onPress={ () => navigation.navigate("About") }
                    >
                        <Text style={ styles.buttonText }>About Green Up Day</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ styles.button }
                        onPress={ () => navigation.navigate("Profile") }
                    >
                        <Text style={ styles.buttonText }>My Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={ styles.button }
                        onPress={ () => navigation.navigate("Legal") }
                    >
                        <Text style={ styles.buttonText }>Privacy & Terms</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ styles.button }
                        onPress={ actions.logout }
                    >
                        <Text style={ styles.buttonText }>Log Out</Text>
                    </TouchableOpacity>
                    <View style={ { height: 20 } }/>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
