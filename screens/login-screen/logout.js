// @flow
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import logo from "../../assets/images/green-up-logo.png";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
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

type PropsType = {
    actions: { logout: () => void }
};

const ABienTot = ({ actions }: PropsType): React$Element<View> => {

    useEffect(() => {
        actions.logout();
    }, []);


    return (
        <View style={ styles.container }>
            <Image source={ logo } style={ {
                height: 120,
                width: 120
            } }/>
            <Text style={ styles.welcome }>{ "Bye Bye" }</Text>
        </View>
    );
};

ABienTot.navigationOptions = {
    drawerLabel: "Logout"
};

const mapStateToProps = (state: Object): Object => ({ session: state.login.session });

const mapDispatchToProps = (dispatch: Dispatch<ActionType>): Object => ({
    actions: bindActionCreators(actionCreators, dispatch)
});


// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(ABienTot);
