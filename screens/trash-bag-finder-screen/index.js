/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from './actions';
import {defaultStyles} from '../../styles/default-styles';

const myStyles = {
    location: {marginBottom: 10, padding: 5, borderStyle: 'solid', borderColor: 'grey'},
    town: {marginBottom: 20}
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);


class TrashBagFinder extends Component {
    static propTypes = {
        actions: PropTypes.object,
        currentUser: PropTypes.object,
        profile: PropTypes.object,
        navigation: PropTypes.object,
        towns: PropTypes.object
    };

    static navigationOptions = {
        title: 'Find Bags & Stuff'
    };

    constructor(props) {
        super(props);
        this.onSearchTermChange = this.onSearchTermChange.bind(this);
        this.state = {searchResults: [], searchTerm: ''};
    }

    onSearchTermChange(searchTerm) {
        const towns = this.props.towns;

        const searchResults = Object.keys(this.props.towns).filter(key => (towns[key].Name || '').toLowerCase().indexOf(searchTerm.trim().toLowerCase()) !== -1);
        this.setState({searchResults, searchTerm});
    }


    render() {

        const towns = this.props.towns;
        const keys = this.state.searchResults.length === 0 ? Object.keys(towns) : this.state.searchResults;
        const locations = keys.map(key => (
            <View key={key} style={styles.town}>


                <Text>{towns[key].Name}</Text>
                {
                    ((towns[key].PickupLocations || []).length === 0)
                        ? (<View
                            style={styles.location}><Text>{'No trash bag pickup locations in this town'}</Text></View>)
                        : towns[key].PickupLocations.map((loc, i) => (
                            <View key={i} style={styles.location}>
                                {Boolean(loc.PickupLocationName) ? (<Text>{loc.PickupLocationName}</Text>) : null}
                                {Boolean(loc.PickupLocationAddress) ? (<Text>{loc.PickupLocationAddress}</Text>) : null}
                                {Boolean(loc.PickupNotes) ? (<Text>{loc.PickupNotes}</Text>) : null}
                            </View>
                        ))
                }
            </View>
        ));


        return (
            <View style={styles.container}>
                <View style={{marginTop: 10, marginBottom: 10}}>
                    <TextInput
                        keyBoardType={'default'}
                        onChangeText={this.onSearchTermChange}
                        placeholder={'Search by Team Name or City/Town'}
                        style={styles.textInput}
                        value={this.state.searchTerm}
                        underlineColorAndroid={'transparent'}
                    />
                </View>
                <ScrollView>
                    <View>
                        {locations}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const towns = state.trashBagFinder.townData;
    return {towns};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrashBagFinder);
