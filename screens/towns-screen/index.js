/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, KeyboardAvoidingView, ScrollView, Text, View, FlatList, TextInput, Platform} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import {defaultStyles} from '../../styles/default-styles';

const newLineRegex = /\r?\n|\r/g;
const myStyles = {
    location: {
        padding: 5,
        width: '100%',
        borderStyle: 'solid',
        borderColor: '#BBB',
        borderWidth: 1,
        marginLeft: 2,
        marginRight: 2
    },

    town: {marginBottom: 20, borderWidth: 1, borderColor: '#EEE', padding: 5},
    townName: {fontSize: 24, color: '#666', width: '100%', marginBottom: 10}
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
                <Text style={styles.townName}>{item.name}</Text>
                <Text style={[styles.textDark, {fontSize: 16, marginBottom: 5}]}>
                    {`Road-side trash drops ${item.roadsideDropOffAllowed ? 'ARE' : 'ARE NOT'} allowed`}
                </Text>
                {
                    item.description
                        ? (
                            <Text style={[styles.textDark, {fontSize: 14, marginBottom: 5, marginTop: 5}]}>
                                {item.description}
                            </Text>
                        )
                        : null
                }
                <Text style={[styles.textDark, {fontSize: 18, marginTop: 5}]}>
                    {'Supply Pickup Locations'}
                </Text>
                {
                    ((item.pickupLocations || []).length === 0)
                        ? (
                            <View style={styles.location}>
                                <Text style={[styles.textDark, {marginBottom: 5, fontSize: 14}]}>
                                    {'No trash bag pickup locations in this town'}
                                </Text>
                            </View>
                        )
                        : item.pickupLocations.map((loc, i) => (
                            <View key={i} style={styles.location}>
                                {Boolean(loc.name) ? (
                                    <Text style={[styles.textDark, {marginBottom: 5, fontSize: 14}]}>
                                        {loc.name.replace(newLineRegex, ' ').replace(/\s\s/g, ' ')}
                                    </Text>) : null}
                                {Boolean(loc.address) ? (
                                    <Text style={[styles.textDark, {marginBottom: 5, fontSize: 14}]}>
                                        {loc.address.replace(newLineRegex, ' ').replace(/\s\s/g, ' ')}
                                    </Text>) : null}
                                {Boolean(loc.notes) ? (
                                    <Text style={[styles.textDark, {marginBottom: 0, fontSize: 14}]}>
                                        {loc.notes.replace(newLineRegex, ' ').replace(/\s\s/g, ' ')}
                                    </Text>) : null}
                            </View>
                        ))
                }
                <Text style={[styles.textDark, {fontSize: 18, marginTop: 10}]}>
                    {'Trash Drop-off Locations'}
                </Text>
                {
                    ((item.dropOffLocations || []).length === 0)
                        ? (
                            <View style={styles.location}>
                                <Text style={[styles.textDark, {marginBottom: 5, fontSize: 14}]}>
                                    {'No trash drop-off locations in this town'}
                                </Text>
                            </View>
                        )
                        : item.dropOffLocations.map((loc, i) => (
                            <View key={i} style={[styles.location, {borderStyle: 'solid'}]}>
                                {Boolean(loc.name) ? (
                                    <Text style={[styles.textDark, {marginBottom: 5, fontSize: 14}]}>
                                        {loc.name.replace(newLineRegex, ' ').replace(/\s\s/g, ' ')}
                                    </Text>) : null}
                                {Boolean(loc.address) ? (
                                    <Text style={[styles.textDark, {marginBottom: 5, fontSize: 14}]}>
                                        {loc.address.replace(newLineRegex, ' ').replace(/\s\s/g, ' ')}
                                    </Text>) : null}
                                {Boolean(loc.notes) ? (
                                    <Text style={[styles.textDark, {marginBottom: 0, fontSize: 14}]}>
                                        {loc.notes.replace(newLineRegex, ' ').replace(/\s\s/g, ' ')}
                                    </Text>) : null}
                            </View>
                        ))
                }
            </View>
        );
    }
}


class TownInfo extends Component {
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
        const searchResults = Object.keys(this.props.towns).filter(key => (towns[key].name || '').toLowerCase().indexOf(searchTerm.trim().toLowerCase()) !== -1);
        this.setState({searchResults, searchTerm: searchTerm.trim()});
    }

    render() {
        const towns = this.props.towns;
        const keys = this.state.searchTerm ? this.state.searchResults : Object.keys(towns);
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
                        <View style={defaultStyles.padForIOSKeyboard}/>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const towns = state.towns.townData;
    return {towns};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TownInfo);
