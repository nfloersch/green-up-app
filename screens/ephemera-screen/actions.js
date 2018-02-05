import {firebaseDataLayer} from '../../data-sources/firebase-data-layer';

import * as types from '../../constants/actionTypes';

export function logout() {
    return async (dispatch: Object => *) => {
        try {
            const results = await firebaseDataLayer.logout();
            // await Auth.GoogleSignInApi.signOut(apiClient);
            dispatch({
                type: types.LOGOUT_SUCCESSFUL,
                results
            });
        } catch (error) {
            dispatch({
                type: types.LOGOUT_FAIL,
                error
            });
        }
    };
}
