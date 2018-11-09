// @flow

import {isValidDate} from '../libs/validators';
import TeamMember from './team-member';

export default class Invitation {


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
        this.created = isValidDate(new Date(args.created))
            ? new Date(args.created)
            : new Date();
    }

    sender: ?Object;
    team: ?Object;
    teamMember: ?Object;
    created: ?Date;

    static create(args: ?Object = {}, id?: string) {
        const _args = JSON.parse(JSON.stringify(args));
        if (Boolean(id)) {
            _args.id = id;
        }
        return new Invitation(_args);
    }
}
