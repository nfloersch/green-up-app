// @flow

import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';

import logo from '../../assets/images/green-up-logo.png';
import {defaultStyles} from '../../styles/default-styles';


const myStyles = {
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40
    },
    linkText: {
        textAlign: 'center',
        color: '#333',
        fontSize: 10,
        marginBottom: 5
    }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

const Splash = ({message}: { message: string }): void => (
    <ScrollView style={styles.frame}>
        <View style={{paddingTop: 60}}>
            <View style={styles.logo}>
                <Image source={logo} style={{height: 120, width: 120}}/>
            </View>
            <View style={{width: '100%'}}>
                <Text style={[styles.text, {textAlign: 'center'}]}>{message}</Text>
            </View>
        </View>
    </ScrollView>
);


export default Splash;

