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
    TouchableHighlight,
    WebView,
    View
} from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        zIndex: 0
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});
export default class Donate extends Component {
    static navigationOptions = {
        drawerLabel: 'Support Green Up Vermont',
        drawerIcon: ({tintColor}) => (
            <MaterialCommunityIcons name='leaf' size={24} color='green' />
        )
    };
     static propTypes = {
    };

    componentDidMount() {
     }
    constructor(props) {
        super(props);
        this._myAwesomeMethod = this._myAwesomeMethod.bind(this);
        this._onLoadEnd = this._onLoadEnd.bind(this);
         this.state = {
            webviewLoaded: false
        };
    }
    _myAwesomeMethod() {
        Alert.alert('Huzzah!');
    }
    _onLoadEnd() {
        this.setState({webviewLoaded: true})
    }
    render() {
        return (
            <View style={styles.container}>
                <NavHeader navigation={this.props.navigation}/>

                {(this.state.webviewLoaded)
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
