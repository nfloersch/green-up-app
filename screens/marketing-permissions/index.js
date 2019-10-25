// @flow
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { defaultStyles } from "../../styles/default-styles";
import * as actionCreators from "./actions";
import User from "../../models/user";
import { removeNulls } from "../../libs/remove-nulls";

const styles = StyleSheet.create(defaultStyles);

type PropsType = { actions: { saveProfile: UserType=> void }, currentUser: Object, marketingPermissions?: Object };

const MarketingPermissionsScreen = ({ actions, currentUser, marketingPermissions }: PropsType): React$Element<View> => {

    const updateMarketingConsent = (grantMarketingConsent: boolean) => {
        actions.saveProfile(
            User.create(Object.assign({}, currentUser, {
                grantMarketingConsent,
                marketingConsentUpdatedOn: new Date()
            }))
        );
    };

    const { permissionText, noButtonText, yesButtonText } = (marketingPermissions || {});

    return (
        <View>
            <Text style={ [styles.headerText, { marginTop: 30 }] }>{ permissionText }</Text>
            <TouchableOpacity style={ styles.headerButton } onPress={ () => {
                updateMarketingConsent(true);
            } }>
                <Text style={ styles.headerButtonText }>{ yesButtonText }</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ styles.headerButton } onPress={ () => {
                updateMarketingConsent(false);
            } }>
                <Text style={ styles.headerButtonText }>{ noButtonText }</Text>
            </TouchableOpacity>
        </View>
    );
};


const mapStateToProps = (state: Object): Object => {
    const currentUser = User.create({ ...state.login.user, ...removeNulls(state.profile) });
    const { marketingPermissions } = state.about;
    return { currentUser, marketingPermissions };
};

const mapDispatchToProps = (dispatch: Dispatch<ActionType>): Object => ({ actions: bindActionCreators(actionCreators, dispatch) });

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(MarketingPermissionsScreen);
