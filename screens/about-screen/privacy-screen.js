/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from './actions';
import {defaultStyles} from '../../styles/default-styles';
import {User} from '../../models/user';
import {removeNulls} from '../../libs/remove-nulls';

const myStyles = {};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);


class Privacy extends Component {
    static propTypes = {
        actions: PropTypes.object,
        currentUser: PropTypes.object,
        profile: PropTypes.object,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Privacy Policy'
    };

    constructor(props) {
        super(props);
        this._saveProfile = this._saveProfile.bind(this);
        this._changeText = this._changeText.bind(this);
        this._cancel = this._cancel.bind(this);
        this.state = Object.assign({}, props.profile);
    }


    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.profile) !== JSON.stringify(this.props.profile)) {
            this.setState(nextProps.profile);
        }
    }

    _saveProfile() {
        this.props.actions.saveProfile(this.state);
    }

    _cancel() {
        this.setState(this.props.profile, () => {
            this.props.navigation.goBack();
        });
    }

    _changeText(key) {
        return (text) => {
            this.setState({[key]: text});
        };
    }


    render() {
        return (
            <View style={styles.frame}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.infoBlockContainer}>
                        <Text style={styles.infoBlockHeader}>Privacy Policy</Text>
                        <View style={styles.infoBlock}>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                Effective Date: March, 29 2018
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                This privacy notice discloses the privacy practices for Green Up Vermont mobile
                                application. This privacy notice applies solely to information collected by this mobile
                                application, except where stated otherwise. It will notify you of the following:
                                What information we collect;
                                with whom it is shared;
                                how it can be corrected;
                                how it is secured;
                                how policy changes will be communicated; and
                                how to address concerns over misuse of personal data.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 14}]}>
                                Information Collection, Use, and Sharing
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                We are the sole owners of the information collected on this site. We only have access
                                to/collect information that you voluntarily give us via email, collected through our
                                mobile application or other direct contact from you. We will not sell or rent this
                                information to anyone.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                We will use your information to respond to you, regarding the reason you contacted us.
                                We will not share your information with any third party outside of our organization,
                                other than as necessary to fulfill your request.
                                Unless you ask us not to, we may contact you via email in the future to tell you about
                                specials, events or services, or changes to this privacy policy.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 14}]}>
                                Your Access to and Control Over Information
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                You may opt out of any future contacts from us at any time. You can do the following at
                                any time by contacting us via the email address or phone number provided on our website:
                                See what data we have about you, if any.
                                Change/correct any data we have about you.
                                Have us delete any data we have about you.
                                Express any concern you have about our use of your data
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 14}]}>
                                Registration
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                In order to use our mobile application, a user must first complete the registration
                                form. During registration a user is required to give certain information (such as name
                                and email address). This information is used to contact you about the products/services
                                on our site in which you have expressed interest. At your option, you may also provide
                                demographic information (such as gender or age) about yourself, but it is not required.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                We share aggregated demographic information with our partners and advertisers. This is
                                not linked to any personal information that can identify any individual person.
                                And/or:
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                We partner with another party to provide specific services. When the user signs up for
                                these services, we will share names, or other contact information that is necessary for
                                the third party to provide these services. These parties are not allowed to use
                                personally identifiable information except for the purpose of providing these services.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 14}]}>
                                Security
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                We take precautions to protect your information. When you submit sensitive information
                                via the mobile application, your information is protected both online and offline.
                                Wherever we collect sensitive information (such as credit card data), that information
                                is encrypted and transmitted to us in a secure way. You can verify this by looking for a
                                closed lock icon at the bottom of your web browser, or looking for "https" at the
                                beginning of the address of the web page.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                While we use encryption to protect sensitive information transmitted online, we also
                                protect your information offline. Only employees who need the information to perform a
                                specific job (e.g. billing or customer service) are granted access to personally
                                identifiable information. The computers/servers on which we store personally
                                identifiable information are kept in a secure environment.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 14}]}>
                                Links
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                This application contains links to other sites. Please be aware that we are not
                                responsible for the content or privacy practices of such other sites. We encourage our
                                users to be aware when they leave our site and to read the privacy statements of any
                                other site that collects personally identifiable information.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 14}]}>
                                Surveys & Contests
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                From time-to-time our site requests information via surveys or contests. Participation
                                in these surveys or contests is completely voluntary and you may choose whether or not
                                to participate and therefore disclose this information. Information requested may
                                include contact information (such as name and shipping address), and demographic
                                information (such as zip code, age level). Contact information will be used to notify
                                the winners and award prizes. Survey information will be used for purposes of monitoring
                                or improving the use and satisfaction of this site.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 14}]}>
                                Notification of Changes
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                Whenever material changes are made to the privacy notice specify how you will notify
                                consumers.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 14}]}>
                                Other Provisions as Required by Law
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                Numerous other provisions and/or practices may be required as a result of laws,
                                international treaties, or industry practices. It is up to you to determine what
                                additional practices must be followed and/or what additional disclosures are required.
                                Please take special notice of the California Online Privacy Protection Act (CalOPPA),
                                which is frequently amended and now includes a disclosure requirement for “Do Not Track”
                                signals.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                If you feel that we are not abiding by this privacy policy, you should contact us
                                immediately via telephone at (802) 229-4586 or via email at greenup@greenupvermont.org.

                            </Text>
                        </View>
                    </View>
                    <View style={defaultStyles.padForIOSKeyboard}/>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const currentUser = User.create({...state.login.user, ...removeNulls(state.profile)});
    const profile = state.profile.profile;
    return {profile, currentUser};
};

const mapDispatchToProps = dispatch => ({actions: bindActionCreators(actions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(Privacy);
