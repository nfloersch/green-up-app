// @flow
import { Google } from "expo";
import { Platform } from "react-native";
import { thirdPartyConfig } from "../config/third-party-config";

export const googleLogin = (): Promise<any> => Google.logInAsync({
    clientId: Platform.OS === "android" ? thirdPartyConfig.androidClientId : thirdPartyConfig.iosClientId, // use this line when pushing to app store.
    // clientId: thirdPartyConfig.androidClientId,  // use this line when in development (using Expo App)
    scopes: ["profile", "email"],
    useBrowser: true,
    behavior: "web"
});
