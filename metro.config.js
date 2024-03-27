// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');
const { mergeConfig } = require('metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');

const config = {
    resolver: {
        resolverMainFields: ['main', 'react-native'],
    },
};

module.exports = mergeConfig(defaultConfig);