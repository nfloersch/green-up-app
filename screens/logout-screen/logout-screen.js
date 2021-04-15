// @flow
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/gu-50-logo.png";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../action-creators/session-action-creators";
import * as constants from "../../styles/constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
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
        <SafeAreaView style={ styles.container }>
            <View style={ { paddingTop: 50 } }>
                <Image source={ logo } style={ {
                    height: 120,
                    width: 120
                } }/>
                <Text style={ styles.welcome }>{ "Bye Bye" }</Text>
            </View>
        </SafeAreaView>
    );
};

ABienTot.navigationOptions = {
    drawerLabel: "Logout",
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
export default connect(mapStateToProps, mapDispatchToProps)(ABienTot);
