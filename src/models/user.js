// @flow

import {Message} from './message';
import {Team} from './team';
import {isDate} from '../libs/isDate';

export class User {
    uid : string;
    firstName : string;
    lastName : string;
    email : string;
    teams : [Team];
    messages : [Message];
    created : Date;

    constructor(args = {}) {
        this.uid = typeof args.uid === 'string' || typeof args.id === 'string'
            ? args.uid || args.id
            : null;
        this.name = typeof args.name === 'string'
            ? args.name
            : null;
        this.email = typeof args.email === 'string'
            ? args.email
            : null;
        this.teams = Array.isArray(args.teams)
            ? args
                .teams
                .map((team) => Team.create(team))
            : [];
        this.messages = Array.isArray(args.messages)
            ? args
                .messages
                .map((message) => Message.create(message))
            : [];
        this.created = isDate(args.created)
            ? new Date(args.created)
            : null;

    }

    static create(args) {
        return new User(args);
    }
}
