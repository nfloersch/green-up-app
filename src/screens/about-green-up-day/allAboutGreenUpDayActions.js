// @flow

import * as types from '../../constants/actionTypes';

export function getAboutGreenUpSuccess(data: Object) {
    return {type: types.GET_ABOUT_GREENUP_SUCCESS, data};
}

export function getAboutGreenUpFail(error: string) {
    return {type: types.GET_ABOUT_CONTENT_FAIL, error};
}

export function getAboutContactsSuccess(data: Object) {
    return {type: types.GET_ABOUT_CONTACTS_SUCCESS, data};
}

export function getAboutContactsFail(error: string) {
    return {type: types.GET_ABOUT_CONTACTS_FAIL, error};
}

export function getAboutGreenUp() {
    return function (dispatch) {
        return Promise.resolve(messageId).then(res => {
            dispatch(getAboutGreenUpSuccess(res));
        }).catch(error => {
            console.log(error); //eslint-disable-line
            dispatch(getAboutGreenUpFail(error));
        });
    };
}

export function getAboutContacts() {
    return function (dispatch) {
        return Promise.resolve(messageId).then(res => {
            dispatch(getAboutContactsSuccess(res));
        }).catch(error => {
            console.log(error); //eslint-disable-line
            dispatch(getAboutContactsFail(error));
        });
    };
}
