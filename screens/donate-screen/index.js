/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import {
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

export default class DonateScreen extends Component {
    static navigationOptions = {
        title: 'Support'
    };

    static propTypes = {
        navigation: PropTypes.object
    };

    constructor(props) {
        super(props);
        this._onLoadEnd = this._onLoadEnd.bind(this);
        this.state = {
            webviewLoaded: false
        };
    }

    componentDidMount() {
    }

    _onLoadEnd() {
        this.setState({webviewLoaded: true});
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
                    uri: 'https://www.razoo.com/organization/Vermont-Green-Up'
                }} style={{
                    width: Dimensions.get('window').width,
                    zIndex: 100
                }}/>
            </View>
        );
    }
}
