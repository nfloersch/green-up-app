
const isValidDate = require("../validators").isValidDate;
const TeamMember = require("./team-member");

class Invitation {

    constructor(args) {
        this.id = args.id || null;
        this.teamMember = typeof args.teamMember === "object"
            ? args.teamMember
            : null;
        this.team = typeof args.team === "object"
            ? args.team
            : null;
        this.sender = typeof args.sender === "object"
            ? TeamMember.create(args.sender)
            : null;
        this.created = isValidDate(new Date(args.created))
            ? new Date(args.created)
            : new Date();
    }

    id;
    sender;
    team;
    teamMember;
    created;

    static create(args = {}, id): Invitation {
        const _args = JSON.parse(JSON.stringify(args || ""));
        if (Boolean(id)) {
            _args.id = id;
        }
        return new Invitation(_args);
    }
}

module.exports = Invitation
