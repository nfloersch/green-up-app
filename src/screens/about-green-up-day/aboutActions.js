import * as types from '../../constants/actionTypes';

export function fetchAboutContent(message) {
    return {type: types.NEW_MESSAGE, message};
}

export function fetchAboutContentSuccess(data) {
    return {type: types.NEW_MESSAGE, data};
}

export function fetchAboutContentFaile(data) {
    return {type: types.NEW_MESSAGE, data};
}

