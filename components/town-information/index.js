// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {defaultStyles} from '../../styles/default-styles';

const styles = StyleSheet.create(defaultStyles);

type Props = {
    townInfo: PropTypes.object,
    town: PropTypes.string
};


const TownInformation = ({townInfo, town}: Props): React.Component => (
    <View style={{
        padding: 5,
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 60,
        width: '100%',
        backgroundColor: 'rgba(255,255,255, 0.8)'
    }}>
        {typeof townInfo.roadsideDropOffAllowed === 'undefined' && (
            <Text style={styles.statusBarText}>
                {'Sorry, we have no information on trash drops for your location. '}
            </Text>
        )}
        {townInfo.roadsideDropOffAllowed === true && (
            <Text style={styles.statusBarText}>
                <Text>{`You are in ${town} and leaving trash bags on the roadside is allowed.`}</Text>
            </Text>
        )}
        {townInfo.roadsideDropOffAllowed === false && (
            <View style={styles.statusBarText}>
                <Text>{`You are in ${town} and leaving trash bags on the roadside is`}
                    <Text style={{fontWeight: 'bold'}}>
                        {' not'}
                    </Text>
                    <Text>
                        {' allowed. Please take your trash to a designated drop off.'}
                    </Text>
                </Text>
                {townInfo.dropOffLocations.map((d, i) => (
                    <Text key={i}>{`\n${d.name}, ${d.address}`}</Text>
                ))}
            </View>)}
    </View>
);


export default TownInformation;