import getEnvVars from "../environment";

const { androidClientId, androidStandaloneAppClientId, iosClientId, iosStandaloneAppClientId, facebookAppId } = getEnvVars();

export const thirdPartyConfig = { androidClientId, androidStandaloneAppClientId, iosClientId, iosStandaloneAppClientId, facebookAppId };