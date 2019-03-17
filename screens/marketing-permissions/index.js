import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {defaultStyles} from '../../styles/default-styles';
import * as actions from './actions';
import User from '../../models/user';
import {removeNulls} from '../../libs/remove-nulls';

const myStyles = {
}

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class MarketingPermissionsScreen extends React.Component {
  constructor(props) {
    super(props);

    const { grantMarketingConsent } = props.currentUser;

    if(grantMarketingConsent === true || grantMarketingConsent === false) {
      this.props.navigation.navigate('Main');
    }
  }

  render() {
    const updateMarketingConsent = (grantMarketingConsent) => {
        this.props.actions.saveProfile(User.create(Object.assign({}, this.props.currentUser, {grantMarketingConsent, marketingConsentUpdatedOn: new Date()})));
        this.props.navigation.navigate('Main')
    }

    const {permissionText, noButtonText, yesButtonText} = this.props.marketingPermissions

    return (
      <View>
          <Text style={[styles.headerText, {marginTop: 30}]}>{permissionText}</Text>
          <TouchableOpacity style={styles.button} onPress={()=> updateMarketingConsent(true)}>
            <Text>{yesButtonText}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=> updateMarketingConsent(false)}>
            <Text>{noButtonText}</Text>
          </TouchableOpacity>
      </View>
  );
  }
}

function mapStateToProps(state) {
  const currentUser = User.create({...state.login.user, ...removeNulls(state.profile)});
  const {marketingPermissions} = state.about;
  return {currentUser, marketingPermissions}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketingPermissionsScreen)
