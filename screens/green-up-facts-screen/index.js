// @flow
import React from "react";
import { StyleSheet, Text, View, ScrollView, Linking } from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import Anchor from "../../components/anchor";
import { defaultStyles } from "../../styles/default-styles";
import { isValidDate } from "../../libs/validators";
import { getCurrentGreenUpDay } from "../../libs/green-up-day-calucators";
import * as constants from "../../styles/constants";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type PropsType = {
    eventDescription: Object,
    contactUs: any,
    eventName: string,
    eventDate: Date,
    navigation: Object,
    faqs: Array<{ question: string, answer: string }>
};

const GreenUpFacts = ({ eventDescription, contactUs, eventName, eventDate, faqs }: PropsType): React$Element<View> => {
    const displayFaqs = Array.isArray(faqs) && faqs.length > 0;
    return (
        <View style={ styles.frame }>
            <ScrollView style={ styles.scroll }>
                <View style={ styles.infoBlockContainer }>
                    <View style={ styles.infoBlockHeader }>
                        <Text style={ styles.headerText }>{ eventName }</Text>
                        <Text style={ styles.headerText }>
                            { moment(isValidDate(eventDate) ? eventDate : getCurrentGreenUpDay()).utc().format("dddd, MMMM Do YYYY") }
                        </Text>
                    </View>
                    <Text
                        style={ [styles.textDark, {
                            textAlign: "justify",
                            fontSize: 16
                        }] }>{ eventDescription }</Text>
                </View>

                <View style={ styles.infoBlockContainer }>
                    <Text style={ [styles.textDark, {
                            textAlign: "justify",
                            fontSize: 16
                        }] }>
                        The 2020 Winning Essay
                    </Text>
                    <Text style={ [styles.textDark, {
                            textAlign: "justify",
                            fontSize: 16,
                            fontFamily: "Rubik-Bold"
                        }] }>
                        By Camryn Crossmon of Chittenden, VT
                    </Text>
                    <Text style={{textAlign: "left", fontSize: 16, marginBottom: 5}}>
                        50 years of greening up and we're still going strong! The reason Vermonters celebrate Green Up Day is so we can help our community. I feel this event is really important because it makes the environment a better place. Without all that trash around it is much safer, much cleaner, and most of all prettier.
                    </Text>
                    <Text style={{textAlign: "left", fontSize: 16, marginBottom: 5}}>
                        We are called the Green Mountain State for a reason. We have some of the most amazing scenery in the country. The greenery we are famous for gets hidden when our roadways are littered with trash. It's sad. That's why it's important for everyone to pitch in every year on the first Saturday in May so we can live up to our name. 
                    </Text>
                    <Text style={{textAlign: "left", fontSize: 16, marginBottom: 5}}>
                        Another reason to take part in Green Up Day is that it shows how people can do things locally to contribute to saving the planet. Cleaning up trash keeps toxins out of our waterways and improves the health of our Earth. 
                    </Text>
                    <Text style={{textAlign: "left", fontSize: 16, marginBottom: 5}}>
                        On the next Green Up Day gather your friends and volunteer to clean your local community. You can have fun while helping keep our state beautiful. Plus, if someone sees you doing it they may be inspired to join in!
                    </Text>
                    <Text style={{textAlign: "center", fontSize: 16, marginBottom: 5, fontFamily: "Rubik-Bold"}}
                        onPress={ ()=>{ Linking.openURL('https://greenupvermont.org/client_media/Past%20Writing%20Contest%20winners_2007_2018.pdf')}}>
                        Tap Here To Read The Other Great School Essays!
                    </Text>
                </View>
                {
                    displayFaqs && (
                        <View style={ styles.infoBlockContainer }>
                            <Text style={ styles.infoBlockHeader }>FAQ's</Text>
                            <View>
                                {
                                    faqs.map(
                                        (faq: Object, i: number): React$Element<View> => (
                                            <View key={ i } style={ styles.infoBlock }>
                                                <Text style={ [styles.textDark, {
                                                    textAlign: "justify",
                                                    fontSize: 18
                                                }] }>{ faq.question }</Text>
                                                <Text style={ [styles.textDark, {
                                                    textAlign: "justify",
                                                    fontSize: 16
                                                }] }>{ faq.answer }</Text>
                                            </View>
                                        )
                                    )
                                }
                            </View>
                        </View>
                    )
                }
                <View style={ styles.infoBlockContainer }>
                    <Text style={ styles.infoBlockHeader }>Contact Us</Text>
                    <View style={ styles.infoBlock }>
                        <Text style={ [styles.textDark, { fontSize: 18 }] }>{ contactUs.fullName }</Text>
                        <Text style={ [styles.textDark, { fontSize: 16 }] }>Phone: <Anchor
                            style={ [styles.textDark, { fontSize: 16, textDecorationLine: "underline" }] }
                            href={ `tel:${ contactUs.phoneNumber }` }>{ contactUs.phoneNumber }</Anchor></Text>
                        <Text style={ [styles.textDark, { fontSize: 16 }] }>Email: <Anchor
                            style={ [styles.textDark, { fontSize: 16, textDecorationLine: "underline" }] }
                            href={ `mailto:${ contactUs.email }` }>{ contactUs.email }</Anchor></Text>
                        <Text style={ [styles.textDark, { fontSize: 16 }] }>By mail: </Text>
                        <Text style={ [styles.textDark, { fontSize: 16 }] }>{ contactUs.fullName }</Text>
                        <Text style={ [styles.textDark, { fontSize: 16 }] }>{ contactUs.addressLine1 }</Text>
                        <Text style={ [styles.textDark, { fontSize: 16 }] }>{ contactUs.addressLine2 }</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};


GreenUpFacts.navigationOptions = {
    title: "About Green Up Day",
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

const mapStateToProps = (state: Object): Object => {
    const eventDate = state.about.date || null;
    const eventDescription = state.about.description || "";
    const faqs = state.about.faqs || [];
    const eventName = state.about.name;
    const contactUs = state.about.contactUs || {};
    return { eventDate, eventDescription, eventName, faqs, contactUs };
};

// $FlowFixMe
export default connect(mapStateToProps)(GreenUpFacts);
