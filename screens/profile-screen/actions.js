// @flow

import * as firebaseDataLayer from "../../data-sources/firebase-data-layer";
import User from "../../models/user";

export const saveProfile = (profile: UserType): ThunkType => {
    function thunk(dispatch: Dispatch<ActionType>) {
        firebaseDataLayer.updateProfile(User.create(profile), dispatch);
    }

    thunk.interceptOnOffline = true;
    return thunk;
};
