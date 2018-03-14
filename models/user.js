// @flow

import {isDate} from '../libs/isDate';
import md5 from 'md5-hash';

const defaultAvatar = 'https://firebasestorage.googleapis.com/v0/b/greenupvermont-de02b.appspot.com/o/anonymous.png?alt=media&token=5b617caf-fd05-4508-a820-f9f373b432fa';


export class User {
    uid: string;
    displayName: string;
    updated: Date;
    email: string;
    photoURL: string;
    teams: Object;
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
        this.teams = args.teams || {};
        this.photoURL = typeof args.photoURL === 'string'
            ? args.photoURL
            : !args.email ? defaultAvatar : `https://www.gravatar.com/avatar/${md5(args.email.trim().toLowerCase())}?d=mm`;
    }
    static create(args) {
        return new User(args);
    }
}
