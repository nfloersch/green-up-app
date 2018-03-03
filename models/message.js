// @flow

import * as messageTypes from '../constants/message-types';
import {isDate} from '../libs/isDate';
import {TeamMember} from './team-member';

export class Message {
    uid : string;
    text : string;
    sender : string;
    teamId : string;
    read : boolean;
    active : boolean;
    link : string;
    type : string;
    created : Date;

    constructor(args: Object) {
        this.uid = typeof args.uid === 'string'
            ? args.uid
            : null;
        this.text = typeof args.text === 'string'
            ? args.text
            : null;
        this.sender = typeof args.sender === 'object'
            ? TeamMember.create(args.sender)
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
        this.created = isDate(args.created)
            ? new Date(args.created)
            : new Date();
    }

    static create(args) {
        return new Message(args || {});
    }

    static messageTypes = messageTypes;
}
