/**
/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {onNavigatorEvent, navButtons} from '../../libs/navigation-switch';
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
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
        textAlign: 'left',
        fontWeight: 'bold',
        margin: 10
    },
    options: {
        justifyContent: 'flex-start',
        fontSize: 15,
        textAlign: 'left',
        margin: 20
    },
    button: {
        justifyContent: 'center',
        fontSize: 30,
        alignContent: 'center'
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
                <TextInput keyboardType='numeric'
                    placeholder=' 1'
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                />
                <Text style={styles.text}>Other Items</Text>
                <Text style={styles.options}>Mattress</Text>
                <Text style={styles.options}>Hazardous Waste</Text>
                <Text style={styles.options}>Tires</Text>
                <Text style={styles.options}>Large Objects</Text>
                <Button style={styles.button}
                    onPress={() => { Alert.alert('This will mark the location!')}}
                    title='Mark the Spot'
                    color='green'
                    accessibilityLabel='This will place a marker on the map!'
                />
            </View>
        );
    }
}
