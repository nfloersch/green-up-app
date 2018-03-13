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

const aboutGreenUp = 'Green Up Vermont is a nonprofit organization with 501(c) (3) status.\n\nGreen Up' +
    '’s mission is to promote the stewardship of our state’s natural landscape and wa' +
    'terways and the livability of our communities by involving people in Green Up Da' +
    'y and raising public awareness about the benefits of a litter-free environment.';
const aboutContacts = 'Green Up Vermont staff:\nMelinda Vieux, President\nMelanie Phelps, Operations Ma' +
    'nager \n\nContact Us:\n\tPhone:\n\t802-229-4586\n\t800-974-3259\n\tEmail: greenu' +
    'p@greenupvermont.org\n\n\tBy mail: Green Up Vermont\n\tP. O. Box 1191\n\tMontpel' +
    'ier, VT 05601-1191\n\nVisit the Green Up Vermont Board of Directors page for det' +
    'ailed information about our board.';
const frequentlyAskedQuestions = [
    {
        q: 'What is Green Up Day?',
        a: 'Always the first Saturday in May, Green Up Day is an annual statewide event when over 22,000 volunteers come together to remove litter from Vermont’s roadsides and public spaces.'
    },
    {
        q: 'Is Green Up a state-funded organization?',
        a: 'No, Green Up is a non-profit organization. Green Up relies on the generous donations from individuals and businesses to keep the organization going.'
    }, {
        q: 'When is Green Up Day? ',
        a: 'Green Up Day is the first Saturday in May.'
    }, {
        q: 'When was the first Green Up Day?',
        a: 'The first Green Up Day was April 18, 1970. It was started by Governor Deane C. Davis. In 1979, Green Up be came a non-profit organization.'
    }, {
        q: 'How do the Green Up bags make their way out to the roadsides?',
        a: 'With the help of Vtrans, the bags are distributed to the nine district garages and then out to the towns for distribution in mid-April.'
    }, {
        q: 'How is Green Up Day organized?',
        a: 'Green Up Day happens all over the state and wouldn’t happen without the dedicated help of our coordinators. Each town has a coordinator that volunteers can contact to get their Green Up bags. To find your town’s' +
        ' coordinator, go to the How to Participate page.'
    }, {
        q: 'How can I volunteer?',
        a: 'You can go to the How to Participate page of our website to find your town coordinator. You will see the contact name, phone number and email for you town’s coordinator. You can contact them for information on where to pick up Green Up bags and for other events that your town may be putting on. There will also be details onwhere to pick up and drop off bags on that page, for your town.'
    }, {
        q: 'What else happens on Green Up Day?',
        a: 'Many communities provide refreshments, breakfast, picnic lunch or BBQ, dinner and even live music and entertainment. Contact your town coordinator to see what the local traditions may be.'
    }, {
        q: 'I am a girl or boy scout leader, or other community group leader. How do I get my kids involved in Green Up Day?',
        a: 'Contact your town coordinator for information about the day’s events and how your group can make a difference.'
    }, {
        q: 'I am a teacher. How can my students gt involved?',
        a: 'You can have them participate in the annual poster and writing contests. Go to the Poster and Writing Contests page to learn more. On that page, there are also two activity books for grades K-2 which can be downloaded.'
    }, {
        q: 'How many people participate in Green Up Day?',
        a: 'Over 22,000 people volunteer annually in picking up litter on Green Up Day. Over 50,000 bags of trash are collected annually.'
    }
];
const aboutTP = 'Talking Points – a summary of the Green Up Day program, to be used in interviews' +
    ' or when writing articles:\n\nWHAT is it? and HOW did it get started?\nA special' +
    ' day when thousands of volunteers come out in their communities for a massive sp' +
    'ring clean up of litter.  It is the largest statewide volunteer event in Vermont' +
    ' with over 22,000 taking part. Launched in 1970 by Governor Deane Davis, four da' +
    'ys before the first Earth Day, with the idea to “marshal an army of thousands of' +
    ' volunteers to clean up litter from roadsides.”  There was a lot of roadside lit' +
    'ter back then.  The Interstate Highway System was closed from nine to noon and t' +
    'he clean up drew national media coverage.\n\nHOW has it CHANGED?\nIt is no longe' +
    'r organized by a state agency. Instead, Green Up Vermont is a non-profit organiz' +
    'ation responsible for carrying on this great annual tradition, providing over 50' +
    ',000 Green Up bags every year!\n\nWHERE does it take place?\nEvery community in ' +
    'Vermont has a Green Up Day. Roadsides, natural and public spaces, and waterways ' +
    'throughout the entire state are the focus for the litter clean up.\n\nWHO takes ' +
    'part?\nEveryone can take part – people of all ages and all walks of life. Lots o' +
    'f families go out together to involve young children in learning about negative ' +
    'effects of littering. Local community groups can help organize food and festivit' +
    'ies for volunteers – some towns have a breakfast, many have a BBQ lunch.\n\nHOW ' +
    'can people get involved?\nGo to the Green Up Vermont web site at Green Up Vermon' +
    't, to find out who is their Town Coordinator and where to get Green Up bags.  Al' +
    'so all seven Vermont Subaru dealers are official sites for bag pick up and drop ' +
    'off.';

const myStyles = {};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);


class About extends Component {
    static propTypes = {
        actions: PropTypes.object,
        currentUser: PropTypes.object,
        profile: PropTypes.object,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'About Green Up Day'
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
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <Text style={styles.heading}>About Green Up</Text>
                        <Text>{aboutGreenUp}</Text>
                    </View>
                    <View>
                        <Text style={styles.heading}>FAQ</Text>
                        <View>{
                            frequentlyAskedQuestions.map(
                                (faq, i) => (
                                    <View key={i}>
                                        <Text style={{fontWeight: 'bold'}}>{faq.q}</Text>
                                        <Text style={{marginBottom: 10}}>{faq.a}</Text>
                                    </View>)
                            )
                        }
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const currentUser = state.login.user;
    const profile = state.profile.profile;
    return {profile, currentUser};
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
