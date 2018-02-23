// @flow

import {Message} from './message';
import Team from './team';
import {isDate} from '../libs/isDate';

export class User {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    organization: string;
    created: Date;

    constructor(args = {}) {
        this.uid = typeof args.uid === 'string' || typeof args.id === 'string'
            ? args.uid || args.id
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
        this.phone = typeof args.phone === 'string'
            ? args.phone
            : null;
        this.organization = typeof args.organization === 'string'
            ? args.organization
            : null;
        this.blob = typeof args.blob === 'string'
            ? args.blob
            : null;
        this.created = isDate(args.created)
            ? new Date(args.created)
            : null;

    }

    static create(args) {
        return new User(args);
    }
}
