// @flow

import {isDate} from '../libs/isDate';
import Location from './location';
import {TeamMember} from './team-member';

export default class Team {
    id: string;
    name: string;
    description: string;
    notes: [string];
    town: string;
    start: Date;
    end: Date;
    active: boolean;
    members: [TeamMember];
    locations: [Location];
    isPublic: boolean;
    created: Date;
    owner: TeamMember;

    constructor(args = {}) {
        this.id = typeof args.id === 'string' ? args.id : null;
        this.name = typeof args.name === 'string'
            ? args.name
            : null;
        this.town = typeof args.location === 'string'
            ? args.town
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
        this.locations = Array.isArray(args.locations)
            ? args.locations.map((location) => Location.create(location))
            : [];
        this.isPublic = typeof args.isPublic === 'boolean'
            ? args.isPublic
            : true;
        this.created = isDate(args.created)
            ? new Date(args.created)
            : new Date();
        this.owner = TeamMember.create(args.owner);

    }

    static create(args = {}, id) {
        if (id) {
            args.id = id;
        }
        return new Team(args);
    }

}
