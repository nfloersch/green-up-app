// @flow

import {isDate} from '../libs/isDate';
import {Zone} from './zone';
import {UserSummary} from './user-summary';

export class Team {
    _id : string;
    name : string;
    description : string;
    notes : [string];
    location : string;
    start : Date;
    end : Date;
    active : boolean;
    members : [UserSummary];
    zones : [Zone];
    isPublic : boolean;
    created : Date;
    owner : UserSummary;
    invitePending : boolean;
    acceptancePending : boolean;
    userIsOwner : boolean;

    constructor(args = {}, userId : string) {
        this._id = typeof args._id === 'string'
            ? args._id
            : null;
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
            ? args.members.map((member) => UserSummary.create(member))
            : [];
        this.zones = Array.isArray(args.zones)
            ? args.zones.map((zone) => Zone.create(zone))
            : [];
        this.isPublic = typeof args.isPublic === 'boolean'
            ? args.isPublic
            : true;
        this.created = isDate(args.created)
            ? new Date(args.created)
            : null;
        this.owner = UserSummary.create(args.owner);
        this.invitePending = typeof args.invitePending === 'boolean'
            ? args.invitePending
            : false;
        this.acceptancePending = typeof args.invitePending === 'boolean'
            ? args.acceptancePending
            : false;
        this.userIsOwner = !!args.userId && args.userID === this.owner.userId;
    }

    static create(args = {}, userId : string) {
        return new Team(args, userId);
    }

}
