// @flow

import * as types from '../../constants/actionTypes';
import {firebaseDataLayer} from '../../data-sources/firebase-data-layer';

export function addMessageSuccess(data) {
    return {type: types.NEW_MESSAGE, data};
}

export function sendMessage(message: Object, recipients: [string]) {
    return (dispatch) => {
        recipients.map(recipient => firebaseDataLayer.sendMessage(message, recipient));
    };
}

export function readMessageSuccess(data) {
    return {type: types.READ_MESSAGE, data};
}

export function readMessage(messageId) {
    return function (dispatch) {
        return Promise.resolve(messageId).then(res => {
            dispatch(readMessage(res));
        }).catch(error => {
            console.log(error); //eslint-disable-line
        });
    };
}
