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
                            }] }
                            onPress={ ()=>{ Linking.openURL('https://greenupvermont.org/')}}
                        >{ "\n" + eventDescription + "\n\n" }
                        The latest news and information about the day are always available on the Green Up Vermont website. 
                        <Text style={ [styles.textDark, {
                            textAlign: "center",
                            fontWeight: "900",
                            fontSize: 16
                            }]}>
                            {"\nTap here to open it up if you are online!"}
                        </Text>
                    </Text>
                </View>

                <View style={ styles.infoBlockContainer }>
                    <Text style={ [styles.textDark, {
                            textAlign: "justify",
                            fontSize: 16
                        }] }>
                        The 2022 Winning Narrative
                    </Text>
                    <Text style={ [styles.textDark, {
                            textAlign: "justify",
                            fontSize: 14,
                            fontFamily: "Rubik-Bold"
                        }] }>
                        By Kellan Kendall, 6th Grade, St. Johnsbury Academy
                    </Text>
                    <Text style={ [styles.textDark, {
                            textAlign: "justify",
                            fontSize: 16,
                            fontFamily: "Rubik-Bold"
                        }] }>
                        Green Up Green Mountain State
                    </Text>
                    <Text style={{textAlign: "left", fontSize: 16, marginBottom: 5}}>
                        All Vermonters,{"\n"}
                        Let us lead the way!{"\n"}
                        Clean up bike paths,{"\n"}
                        and roadsides every day!{"\n"}
                    </Text>
                    <Text style={{textAlign: "left", fontSize: 16, marginBottom: 5}}>
                        Make the green mountains clean,{"\n"}
                        Toss trash in the bins.{"\n"}
                        Pick up after ourselves,{"\n"}
                        Every Vermonter wins!{"\n"}
                    </Text>
                    <Text style={{textAlign: "left", fontSize: 16, marginBottom: 5}}>
                        Keep our awesome state clean,{"\n"}
                        Our rivers, ponds, and lakes.{"\n"}
                        Give our loons, trout, and deer,{"\n"}
                        Safe places to live, for all our sakes!{"\n"}
                    </Text>
                    <Text style={{textAlign: "left", fontSize: 16, marginBottom: 5}}>
                        Keep the environment healthy,{"\n"}
                        Let us do our best.{"\n"}
                        Show the country why Vermont,{"\n"}
                        Is better than the rest!{"\n"}
                    </Text>
                    <Text style={{textAlign: "left", fontSize: 16, marginBottom: 5}}>
                        Plant trees and gardens,{"\n"}
                        Recycle old stuff.{"\n"}
                        Take care of the Earth,{"\n"}
                        our planet does enough!{"\n"}
                    </Text>
                    <Text style={{textAlign: "left", fontSize: 16, marginBottom: 5}}>
                        Vermonters stop and listen!{"\n"}
                        Waste has its place.{"\n"}
                        Put it in the garbage,{"\n"}
                        or in the recycling space.{"\n"}
                    </Text>
                    <Text style={{textAlign: "left", fontSize: 16, marginBottom: 5}}>
                        Reduce, Reuse, and Recycle,{"\n"}
                        Be responsible and care.{"\n"}
                        We are excited to clean Vermont up,{"\n"}
                        Litterbugs, BEWARE!{"\n"}
                    </Text>
                    <Text style={{textAlign: "left", fontSize: 16, marginBottom: 5}}>
                        Let's clean up together,{"\n"}
                        It's what we want!{"\n"}
                        Treat our state like a champ,{"\n"}
                        Green up the State of Vermont!{"\n"}
                    </Text>
                </View>

                <View style={ styles.infoBlockContainer }>
                    <Text style={ [styles.textDark, {
                            textAlign: "justify",
                            fontSize: 16
                        }] }>
                        The 2021 Winning Essay
                    </Text>
                    <Text style={ [styles.textDark, {
                            textAlign: "justify",
                            fontSize: 14,
                            fontFamily: "Rubik-Bold"
                        }] }>
                        By Casey Kendall, Grade 4, Ryegate, VT
                    </Text>
                    <Text style={ [styles.textDark, {
                            textAlign: "justify",
                            fontSize: 16,
                            fontFamily: "Rubik-Bold"
                        }] }>
                        Green Up, Clean Up!
                    </Text>
                    <Text style={{textAlign: "left", fontSize: 16, marginBottom: 5}}>
                        Green Up means clean up{"\n"}
                        Our pretty state{"\n"}
                        If you are keen to make it green{"\n"}
                        Don’t hesitate, don’t wait!{"\n"}
                    </Text>
                    <Text style={{textAlign: "left", fontSize: 16, marginBottom: 5}}>
                        Making Vermont green can be fun{"\n"}
                        Just grab a friend,{"\n"}
                        Put on a mask,{"\n"}
                        It can be a new trend!{"\n"}
                    </Text>
                    <Text style={{textAlign: "left", fontSize: 16, marginBottom: 5}}>
                        Meet your friends,{"\n"}
                        All you do is pick up trash{"\n"}
                        It’s an activity{"\n"}
                        That doesn’t cost you cash!{"\n"}
                    </Text>
                    <Text style={{textAlign: "left", fontSize: 16, marginBottom: 5}}>
                        Vermont has beautiful mountains{"\n"}
                        And amazing views,{"\n"}
                        There are so many{"\n"}
                        They keep making the news!{"\n"}
                    </Text>
                    <Text style={{textAlign: "left", fontSize: 16, marginBottom: 5}}>
                        Foliage, maple syrup, and more{"\n"}
                        Skiing, boating, fishing, and fun{"\n"}
                        Cleaning up Vermont{"\n"}
                        Keeps us number one!{"\n"}
                    </Text>
                    <Text style={{textAlign: "left", fontSize: 16, marginBottom: 5}}>
                        Vermont is truly the best place{"\n"}
                        To quarantine.{"\n"}
                        And the best place{"\n"}
                        To make things green!{"\n"}
                    </Text>
                    <Text style={{textAlign: "left", fontSize: 16, marginBottom: 5}}>
                        How long has it been?{"\n"}
                        51 amazing years.{"\n"}
                        Keep up the good work{"\n"}
                        So cheers, cheers, cheers!{"\n"}
                    </Text>
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
                            fontSize: 14,
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
                    {/* <Text style={{textAlign: "center", fontSize: 16, marginBottom: 5, fontFamily: "Rubik-Bold"}}
                        onPress={ ()=>{ Linking.openURL('https://greenupvermont.org/client_media/Past%20Writing%20Contest%20winners_2007_2018.pdf')}}>
                        Tap Here To Read The Other Great School Essays!
                    </Text> */}
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
