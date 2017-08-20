// @flow

import {isDate} from '../libs/isDate';
import {TeamMember} from './team-member';

export class Invitation {
    sender : string;
    team : Object;
    teamMember: Object;
    created : Date;

    constructor(args: Object) {
        this.teamMember = typeof args.teamMember === 'object'
            ? args.teamMember
            : null;
        this.team = typeof args.team === 'object'
            ? args.team
            : null;
        this.sender = typeof args.sender === 'object'
            ? TeamMember.create(args.sender)
            : null;
        this.created = isDate(args.created)
            ? new Date(args.created)
            : new Date();
    }

    static create(args) {
        return new Invitation(args || {});
    }
}
