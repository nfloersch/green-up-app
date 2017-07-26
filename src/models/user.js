// @flow

import {Message} from './message';
import {Team} from './team';
import {isDate} from '../libs/isDate';

export class User {
    _id : string;
    firstName : string;
    lastName : string;
    email : string;
    teams : [string];
    messages : [Message];
    created : Date;

    constructor(args = {}) {
        this._id = typeof args._id === 'string'
            ? args._id
            : null;
        this.firstName = typeof args.firstName === 'string'
            ? args.firstName
            : null;
        this.lastName = typeof args.lastName === 'string'
            ? args.lastName
            : null;
        this.email = typeof args.email === 'string'
            ? args.email
            : null;
        this.teams = Array.isArray(args.teams)
            ? args.messages.map((team) => Team.create(team))
            : [];
        this.messages = Array.isArray(args.messages)
            ? args.messages.map((message) => Message.create(message))
            : [];
        this.created = isDate(args.created)
            ? new Date(args.created)
            : null;

    }

    static create(args) {
        return new User(args);
    }
}
