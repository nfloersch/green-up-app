// @flow

import {isDate} from '../libs/isDate';
import Location from './location';
import {TeamMember} from './team-member';
// TODO : Make this default date configurable on Firebase.
const defaultDate = 'Sat May 05 2018';
export default class Team {
    id: string;
    name: string;
    description: string;
    notes: [string];
    town: string;
    location: string;
    date: string;
    start: string;
    end: string;
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
        this.town = typeof args.town === 'string'
            ? args.town
            : null;
        this.location = typeof args.location === 'string'
            ? args.location
            : null;
        this.description = typeof args.description === 'string'
            ? args.description
            : null;
        this.notes = typeof args.notes === 'string'
            ? args.notes
            : null;
        this.date = typeof args.date === 'string'
            ? args.date
            : defaultDate;
        this.start = typeof args.start === 'string'
            ? args.start
            : null;
        this.end = typeof args.end === 'string'
            ? args.end
            : null;
        this.active = typeof args.active === 'boolean'
            ? args.active
            : true;
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
