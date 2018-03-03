// @flow

import * as types from '../../constants/actionTypes';
import {firebaseDataLayer} from '../../data-sources/firebase-data-layer';
import {Message} from '../../models/message';
import * as statuses from '../../constants/team-member-statuses';

export function addMessageSuccess(data) {
    return {type: types.NEW_MESSAGE, data};
}

export function sendMessage(message: Object, recipients: [Object]) {
    const _message = Message.create(message);
    console.log(JSON.stringify(_message));
    const _recipients = recipients.filter(recipient => recipient.memberStatus === statuses.ACCEPTED || recipient.memberStatus === statuses.OWNER);
    return () => _recipients.map(recipient => firebaseDataLayer.sendUserMessage(recipient.uid, _message));
}

export function readMessageSuccess(data) {
    return {type: types.READ_MESSAGE, data};
}

export function readMessage(message, userID) {
    const _message = Object.assign({}, message, {read: true});
    return (dispatch) => {
        return firebaseDataLayer.updateMessage(_message, userID).then(res => {
            dispatch(readMessage(res));
        }).catch(error => {
            console.log(error); //eslint-disable-line
        });
    };
}

export function selectTeamById(teamId: string){
    return {type: types.SELECT_TEAM_BY_ID, teamId};
}

