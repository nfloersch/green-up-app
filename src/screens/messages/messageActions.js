import * as types from '../../constants/actionTypes';
import {Message} from '../../models/message';

export function addMessageSuccess(data) {
    return {type: types.NEW_MESSAGE, data};
}

export function sendMessage(_message) {
    const newId = new Date().toISOString(); // use date to create unique id's for now.
    const message = Message.create({uid: newId, ..._message});
    return {type: types.NEW_MESSAGE, message};
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
