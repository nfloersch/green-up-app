/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import {defaultStyles} from '../../styles/default-styles';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import Toggle from '../../components/Toggle';
import circleGray from '../../assets/images/circle-gray.png';
import circleBlue from '../../assets/images/circle-blue.png';
import circleRed from '../../assets/images/circle-red.png';
import circleYellow from '../../assets/images/circle-yellow.png';
import circleGreen from '../../assets/images/circle-green.png';

const myStyles = {toggle: {height: 50}};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);


class TrashToggles extends Component {
    static propTypes = {
        actions: PropTypes.object,
        close: PropTypes.func,
        messages: PropTypes.array,
        navigation: PropTypes.object,
        supplyPickupToggle: PropTypes.bool,
        uncollectedTrashToggle: PropTypes.bool,
        trashDropOffToggle: PropTypes.bool,
        myTrashToggle: PropTypes.bool,
        collectedTrashToggle: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.frame}>
                <View style={[styles.buttonBarHeader, {backgroundColor: '#EEE', marginTop: 30}]}>
                    <View style={styles.buttonBar}>
                        <View style={styles.buttonBarButton}>
                            <TouchableOpacity style={styles.headerButton} onPress={this.props.close}>
                                <Text style={styles.headerButtonText}>{'Close'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={[styles.infoBlockContainer, {height: 300}]}>
                    <Toggle
                        style={styles.toggle}
                        icon={circleYellow}
                        label='My Trash'
                        value={this.props.myTrashToggle}
                        onValueChange={() => this.props.actions.toggleTrashData('myTrashToggle', !this.props.myTrashToggle)}/>
                    <Toggle
                        style={styles.toggle}
                        icon={circleRed}
                        label='Uncollected Trash'
                        value={this.props.uncollectedTrashToggle}
                        onValueChange={() => this.props.actions.toggleTrashData('uncollectedTrashToggle', !this.props.uncollectedTrashToggle)}/>
                    <Toggle
                        style={styles.toggle}
                        icon={circleBlue}
                        label='Trash Drop-Off Locations'
                        value={this.props.trashDropOffToggle}
                        onValueChange={() => this.props.actions.toggleTrashData('trashDropOffToggle', !this.props.trashDropOffToggle)}/>
                    <Toggle
                        style={styles.toggle}
                        icon={circleGreen}
                        label='Supply Pickup Locations'
                        value={this.props.supplyPickupToggle}
                        onValueChange={() => this.props.actions.toggleTrashData('supplyPickupToggle', !this.props.supplyPickupToggle)}/>
                    <Toggle
                        style={styles.toggle}
                        icon={circleGray}
                        label='Collected Trash'
                        value={this.props.collectedTrashToggle}
                        onValueChange={() => this.props.actions.toggleTrashData('collectedTrashToggle', !this.props.collectedTrashToggle)}/>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const collectedTrashToggle = state.trashTracker.collectedTrashToggle;
    const supplyPickupToggle = state.trashTracker.supplyPickupToggle;
    const uncollectedTrashToggle = state.trashTracker.uncollectedTrashToggle;
    const trashDropOffToggle = state.trashTracker.trashDropOffToggle;
    const myTrashToggle = state.trashTracker.myTrashToggle;
    return {collectedTrashToggle, supplyPickupToggle, uncollectedTrashToggle, trashDropOffToggle, myTrashToggle};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrashToggles);
