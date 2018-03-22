import React from 'react';
import {Text, View} from 'react-native';
import {MapView} from 'expo';
import PropTypes from 'prop-types';

export default class MultiLineMapCallout extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string
    }

    render() {
        const {title, description} = this.props;
        return (<MapView.Callout>
            <View>
                <Text style={{fontWeight: 'bold'}}>{title}</Text>
                <Text style={{minWidth: 100, maxWidth: 250}} numberOfLines={5}>{description}</Text>
            </View>
        </MapView.Callout>);
    }
}