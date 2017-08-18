/**
 /**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, ScrollView,TextInput, Button, TouchableHighlight, StyleSheet, Text, View} from 'react-native';
import CheckBox from 'react-native-checkbox';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'space-around',
        backgroundColor: 'white',
        borderColor: 'white',
        borderLeftWidth: 20,
        borderRightWidth: 20,
        justifyContent: 'flex-start'
    },
    text: {
        fontSize: 30,
        justifyContent: 'flex-start',
        fontWeight: 'bold',
        margin: 10
    },
    options: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    }
});
export default class TrashMap extends Component {

    static propTypes = {
        navigation: PropTypes.object
    };
    static navigationOptions = {
        title: 'Trash Tracker'
    };
    constructor(props) {
        super(props);
        this._goToTrashDrop = this
            ._goToTrashDrop
            .bind(this);
        this.state = {modalVisible: false};
    }

    componentDidMount() {}

    _goToTrashDrop() {
        this.setState({modalVisible: true});
        // this
        //     .props
        //     .navigation
        //     .navigate('TrashDrop');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Trash Map</Text>
                <TouchableHighlight onPress={this._goToTrashDrop}>
                    <View>
                        <Text style={styles.text}>Drop Trash</Text>
                    </View>
                </TouchableHighlight>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <ScrollView style={{marginTop: 22}}>
                        <View>
                            <TextInput
                                keyboardType='numeric'
                                placeholder=' 1'
                                style={{
                                    height: 40,
                                    borderColor: 'gray',
                                    borderWidth: 1
                                }}
                                onChangeText={(text) => this.setState({text})}
                            />
                            <Text style={styles.text}>Other Items</Text>
                            <CheckBox label='None' onPress={() => {
                                this.toTrashMap(data);
                            }}/>
                            <CheckBox checked={this.state.hasMattress} label='Mattress(s)'
                                      onPress={() => {
                                          this.setState({hasMattress: !this.state.hasMattress});
                                      }}
                            />
                            <CheckBox label='Tires' onPress={() => {
                                this.toTrashMap(data);
                            }}/>
                            <CheckBox label='Hazardous Waste' onPress={() => {
                                this.toTrashMap(data);
                            }}/>
                            <CheckBox label='Large Object(s)' onPress={() => {
                                this.toTrashMap(data);
                            }}/>
                            <Button onPress={this.toTrashMap}
                                    title='Mark the Spot'
                                    color='green'/>

                            <TouchableHighlight onPress={() => {
                                this.setState({modalVisible: false})
                            }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>

                        </View>
                    </ScrollView>
                </Modal>
            </View>
        );
    }
}
