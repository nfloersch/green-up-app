// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('cjs');

config.transformer.minifierPath = 'metro-minify-terser';
config.transformer.minifierConfig = {
    mangle: {
        toplevel: false,
        keep_classnames: true,
        keep_fnames: true,
    },
    output: {
        ascii_only: false,
        comments: false,
        quote_style: 3,
        wrap_iife: false
    },
    sourceMap: { includeSources: false },
    toplevel: false,
    compress: { reduce_funcs: false }
}


module.exports = config;