import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {defaultStyles} from '../../styles/default-styles';
import * as actions from './actions';
import User from '../../models/user';
import {removeNulls} from '../../libs/remove-nulls';

const styles = StyleSheet.create(defaultStyles);
type Props = { actions?: { saveProfile: ()=> void }, currentUser?: Object, marketingPermissions?: Object}

class MarketingPermissionsScreen extends React.Component<Props> {
    render() {
        const updateMarketingConsent = (grantMarketingConsent) => {
            this.props.actions.saveProfile(User.create(Object.assign({}, this.props.currentUser, {
                grantMarketingConsent,
                marketingConsentUpdatedOn: new Date()
            })));
        };

        const {permissionText, noButtonText, yesButtonText} = this.props.marketingPermissions;

        return (
            <View>
                <Text style={[styles.headerText, {marginTop: 30}]}>{permissionText}</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => updateMarketingConsent(true)}>
                    <Text style={styles.headerButtonText}>{yesButtonText}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton} onPress={() => updateMarketingConsent(false)}>
                    <Text style={styles.headerButtonText}>{noButtonText}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const currentUser = User.create({...state.login.user, ...removeNulls(state.profile)});
    const {marketingPermissions} = state.about;
    return {currentUser, marketingPermissions};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketingPermissionsScreen);
