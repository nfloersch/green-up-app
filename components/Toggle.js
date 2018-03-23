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
        marginBottom: 10
    },
    icon: {
        height:20,
        width: 20,
        marginTop: 5
    },
    label: {
        marginTop: 5,
        marginLeft: 3
    }
};

export default class Toggle extends React.Component {
    static propTypes = {
        icon: PropTypes.any,
        label: PropTypes.string,
        value: PropTypes.bool,
        onValueChange: PropTypes.func
    }

    render() {
        const {icon, label, value, onValueChange} = this.props;

        return (<View style={styles.toggle}>
            <View style={{justifyContent: 'flex-start', flex: 1, flexDirection: 'row'}}>
                <Image style={styles.icon} source={icon} />
                <Text style={styles.label}>{label}</Text>
            </View>
            <Switch
                value={value}
                onValueChange={(v) => onValueChange(v)}
            />
        </View>);
    }
}