// @flow

import {Message} from './message';
import Team from './team';
import {isDate} from '../libs/isDate';

export class User {
    uid: string;
    displayName: string;
    updated: Date;
    email: string;
    photoURL: string;
    bio: string;
    created: Date;

    constructor(args = {}) {
        this.uid = typeof args.uid === 'string' || typeof args.id === 'string'
            ? args.uid || args.id
            : null;
        this.displayName = typeof args.displayName === 'string'
            ? args.displayName.trim()
            : null;
        this.email = typeof args.email === 'string'
            ? args.email.trim().toLowerCase()
            : null;
        this.bio = typeof args.bio === 'string'
            ? args.bio.slice(0, 144).trim() // max-length is 144 characters
            : null;
        this.created = isDate(args.created)
            ? new Date(args.created)
            : null;
        this.updated = isDate(args.updated)
            ? new Date(args.updated)
            : null;
        this.photoURL = typeof args.photoURL === 'string'
            ? args.photoURL
            : null;
    }

    static create(args) {
        return new User(args);
    }
}
