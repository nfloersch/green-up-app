import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    Switch,
    Text,
    View
} from 'react-native';

const styles = {
    toggle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        height: 50
    },
    icon: {
        height: 40,
        width: 40,
        margin: 5
    },
    label: {
        marginLeft: 3,
        color: '#333',
        fontSize: 18,
        lineHeight: 50
    }
};

export default class Toggle extends React.Component {
    static propTypes = {
        icon: PropTypes.any,
        label: PropTypes.string,
        value: PropTypes.bool,
        onValueChange: PropTypes.func
    };

    render() {
        const {icon, label, value, onValueChange} = this.props;

        return (
            <View style={styles.toggle}>
                <View style={{justifyContent: 'flex-start', flex: 1, flexDirection: 'row'}}>
                    <Image style={styles.icon} source={icon}/>
                    <Text style={styles.label}>{label}</Text>
                </View>
                <Switch
                    style={{marginTop: 5, transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
                    value={value}
                    onValueChange={(v) => onValueChange(v)}
                />
            </View>
        );
    }
}