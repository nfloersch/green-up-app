// @flow

import {messageTypes} from '../constants/message-types';

export class Message {

    text: string;
    userId: string;
    teamId: string;
    read: boolean;
    active: boolean;
    link: string;
    type: string;

    constructor(args = {}) {
        this.text = typeof args.text === 'string' ? args.text : null;
        this.userId = typeof args.userId === 'string' ? args.userId : null;
        this.teamId = typeof args.teamId === 'string' ? args.teamId : null;
        this.read = typeof args.read === 'boolean' ? args.read : false;
        this.active = typeof args.active === 'boolean' ? args.active : true;
        this.link = typeof args.link === 'string' ? args.link : null;
        this.type = typeof args.type === 'string' && args.type in messageTypes ? type : null;
    }

    static create(args) {
        return new Message(args);
    }

}