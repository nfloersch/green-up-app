// @flow

import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {defaultStyles} from '../../styles/default-styles';

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

export default class Privacy extends Component<Props> {

    static navigationOptions = {
        title: 'Privacy Policy'
    };

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

                    <View style={styles.infoBlockContainer}>
                        <Text style={styles.infoBlockHeader}>Terms and Conditions</Text>
                        <View style={styles.infoBlock}>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                Effective Date: March, 29 2018
                            </Text>

                            <Text style={[styles.textDark, {fontSize: 14}]}>
                                Introduction
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                These Mobile Application Standard Terms and Conditions written on this page shall manage
                                your use of this mobile application. These Terms will be applied fully and affect to
                                your use of this Mobile Application. By using this Mobile Application, you agreed to
                                accept all terms and conditions written in here. You must not use this Mobile
                                Application if you disagree with any of these Mobile Application Standard Terms and
                                Conditions.
                                Minors or people below 18 years old are not allowed to use this Mobile Application.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 14}]}>
                                Intellectual Property Rights
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                Other than the content you own, under these Terms, Green Up Vermont and/or its licensors
                                own all the intellectual property rights and materials contained in this Mobile
                                Application.
                                You are granted limited license only for purposes of viewing the material contained on
                                this Mobile Application.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 14}]}>
                                Restrictions </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                You are specifically restricted from all of the following:
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>

                                publishing any Mobile Application material in any other media;
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                selling, sublicensing and/or otherwise commercializing any Mobile Application material;
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                publicly performing and/or showing any Mobile Application material;
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                using this Mobile Application in any way that is or may be damaging to this Mobile
                                Application;
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                using this Mobile Application in any way that impacts user access to this Mobile
                                Application;
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                using this Mobile Application contrary to applicable laws and regulations, or in any way
                                may cause harm to the Mobile Application, or to any person or business entity;
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                engaging in any data mining, data harvesting, data extracting or any other similar
                                activity in relation to this Mobile Application;
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                using this Mobile Application to engage in any advertising or marketing.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                Certain areas of this Mobile Application are restricted from being access by you and
                                Green Up Vermont may further restrict access by you to any areas of this Mobile
                                Application, at any time, in absolute discretion. Any user ID and password you may have
                                for this Mobile Application are confidential and you must maintain confidentiality as
                                well.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 14}]}>
                                Your Content
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                In these Mobile Application Standard Terms and Conditions, "Your Content" shall mean any
                                audio, video text, images or other material you choose to display on this Mobile
                                Application. By displaying Your Content, you grant Green Up Vermont a non-exclusive,
                                worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish,
                                translate and distribute it in any and all media.
                                Your Content must be your own and must not be invading any third-partyâ€™s rights. Green
                                Up Vermont reserves the right to remove any of Your Content from this Mobile Application
                                at any time without notice.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 14}]}>
                                No warranties
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                This Mobile Application is provided "as is," with all faults, and Green Up Vermont
                                express no representations or warranties, of any kind related to this Mobile Application
                                or the materials contained on this Mobile Application. Also, nothing contained on this
                                Mobile Application shall be interpreted as advising you.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 14}]}>
                                Limitation of liability
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                In no event shall Green Up Vermont, nor any of its officers, directors and employees,
                                shall be held liable for anything arising out of or in any way connected with your use
                                of this Mobile Application whether such liability is under contract. Green Up Vermont,
                                including its officers, directors and employees shall not be held liable for any
                                indirect, consequential or special liability arising out of or in any way related to
                                your use of this Mobile Application.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 14}]}>
                                Indemnification
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                You hereby indemnify to the fullest extent Green Up Vermont from and against any and/or
                                all liabilities, costs, demands, causes of action, damages and expenses arising in any
                                way related to your breach of any of the provisions of these Terms.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 14}]}>
                                Severability
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                If any provision of these Terms is found to be invalid under any applicable law, such
                                provisions shall be deleted without affecting the remaining provisions herein.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 14}]}>
                                Variation of Terms
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                Green Up Vermont is permitted to revise these Terms at any time as it sees fit, and by
                                using this Mobile Application you are expected to review these Terms on a regular basis.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 14}]}>
                                Assignment
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                The Green Up Vermont is allowed to assign, transfer, and subcontract its rights and/or
                                obligations under these Terms without any notification. However, you are not allowed to
                                assign, transfer, or subcontract any of your rights and/or obligations under these
                                Terms.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 14}]}>
                                Entire Agreement
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                These Terms constitute the entire agreement between Green Up Vermont and you in relation
                                to your use of this Mobile Application, and supersede all prior agreements and
                                understandings.
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 14}]}>
                                Governing Law & Jurisdiction
                            </Text>
                            <Text style={[styles.textDark, {fontSize: 12}]}>
                                These Terms will be governed by and interpreted in accordance with the laws of the State
                                of Vermont, and you submit to the non-exclusive jurisdiction of the state and federal
                                courts located in Vermont for the resolution of any disputes.
                            </Text>
                        </View>
                    </View>
                    <View style={defaultStyles.padForIOSKeyboard}/>
                </ScrollView>
            </View>
        );
    }
}