require('dotenv').config();

// https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules
export default ({ config }) => {
    const newConfig = {
        ...config,
        extra: {
            ...config.extra,
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
    //console.log('new dynamic config:', JSON.stringify(newConfig, null, 2))
    return newConfig
}