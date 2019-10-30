const isValidDate = require("../validators").isValidDate;
const TeamMember = require("./team-member");
const deconstruct = require("./libs/deconstruct");

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

    static create(args = {}, id) {
        const _args = JSON.parse(JSON.stringify(args || ""));
        if (id) {
            _args.id = id;
        }
        return deconstruct(new Invitation(_args));
    }
}

module.exports = Invitation;
