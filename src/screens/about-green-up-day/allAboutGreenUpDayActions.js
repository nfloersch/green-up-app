// @flow

import * as types from '../../constants/actionTypes';

export function getAboutContentSuccess(data: Object) {
    return {type: types.GET_ABOUT_CONTENT_SUCCESS, data};
}

export function getAboutContentFail(error: string) {
    return {type: types.GET_ABOUT_CONTENT_FAIL, error};
}

export function getAboutContent() {
    return function (dispatch) {
        return Promise.resolve(messageId).then(res => {
            dispatch(getAboutContentSuccess(res));
        }).catch(error => {
            console.log(error); //eslint-disable-line
            dispatch(getAboutContentFail(error));
        });
    };
}
