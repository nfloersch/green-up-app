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
    static navigatorButtons = navButtons;
    static propTypes = {
        navigator: PropTypes.object
    };
    constructor(props) {
        super(props);
        //  this._myAwesomeMethod = this._myAwesomeMethod.bind(this);
        this.props.navigator.setOnNavigatorEvent(onNavigatorEvent(this.props.navigator).bind(this));
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
                        label='Matress(s)'
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
            </View>
        );
    }
}
