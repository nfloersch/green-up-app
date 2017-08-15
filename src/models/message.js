// @flow

import {messageTypes} from '../constants/message-types';
import {isDate} from '../libs/isDate';

export default class Message {
    uid : string;
    title: string;
    text : string;
    sender : string;
    teamId : string;
    read : boolean;
    active : boolean;
    link : string;
    type : string;
    received : Date;

    constructor(args: Object) {
        this.uid = typeof args.uid === 'string'
            ? args.uid
            : null;
        this.title = typeof args.title === 'string'
            ? args.title
            : null;
        this.text = typeof args.text === 'string'
            ? args.text
            : null;
        this.sender = typeof args.userId === 'string'
            ? args.sender
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
            ? args.type
            : null;
        this.received = isDate(args.received)
            ? new Date(args.received)
            : null;
    }

    static create(args) {
        return new Message(args || {});
    }

    static messageTypes = messageTypes;
}
