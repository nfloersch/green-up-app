/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TrashMap from './trash-map';

export default class TrashTracker extends Component {
    static propTypes = {
        actions: PropTypes.object,
        messages: PropTypes.array,
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Trash Tracker',
        tabBarLabel: 'Trash'
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }


    render() {
        return (<TrashMap/>);
    }
}
