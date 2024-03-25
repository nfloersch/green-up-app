// To assist with local dev setup, we load .env configs
require('dotenv').config();
const fs = require('fs');

// https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
export default ({ config }) => {
    let firebaseTarget = ''
    // ENVIRONMENT is set from eas.json to set the build environment context
    if (process.env.ENVIRONMENT === 'dev' || process.env.ENVIRONMENT === 'local') {
        firebaseTarget = process.env.FIREBASE_CONFIG_DEV || ''
    } else if (process.env.ENVIRONMENT === 'qa') {
        firebaseTarget = process.env.FIREBASE_CONFIG_QA || ''
    } else if (process.env.ENVIRONMENT === 'prod') {
        firebaseTarget = process.env.FIREBASE_CONFIG_PROD || ''
    }

    console.log(`path=(${firebaseTarget})`)
    const firebaseConfig = firebaseTarget ? JSON.parse(fs.readFileSync(firebaseTarget)) : {}
    console.log(`value=(${JSON.stringify(firebaseConfig, null, 2)})`)
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