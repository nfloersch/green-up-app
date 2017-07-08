// @flow

import {isDate} from '../libs/isDate';
import {Zone} from './zone';
import {User} from './user';

export class Team {
    _id: string;
    name: string;
    description: string;
    notes: string;
    location: string;
    start: Date;
    end: Date;
    active: boolean;
    members: [user];
    zones: [Zone];
    isPublic: boolean;
    created: Date;

    constructor(args = {}) {
        this._id = typeof args._id === 'string' ? args._id : null;
        this.name = typeof args.name === 'string' ? args.name : null;
        this.location = typeof args.location === 'string' ? args.location : null;
        this.description = typeof args.descrption === 'string' ? args.description : null;
        this.notes = typeof args.notes === 'string' ? args.notes : null;
        this.start = isDate(args.start) ? new Date(args.start) : null;
        this.end = isDate(args.end) ? new Date(args.end) : null;
        this.active = typeof args.active === 'boolean' ? args.active : true;
        this.members = Array.isArray(args.members) ? args.members.map((member) => User.create(member)) : [];
        this.zones = Array.isArray(args.zones) ? args.zones.map((zone) => Zone.create(zone)) : [];
        this.isPublic = typeof args.isPublic === 'boolean' ? args.isPublic : true;
        this.created = isDate(args.created) ? new Date(args.created) : null;
    }

    static create(args) {
        return new Team(args);
    }
}