/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesome} from '@expo/vector-icons';
import NavHeader from '../../components/NavHeader';

import {
    Alert,
    Button,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%'
    }
});
export default class MyTeams extends Component {
    static navigationOptions = {
        drawerLabel: 'My Teams',
        drawerIcon: ({tintColor}) => (
            <FontAwesome name="users" size={24} color="green" />
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
                <NavHeader navigation={this.props.navigation} screenTitle="My Teams" showBack={false}/>

                <TouchableHighlight onPress={this._myAwesomeMethod} underlayColor={'rgba(0, 0, 0, 0.054)'}>
                    <Text style={styles.text}>
                        My Teams
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}
