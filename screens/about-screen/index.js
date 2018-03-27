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

const aboutGreenUp = 'Green Up Vermont is a nonprofit organization with 501(c) (3) status.\n\nGreen Up' +
    '’s mission is to promote the stewardship of our state’s natural landscape and wa' +
    'terways and the livability of our communities by involving people in Green Up Da' +
    'y and raising public awareness about the benefits of a litter-free environment.';
const contactUs = 'Green Up Vermont staff:\nMelanie Phelps,\nOperations Manager / Interim President\n' +
    '\n\nContact Us:\n\tPhone:\n\t802-229-4586\n\t800-974-3259\n\tEmail: greenu' +
    'p@greenupvermont.org\n\n\tBy mail: Green Up Vermont\n\tP. O. Box 1191\n\tMontpel' +
    'ier, VT 05601-1191';
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
        q: 'How many people participate in Green Up Day?',
        a: 'Over 22,000 people volunteer annually in picking up litter on Green Up Day. Over 50,000 bags of trash are collected annually.'
    },
    {
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
        q: 'What else happens on Green Up Day?',
        a: 'Many communities provide refreshments, breakfast, picnic lunch or BBQ, dinner and even live music and entertainment. Contact your town coordinator to see what the local traditions may be.'
    }
];

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
            <View style={styles.frame}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.infoBlockContainer}>
                        <Text style={styles.infoBlockHeader}>About Green Up</Text>
                        <View style={styles.infoBlock}>
                            <Text style={[styles.textDark, {fontSize: 12}]}>{aboutGreenUp}</Text>
                        </View>
                    </View>
                    <View style={styles.infoBlockContainer}>
                        <Text style={styles.infoBlockHeader}>FAQ</Text>
                        <View>{
                            frequentlyAskedQuestions.map(
                                (faq, i) => (
                                    <View key={i} style={styles.infoBlock}>
                                        <Text style={[styles.textDark, {fontSize: 14}]}>{faq.q}</Text>
                                        <Text style={[styles.textDark, {fontSize: 12}]}>{faq.a}</Text>
                                    </View>)
                            )
                        }
                        </View>
                    </View>
                    <View style={styles.infoBlockContainer}>
                        <Text style={styles.infoBlockHeader}>Contact Us</Text>
                        <View style={styles.infoBlock}>
                            <Text style={[styles.textDark, {fontSize: 12}]}>{contactUs}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
