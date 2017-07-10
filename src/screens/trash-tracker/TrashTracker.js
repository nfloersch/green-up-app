/**
 /**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {onNavigatorEvent, navButtons} from '../../libs/navigation-switch';
import CheckBox from 'react-native-checkbox';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import NavHeader from '../../components/NavHeader';
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
        borderTopWidth: 50,
        borderLeftWidth: 20,
        borderRightWidth: 20
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
export default class TrashTracker extends Component {
    static navigationOptions = {
        drawerLabel: 'Trash Tracker',
        drawerIcon: ({tintColor}) => (
            <MaterialCommunityIcons name="map-marker" size={24} color="green" />
        )
    };
    static propTypes = {
     };

    constructor(props) {
        super(props);
        this._myAwesomeMethod = this._myAwesomeMethod.bind(this);
    }

    componentDidMount() {
    }

    _myAwesomeMethod() {
        Alert.alert('Huzzah!');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>No. Bags:</Text>
                <ScrollView keyboardShouldPersistTaps='never'>
                    <TextInput keyboardType='numeric'
                        placeholder=' 1'
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(text) => this.setState({text})}
                    />
                    <Text style={styles.text}>Other Items</Text>
                    <CheckBox
                        label='None'
                    />
                    <CheckBox
                        label='Mattress(s)'
                    />
                    <CheckBox
                        label='Tires'
                    />
                    <CheckBox
                        label='Hazardous Waste'
                    />
                    <CheckBox
                        label='Large Object(s)'
                    />
                    <Button
                        onPress={() => { Alert.alert('This will mark the location!')}}
                        title='Mark the Spot'
                        color='green'
                    />
                </ScrollView>
                <NavHeader navigation={this.props.navigation} screenTitle="Trash Tracker" showBack={false}/>
                <NavHeader navigation={this.props.navigation} screenTitle="Trash Tracker" showBack={false}/>
            </View>
        );
    }
}
