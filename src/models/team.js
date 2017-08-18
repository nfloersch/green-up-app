// @flow

import {isDate} from '../libs/isDate';
import {Location} from './location';
import {TeamMember} from './team-member';

export default class Team {
    name: string;
    description: string;
    notes: [string];
    location: string;
    start: Date;
    end: Date;
    active: boolean;
    members: [TeamMember];
    zones: [Zone];
    isPublic: boolean;
    created: Date;
    owner: TeamMember;

    constructor(args = {}) {
        this.name = typeof args.name === 'string'
            ? args.name
            : null;
        this.location = typeof args.location === 'string'
            ? args.location
            : null;
        this.description = typeof args.descrption === 'string'
            ? args.description
            : null;
        this.notes = Array.isArray(args.notes)
            ? args.notes.filter(note => typeof note === 'string')
            : null;
        this.start = isDate(args.start)
            ? new Date(args.start)
            : null;
        this.end = isDate(args.end)
            ? new Date(args.end)
            : null;
        this.active = typeof args.active === 'boolean'
            ? args.active
            : true;
        this.members = Array.isArray(args.members)
            ? args.members.map((member) => TeamMember.create(member))
            : [];
        this.zones = Array.isArray(args.zones)
            ? args.zones.map((zone) => Zone.create(zone))
            : [];
        this.isPublic = typeof args.isPublic === 'boolean'
            ? args.isPublic
            : true;
        this.created = isDate(args.created)
            ? new Date(args.created)
            : new Date();
        this.owner = TeamMember.create(args.owner);

    }

    static create(args = {}) {
        return new Team(args);
    }

}
