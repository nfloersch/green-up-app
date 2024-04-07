import Constants from "expo-constants";
import * as Sentry from 'sentry-expo';

const initSentry = () => {
    let enableSentryLocally = false;
    let traceSampleRate = 0.5;
    if (__DEV__) {
        // Set `enableSentryLocally` to true to enable Sentry while developing locally
        // Preferably do not commit this change so we keep Sentry usage to deployed apps
        enableSentryLocally = false; 
        traceSampleRate = 1.0;
    }
    Sentry.init({
        dsn: Constants.expoConfig.extra.sentry.dsn,
        tracesSampleRate: traceSampleRate,
        enableInExpoDevelopment: enableSentryLocally,
        debug: false,
    });
}

export default initSentry;
