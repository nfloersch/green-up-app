// @flow

import {messageTypes} from '../constants/message-types';
import {isDate} from '../libs/isDate';

export class Message {
    _id : string;
    title: string
    text : string;
    userId : string;
    teamId : string;
    read : boolean;
    active : boolean;
    link : string;
    type : string;
    received : Date;

    constructor(args = {}) {
        this._id = typeof args._id === 'string'
            ? args._id
            : null;
        this.title = typeof args.title === 'string'
            ? args.title
            : null;
        this.text = typeof args.text === 'string'
            ? args.text
            : null;
        this.userId = typeof args.userId === 'string'
            ? args.userId
            : null;
        this.teamId = typeof args.teamId === 'string'
            ? args.teamId
            : null;
        this.read = typeof args.read === 'boolean'
            ? args.read
            : false;
        this.active = typeof args.active === 'boolean'
            ? args.active
            : true;
        this.link = typeof args.link === 'string'
            ? args.link
            : null;
        this.type = typeof args.type === 'string' && args.type in messageTypes
            ? type
            : null;
        this.received = isDate(args.received)
            ? new Date(args.received)
            : null;
    }

    static create(args) {
        return new Message(args);
    }

}
