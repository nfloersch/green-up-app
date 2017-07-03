/**
/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {onNavigatorEvent, navButtons} from '../../libs/navigation-switch';
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel
} from 'react-native-simple-radio-button';
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput
} from 'react-native';

var radio_props = [
    {label: 'None', value: 0},
    {label: 'Mattress', value: 1},
    {label: 'Hazardous Waste', value: 2},
    {label: 'Tires', value: 3},
    {label: 'Large Objects', value: 4}
];
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
                    <View>
                        <RadioForm
                            radio_props={radio_props}
                            initial={0}
                            buttonColor={'green'}
                            onPress={(value) => { this.setState({value:value})}}
                        />
                    </View>
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
