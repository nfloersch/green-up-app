// @flow

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import {defaultStyles} from '../../styles/default-styles';
import {StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, View, TouchableOpacity, TouchableHighlight, Text, Platform} from 'react-native';
import CheckBox from 'react-native-checkbox';
import TrashDrop from '../../models/trash-drop';

const myStyles = {toggle: {height: 50}};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);


class CreateTrashDrop extends Component {
    static propTypes = {
        actions: PropTypes.object,
        close: PropTypes.func,
        currentUser: PropTypes.object,
        drop: PropTypes.object,
        location: PropTypes.object,
        navigation: PropTypes.object,
        showFirstButton: PropTypes.bool
    };

    render() {

        const saveTrashDrop = () => {
            if (this.props.drop.uid) {
                this.props.actions.updateTrashDrop(this.props.drop);
            } else {
                this.props.actions.dropTrash(TrashDrop.create(Object.assign({}, this.props.drop, {location: this.props.location.coords})));
            }


            this.props.close();
        };

        const collectTrashDrop = () => {
            this.setState(
                {
                    drop: Object.assign({}, this.props.drop, {
                        wasCollected: true,
                        collectedBy: {
                            uid: this.props.currentUser.uid,
                            email: this.props.currentUser.email
                        }
                    })
                }, saveTrashDrop);
        };


        return (
            <View style={styles.frame}>
                <View style={[styles.buttonBarHeader, {backgroundColor: '#EEE', marginTop: 30}]}>
                    <View style={styles.buttonBar}>
                        {
                            this.props.showFirstButton
                                ? (
                                    <View style={styles.buttonBarButton}>
                                        <TouchableOpacity
                                            style={styles.headerButton}
                                            onPress={saveTrashDrop}
                                        >
                                            <Text style={styles.headerButtonText}>
                                                {this.props.drop.uid ? 'Update This Spot' : 'Mark This Spot'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                                : null
                        }


                        <View style={styles.buttonBarButton}>
                            <TouchableOpacity style={styles.headerButton} onPress={this.closeModal}>
                                <Text style={styles.headerButtonText}>{'Cancel'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <KeyboardAvoidingView
                    style={defaultStyles.frame}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <ScrollView style={styles.scroll}>
                        <View style={styles.infoBlockContainer}>
                            <Text style={styles.labelDark}>Number of Bags</Text>
                            <TextInput
                                underlineColorAndroid='transparent'
                                editable={!this.state.drop.wasCollected}
                                value={this.state.drop.bagCount.toString()}
                                keyboardType='numeric'
                                placeholder='1'
                                style={styles.textInput}
                                onChangeText={(text) => this.setState({
                                    drop: {
                                        ...this.state.drop,
                                        bagCount: Number(text)
                                    }
                                })}
                            />
                            <Text style={styles.labelDark}>Other Items</Text>
                            <View style={styles.fieldset}>
                                <CheckBox
                                    editable={!this.state.drop.wasCollected}
                                    label='Needles/Bio-Waste'
                                    checked={this.state.drop.tags.indexOf('bio-waste') > -1}
                                    onChange={this._toggleTag('bio-waste')}/>
                                <CheckBox
                                    editable={!this.state.drop.wasCollected}
                                    label='Tires'
                                    checked={this.state.drop.tags.indexOf('tires') > -1}
                                    onChange={this._toggleTag('tires')}/>
                                <CheckBox
                                    editable={!this.state.drop.wasCollected}
                                    label='Large Object'
                                    checked={this.state.drop.tags.indexOf('large') > -1}
                                    onChange={this._toggleTag('large')}/>
                            </View>

                        </View>
                        {
                            this.state.drop.uid && !this.state.drop.wasCollected && (
                                <View style={{width: '100%', height: 60}}>
                                    <TouchableHighlight
                                        style={[styles.button, {width: '100%'}]}
                                        onPress={collectTrashDrop}
                                    >
                                        <Text style={styles.buttonText}>{'Collect Trash'}</Text>
                                    </TouchableHighlight>
                                </View>
                            )
                        }
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const currentUser = state.login.user;
    const location = state.trashTracker.location;

    return {currentUser, location};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTrashDrop);
