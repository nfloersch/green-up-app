/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {onNavigatorEvent, navButtons} from '../libs/navigation-switch';
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
    static navigatorButtons = navButtons;
    static propTypes = {
        navigator: PropTypes.object
    };
    componentDidMount() {
        this.props.navigator.setButtons(navButtons);
    }
    constructor(props) {
        super(props);
        this._myAwesomeMethod = this._myAwesomeMethod.bind(this);
        this._onLoadEnd = this._onLoadEnd.bind(this);
        this.props.navigator.setOnNavigatorEvent(onNavigatorEvent(this.props.navigator).bind(this));
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
