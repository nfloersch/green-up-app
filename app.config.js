// https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
module.exports = ({ config }) => {
    // ENVIRONMENT is set from eas.json to set the build environment contexts
    const targetEnvirnoment = process.env.ENVIRONMENT ?? 'local'
    const firebaseTarget = require(`./firebase-config.${targetEnvirnoment}.js`)
    require('dotenv').config();

    return {
        ...config,
        updates: {
            ...config.updates,
            url: process.env.EAS_UPDATE_URL
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