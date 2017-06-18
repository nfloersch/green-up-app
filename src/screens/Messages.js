/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import {
    Alert,
    Button,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});
export default class Messages extends Component {
    constructor(props) {
        super(props);
        this.toMessageDetail = this.toMessageDetail.bind(this);
    }
    toMessageDetail() {}
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome} onPress={this.toMessageDetail}>
                    Messages
                </Text>
            </View>
        );
    }
}
