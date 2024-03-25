// https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
module.exports = ({ config }) => {
    let firebaseTarget = {}
    // ENVIRONMENT is set from eas.json to set the build environment context
    if (process.env.ENVIRONMENT === 'dev' || process.env.ENVIRONMENT === 'local') {
        firebaseTarget = require('./firebase-config.dev.js')
    } else if (process.env.ENVIRONMENT === 'qa') {
        firebaseTarget = require('./firebase-config.qa.js')
    } else if (process.env.ENVIRONMENT === 'prod') {
        firebaseTarget = require('./firebase-config.prod.js')
    }

    return {
        ...config,
        updates: {
            ...config.updates,
            url: process.env.EXPO_UPDATE_URL
        },
        extra: {
            ...config.extra,
            firebase: {
                ...firebaseTarget
            },
            eas: {
                ...config.extra.eas,
                projectId: process.env.EAS_PROJECT_ID
            }
        },
        ios: {
            ...config.ios,
            config: {
                ...config.ios.config,
                googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
            }
        },
        android: {
            ...config.android,
            config: {
                ...config.android.config,
                googleMaps: {
                    ...config.android.config.googleMaps,
                    apiKey: process.env.GOOGLE_MAPS_API_KEY
                }
            }
        }
    }
}