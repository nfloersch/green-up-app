import Constants from "expo-constants";
import * as Sentry from 'sentry-expo';

const initSentry = () => {
    let enableSentryLocally = false;
    let traceSampleRate = 0.5;
    if (__DEV__) {
        enableSentryLocally = true;
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
