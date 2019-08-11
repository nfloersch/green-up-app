// @flow

const validators = require('./validators');
const TeamMember = require('/team-member');

class Invitation {

    constructor(args: Object) {
        this.id = args.id || null;
        this.teamMember = typeof args.teamMember === 'object'
            ? args.teamMember
            : null;
        this.team = typeof args.team === 'object'
            ? args.team
            : null;
        this.sender = typeof args.sender === 'object'
            ? TeamMember.create(args.sender)
            : null;
        this.created = validators.isValidDate(new Date(args.created))
            ? new Date(args.created)
            : new Date();
    }

    id: ?string;
    sender: ?Object;
    team: ?Object;
    teamMember: ?Object;
    created: Date;

    static create(args: ?Object = {}, id?: string) {
        const _args = JSON.parse(JSON.stringify(args));
        if (id) {
            _args.id = id;
        }
        return JSON.parse(JSON.stringify(new Invitation(_args)));
    }
}

module.exports =  TeamMember;