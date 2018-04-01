/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, ScrollView, Text, View, FlatList, TextInput, Platform} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import {defaultStyles} from '../../styles/default-styles';

const newLineRegex = /\r?\n|\r/g;
const myStyles = {
    location: {padding: 5, width: '100%'},
    town: {marginBottom: 20, borderWidth: 1, borderColor: '#EEE', padding: 5},
    townName: {fontSize: 16, color: '#888', width: '100%'}
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);


class TownItem extends Component {
    static propTypes = {
        item: PropTypes.object
    };

    render() {
        const item = this.props.item;
        return (
            <View key={item.key} style={styles.infoBlock}>
                <Text style={styles.townName}>{item.Name}</Text>
                {
                    ((item.PickupLocations || []).length === 0)
                        ? (
                            <View style={styles.location}>
                                <Text style={[styles.textDark, {marginBottom: 5, fontSize: 14}]}>
                                    {'No trash bag pickup locations in this town'}
                                </Text>
                            </View>
                        )
                        : item.PickupLocations.map((loc, i) => (
                            <View key={i} style={styles.location}>
                                {Boolean(loc.PickupLocationName) ? (
                                    <Text style={[styles.textDark, {marginBottom: 5, fontSize: 14}]}>
                                        {loc.PickupLocationName.replace(newLineRegex, ' ').replace(/\s\s/g, ' ')}
                                    </Text>) : null}
                                {Boolean(loc.PickupLocationAddress) ? (
                                    <Text style={[styles.textDark, {marginBottom: 5, fontSize: 14}]}>
                                        {loc.PickupLocationAddress.replace(newLineRegex, ' ').replace(/\s\s/g, ' ')}
                                    </Text>) : null}
                                {Boolean(loc.PickupNotes) ? (
                                    <Text style={[styles.textDark, {marginBottom: 0, fontSize: 14}]}>
                                        {loc.PickupNotes.replace(newLineRegex, ' ').replace(/\s\s/g, ' ')}
                                    </Text>) : null}
                            </View>
                        ))
                }
            </View>
        );
    }
}


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
        const locations = keys.map(key => ({key, ...(towns[key] || {})}));

        return (
            <View style={styles.frame}>
                <View style={{margin: 10}}>
                    <TextInput
                        keyBoardType={'default'}
                        onChangeText={this.onSearchTermChange}
                        placeholder={'Search by City/Town'}
                        style={styles.textInput}
                        value={this.state.searchTerm}
                        underlineColorAndroid={'transparent'}
                    />
                </View>
                <KeyboardAvoidingView
                    style={defaultStyles.frame}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <ScrollView style={styles.scroll}>
                        <View style={styles.infoBlockContainer}>
                            <FlatList
                                style={styles.infoBlockContainer}
                                data={locations}
                                renderItem={({item}) => (<TownItem item={item}/>)}/>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
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
