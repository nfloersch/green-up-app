// @flow
import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";
import User from "../../models/user";

export const saveProfile = profile => {
    function thunk(dispatch) {
        firebaseDataLayer.updateProfile(User.create(profile), dispatch);
    }

    thunk.interceptOnOffline = true;
    return thunk;
};