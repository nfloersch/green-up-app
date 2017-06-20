import {NEW_MESSAGE, READ_MESSAGE} from './constants/actionTypes'
export function addMessage(data) {
    return {type: NEW_MESSAGE, data}
}
export function readMessage(data) {
    return {type: READ_MESSAGE, data}
}
