/**
 /**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-checkbox';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as trashTrackerActions from './TrashTrackerActions';
import NavHeader from '../../components/NavHeader';
import {TrashDropLocation} from '../../models/trash-drop';

import {
    Alert,
    Button,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput
} from 'react-native';

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


class TrashDrop extends Component {

    static propTypes = {
        actions: PropTypes.object,
        teams: PropTypes.array,
        navigation: PropTypes.object,
        owner: PropTypes.object,
        toTrashMap: PropTypes.func
    };

    static navigationOptions = {
        title: 'Dropping Trash'
    };

    constructor(props) {
        super(props);
        this._myAwesomeMethod = this._myAwesomeMethod.bind(this);
        this.toTrashMap = this.toTrashMap.bind(this);
    }

    componentDidMount() {
    }

    _myAwesomeMethod() {
        Alert.alert('Huzzah!');
    }

    toTrashMap(data) {
        const marker = TrashDropLocation.create({bagCount: this.bagCount});
        this.props.navigation.navigate('TrashMap');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No. Bags:</Text>
                <ScrollView keyboardShouldPersistTaps='never'>
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
                    <CheckBox checked={this.state.hasNone} label='None'
                        onPress={() => {
                            this.setState({hasNone: !this.state.hasNone});
                        }} />
                    <CheckBox checked={this.state.hasMattress} label='Mattress(s)'
                        onPress={() => {
                            this.setState({hasMattress: !this.state.hasMattress});
                        }}
                    />
                    <CheckBox checked={this.state.hasTires} label='Tire(s)'
                        onPress={() => {
                            this.setState({hasTires: !this.state.hasTires});
                        }}
                    />
                    <CheckBox checked={this.state.hasHazardous} label='Hazardous Waste'
                        onPress={() => {
                            this.setState({hasHazardous: !this.state.hasHazardous});
                        }}
                    />
                    <CheckBox checked={this.state.hasLarge} label='Large Object(s)'
                        onPress={() => {
                            this.setState({hasLarge: !this.state.hasLarge});
                        }}
                    />
                    <Button onPress={this.toTrashMap}
                        title='Mark the Spot'
                        color='green'/>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {markers: state.TrashTrackerReducers.trashDropMarkers};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(trashTrackerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrashDrop);
