// @flow

// import * as types from '../../constants/actionTypes';
import {firebaseDataLayer} from '../../data-sources/firebase-data-layer';
import {User} from '../../models/user';

export function saveProfile(profile, teamMembers) {
    return () => firebaseDataLayer.updateProfile(User.create(profile), teamMembers);
}