/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import NavHeader from '../../components/NavHeader';

import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    WebView,
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
export default class Donate extends Component {
    static navigationOptions = {
        drawerLabel: 'Support Green Up Day',
        drawerIcon: () => (<MaterialCommunityIcons name='leaf' size={24} color='green'/>)
    };

    static propTypes = {
        navigation: PropTypes.object
    };

    constructor(props) {
        super(props);
        this._myAwesomeMethod = this._myAwesomeMethod.bind(this);
        this._onLoadEnd = this._onLoadEnd.bind(this);
        this.state = {
            webviewLoaded: false
        };
    }
    componentDidMount() {}

    _myAwesomeMethod() {
        Alert.alert('Huzzah!');
    }
    _onLoadEnd() {
        this.setState({webviewLoaded: true});
    }
    render() {
        return (
            <View style={styles.container}>
                <NavHeader navigation={this.props.navigation} screenTitle='Suport Green Up Vermont' showBack={false}/>{(this.state.webviewLoaded)
                    ? null
                    : (
                        <Text style={styles.text}>
                            Loading ...
                        </Text>
                    )}
                <WebView onLoadEnd={this._onLoadEnd} source={{
                    uri: 'https://www.razoo.com/story/Greenupvermont?referral_code=MOBILE_APP'
                }} style={{
                    width: Dimensions.get('window').width,
                    zIndex: 100
                }}/>
            </View>
        );
    }
}
