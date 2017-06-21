import * as types from '../../constants/actionTypes';

export function addMessageSuccess(data) {
    return {type: types.NEW_MESSAGE, data};
}

export function addMessage(message) {
    return function (dispatch) {
        return Promise
            .resolve(message)
            .then(res => {
                dispatch(addMessage(res));
            })
            .catch(error => {
                console.log(error); //eslint-disable-line
            });
    };
}

export function readMessageSuccess(data) {
    return {type: types.READ_MESSAGE, data};
}

export function readMessage(messageId) {
    return function (dispatch) {
        return Promise
            .resolve(messageId)
            .then(res => {
                dispatch(readMessage(res));
            })
            .catch(error => {
                console.log(error); //eslint-disable-line
            });
    };
}
