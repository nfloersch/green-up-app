// @flow

import * as types from "../../constants/action-types";
import { Google, Facebook } from "expo";
import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";
import { thirdPartyConfig } from "../../config/third-party-config";
import { Platform } from "react-native";

export const getCurrentUser = () => {
    function thunk (dispatch: Object => *) {
        firebaseDataLayer.getCurrentUser(dispatch);
    }

    thunk.interceptOnOffline = true;
    return thunk;
};


export const logout = () => {
    function thunk (dispatch: Object => *) {
        firebaseDataLayer.logout(dispatch);
    }

    thunk.interceptOnOffline = true;
    return thunk;
};

export function createUser(email: string, password: string, displayName: string) {
    return (dispatch: Object => *) => {
        dispatch({ type: types.CREATING_USER });
        const _promise = firebaseDataLayer.createUser(email, password, displayName);
        return _promise.catch(error => {
            dispatch({ type: types.CREATE_USER_FAIL, error: error.message || "Could not create account." });
        });
    };
}

export function loginWithEmailPassword(email: string, password: string) {
    return (dispatch: Object => *) => {
        firebaseDataLayer.loginWithEmailPassword(email, password).catch(error => {
            dispatch({ type: types.LOGIN_FAIL, error });
        });
    };
}

export function googleLogin() {
    return async function logIn(dispatch: Object => *) {
        try {
            // Expo SDK 32 has a bug. Swap clientId logic if you are in dev or pushing a standalone app to TestFlight or App store
            const result = await Google.logInAsync({
                clientId: Platform.OS === "android" ? thirdPartyConfig.androidClientId : thirdPartyConfig.iosClientId, // use this line when pushing to app store.
                // clientId: thirdPartyConfig.androidClientId,  // use this line when in development (using Expo App)
                scopes: ["profile", "email"],
                useBrowser: true,
                behavior: "web"
            });

            if (result.type === "success") {
                firebaseDataLayer.googleAuth(result.idToken).catch(error => {
                    dispatch({
                        type: types.LOGIN_FAIL,
                        error
                    });
                });
            } else {
                dispatch({
                    type: types.LOGIN_FAIL,
                    error: "Google authentication failed"
                });
            }
        } catch (error) {
            dispatch({ type: types.LOGIN_FAIL, error });
        }
    };
}

export function facebookLogin() {
    return async function logIn(dispatch: Object => *) {
        const facebook = await Facebook.logInWithReadPermissionsAsync(thirdPartyConfig.facebookAppId, {
            behavior: "web", permissions: ["public_profile", "email"]
        });
        const { type, token } = facebook;
        if (type === "success") {
            firebaseDataLayer.facebookAuth(token).catch((error) => {
                dispatch({
                    type: types.LOGIN_FAIL,
                    error
                });
            });
        } else {
            dispatch({
                type: types.LOGIN_FAIL,
                session: {
                    facebook: null,
                    user: null
                }
            });
        }
    };
}

export function resetPassword(emailAddress: string) {
    return (dispatch) => {
        firebaseDataLayer.resetPassword(emailAddress)
            .then(() => dispatch({ type: types.RESET_PASSWORD_SUCCESS }))
            .catch(error => {
                dispatch(
                    {
                        type: types.RESET_PASSWORD_FAIL,
                        error
                    }
                );
            });
    };
}

export function isLoggingInViaSSO(_isLoggingInViaSSO: Boolean) {
    return { type: types.IS_LOGGING_IN_VIA_SSO, isLoggingInViaSSO: _isLoggingInViaSSO };
}