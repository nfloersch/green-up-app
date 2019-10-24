// @flow

import { Facebook } from "expo";
import { thirdPartyConfig } from "../config/third-party-config";

export const facebookLogin = (): Promise<any> => Facebook.logInWithReadPermissionsAsync(
    thirdPartyConfig.facebookAppId, {
        behavior: "web",
        permissions: ["public_profile", "email"]
    }
);

