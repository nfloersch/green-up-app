// @flow

import * as types from '../../constants/actionTypes';
import {firebaseDataLayer} from '../../data-sources/firebase-data-layer';
// import {User} from '../../models/user';

export function updateProfile(profile, userId) {
    const _profile = Object.assign({}, profile, {read: true});
    return (dispatch) => {
        return firebaseDataLayer.updateProfile(_profile, userId).catch(error => {
            dispatch({action: types.UPDATE_PROFILE_FAIL, error});
            console.log(error); //eslint-disable-line
        });
    };
}