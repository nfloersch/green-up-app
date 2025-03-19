const { withGradleProperties } = require('expo/config-plugins');

module.exports = (config) => {
  const newGradleProperties = [
    {
      type: 'property',
      key: 'useAndroidX',
      value: 'true', // Maybe you should set this to 15?
    },
    // Added this to demostrate multiple gradle properties change
    {
      type: 'property',
      key: 'enableJetifier',
     value: 'true', // Fix app names with accented and diacritics characters
    },
  ];

  return withGradleProperties(config, (config) => {
    newGradleProperties.map((gradleProperty) => config.modResults.push(gradleProperty));

    return config;
  });
};