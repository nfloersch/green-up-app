// @flow
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import Anchor from "../../components/anchor";
import { defaultStyles } from "../../styles/default-styles";
import { isValidDate } from "../../libs/validators";
import { getCurrentGreenUpDay } from "../../libs/green-up-day-calucators";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

type PropsType = {
    eventDescription: Object,
    contactUs: any,
    eventName: string,
    eventDate: Date,
    faqs: Array<{ question: string, answer: string }>
};

const About = ({ eventDescription, contactUs, eventName, eventDate, faqs }: PropsType): React$Element<View> => (
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
                    style={ [styles.textDark, { textAlign: "justify", fontSize: 16 }] }>{ eventDescription }</Text>
            </View>
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


About.navigationOptions = {
    title: "About"
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
export default connect(mapStateToProps)(About);
