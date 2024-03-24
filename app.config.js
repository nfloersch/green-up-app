require('dotenv').config();
const firebaseConfig = require(process.env.FIREBASE_CONFIG_FILE)

// https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
export default ({ config }) => {
    const newConfig = {
        ...config,
        extra: {
            ...config.extra,
            firebase: firebaseConfig,
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
    // To debug/show config, use either:
    //   npx expo config
    //   npx expo config --type public
    return newConfig
}