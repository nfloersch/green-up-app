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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'space-around',
        backgroundColor: 'white',
        borderColor: 'white',
        borderTopWidth: 50,
        borderLeftWidth: 20
    },
    text: {
        fontSize: 30,
        textAlign: 'left',
        fontWeight: 'bold',
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
                <TextInput keyboardType='numeric'
                    placeholder='1'
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                />
            </View>
        );
    }
}
