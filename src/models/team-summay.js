// @flow

import {isDate} from '../libs/isDate';
import {UserSummary} from './user-summary';

export default class Team {
    _id : string;
    name : string;
    description : string;
    location : string;
    start : Date;
    end : Date;
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
        this.start = isDate(args.start)
            ? new Date(args.start)
            : null;
        this.end = isDate(args.end)
            ? new Date(args.end)
            : null;

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
