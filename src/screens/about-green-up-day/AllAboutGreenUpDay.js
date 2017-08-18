/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import NavHeader from '../../components/NavHeader';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as allAboutGreenUpDayActions from './allAboutGreenUpDayActions';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {
    Alert,
    Button,
    Image,
    StyleSheet,
    ScrollView,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%'
    },
    text: {
        paddingTop: 10,
        justifyContent: 'flex-start',
        width: '100%',
        fontSize: 15
    }
});

class AllAboutGreenUpDay extends Component {
    static propTypes = {
        aboutContent: PropTypes.object
    };
    static navigationOptions = {
        drawerLabel: 'About Green Up Day',
        drawerIcon: ({tintColor}) => (
            <MaterialCommunityIcons name="information" size={24} color="blue" />
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.aboutContent.aboutGreenUp,
            screen: 'aboutGreenUp',
            gestureName: 'none',
            backgroundColor: '#fff'
        };
    }

    onSwipe(gestureName, gestureState) {
        const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        if(this.state.screen === 'aboutGreenUp') {
            switch (gestureName) {
                case SWIPE_LEFT:
                    this.setState({text: this.props.aboutContent.aboutContacts, screen: 'aboutContacts'});
                    break;
                case SWIPE_RIGHT:
                    this.setState({text: this.props.aboutContent.aboutTP, screen: 'aboutTP'});
                    break;
            }
        } else if (this.state.screen === 'aboutContacts') {
            switch (gestureName) {
                case SWIPE_LEFT:
                    this.setState({text: this.props.aboutContent.aboutFAQ, screen: 'aboutFAQ'});
                    break;
                case SWIPE_RIGHT:
                    this.setState({text: this.props.aboutContent.aboutGreenUp, screen: 'aboutGreenUp'});
                    break;
            }
        } else if (this.state.screen === 'aboutFAQ') {
            switch (gestureName) {
                case SWIPE_LEFT:
                    this.setState({text: this.props.aboutContent.aboutTP, screen: 'aboutTP'});
                    break;
                case SWIPE_RIGHT:
                    this.setState({text: this.props.aboutContent.aboutContacts, screen: 'aboutContacts'});
                    break;
            }
        } else if (this.state.screen === 'aboutTP') {
            switch (gestureName) {
                case SWIPE_LEFT:
                    this.setState({text: this.props.aboutContent.aboutGreenUp, screen: 'aboutGreenUp'});
                    break;
                case SWIPE_RIGHT:
                    this.setState({text: this.props.aboutContent.aboutFAQ, screen: 'aboutFAQ'});
                    break;
            }
        }
    }

    render() {
        const config = {
            velocityThreshold: 0.2,
            directionalOffsetThreshold: 80
        };
        return (
            <View style={styles.container}>
                <ScrollView style={styles.text}>
                    <NavHeader navigation={this.props.navigation} screenTitle="About Green Up Day" showBack={false}/>
                    <GestureRecognizer
                        onSwipe={(direction, state) => this.onSwipe(direction, state)}
                        config = {config}
                        style={{width: '100%'}}
                    >
                        <Text>{this.state.text}</Text>
                        <Text style={{margin: 10}}>{this.state.screen}</Text>
                    </GestureRecognizer>
                </ScrollView>
            </View>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {aboutContent: state.allAboutGreenUpDayReducers.aboutPageContent};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(allAboutGreenUpDayActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllAboutGreenUpDay);
