// @flow
import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import logo from "../../assets/images/green-up-logo.png";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as actionCreators from "./actions";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    linkText: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5
    },
    link: {},
    socialLoginButton: {
        borderColor: "#999999",
        borderStyle: "solid",
        borderWidth: 1,
        width: "100%",
        height: 60,
        backgroundColor: "mintcream",
        padding: 10,
        marginTop: 5
    },
    socialLogin: {
        flexWrap: "wrap",
        alignItems: "flex-start",
        flexDirection: "row"
    },
    socialLoginText: {
        fontSize: 24,
        marginTop: 8
    },
    logos: {
        width: 40,
        height: 40
    }
});

type Props = {
    actions: { logout: () => void },
    navigation: Object
};

class ABienTot extends Component<Props> {

    componentDidMount() {
        this.props.actions.logout();
    }

    static navigationOptions = {
        drawerLabel: "Logout",
        drawerIcon: () => (<MaterialCommunityIcons name="logout" size={ 24 } color="green"/>)
    };

    render() {
        return (
            <View style={ styles.container }>
                <Image source={ logo } style={ {
                    height: 120,
                    width: 120
                } }/>
                <Text style={ styles.welcome }>Bye Bye</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return { session: state.login.session };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ABienTot);
