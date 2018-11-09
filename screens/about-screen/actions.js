// @flow

import * as types from '../../constants/actionTypes';
import * as firebaseDataLayer from '../../data-sources/firebase-data-layer';
import User from '../../models/user';

export function saveProfile(profile) {
    return (dispatch) => firebaseDataLayer.updateProfile(User.create(profile));
}