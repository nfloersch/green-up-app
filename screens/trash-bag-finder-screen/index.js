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
        title: 'Where To Find Bags'
    };

    constructor(props) {
        super(props);
    }

    render() {

        const towns = this.props.towns;
        const locations = Object.keys(towns).map(town => (
            <View key={town} style={styles.town}>
                <Text>{towns[town].Name}</Text>
                {
                    ((towns[town].PickupLocations || []).length === 0)
                        ? (<View
                            style={styles.location}><Text>{'No trash bag pickup locations in this town'}</Text></View>)
                        : towns[town].PickupLocations.map((loc, i) => (
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
